import { useState, useRef, useCallback, useEffect } from 'react'

const INTENT_DELAY_MS = 120
const DRAG_SLOP_PX = 8
const HOLD_DURATION_MS = 150
const DRAG_THRESHOLD_PX = 160   // distancia para arrastre lento
const DRAG_THRESHOLD_FAST = 55   // distancia mínima con velocidad alta
const VELOCITY_THRESHOLD = 0.5   // px/ms — considera swipe como rápido
const WHEEL_COOLDOWN_MS = 600

type GestureState = 'idle' | 'pending' | 'holding' | 'dragging'

interface UseGestureHandlerOptions {
    flipped: boolean
    onFlip: () => void
    onResetFlip: () => void
    onNext: (wasKnown: boolean) => void
    wrapperRef: React.RefObject<HTMLDivElement | null>
    innerRef: React.RefObject<HTMLDivElement | null>
}

export function useGestureHandler({
    flipped,
    onFlip,
    onResetFlip,
    onNext,
    wrapperRef,
    innerRef,
}: UseGestureHandlerOptions) {
    const [holdProgress, setHoldProgress] = useState(0)

    // ── Props como refs: los callbacks NUNCA se recrean ─────────────────────
    const flippedRef = useRef(flipped)
    const onFlipRef = useRef(onFlip)
    const onResetFlipRef = useRef(onResetFlip)
    const onNextRef = useRef(onNext)
    useEffect(() => { flippedRef.current = flipped }, [flipped])
    useEffect(() => { onFlipRef.current = onFlip }, [onFlip])
    useEffect(() => { onResetFlipRef.current = onResetFlip }, [onResetFlip])
    useEffect(() => { onNextRef.current = onNext }, [onNext])

    // ── Estado interno ───────────────────────────────────────────────────────
    const gesture = useRef<GestureState>('idle')
    const startY = useRef(0)
    const currentDY = useRef(0)
    const lastY = useRef(0)        // para calcular velocidad
    const lastTime = useRef(0)        // timestamp del último move
    const velocityY = useRef(0)        // px/ms en el momento de soltar
    const intentTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const holdRaf = useRef<number | null>(null)
    const holdStart = useRef<number | null>(null)

    // ── DOM directo ──────────────────────────────────────────────────────────
    const applyDrag = useCallback((dy: number) => {
        const el = innerRef.current
        if (!el) return
        const base = flippedRef.current ? 'rotateY(180deg) ' : ''
        el.style.transition = 'none'
        el.style.transform = `${base}translateY(${dy * 0.45}px) rotate(${dy * 0.04}deg)`
    }, [innerRef])

    const snapBack = useCallback(() => {
        const el = innerRef.current
        if (!el) return
        el.style.transition = 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)'
        el.style.transform = flippedRef.current ? 'rotateY(180deg)' : ''
    }, [innerRef])

    // ── Limpiar timers ───────────────────────────────────────────────────────
    const clearIntent = useCallback(() => {
        if (intentTimer.current) { clearTimeout(intentTimer.current); intentTimer.current = null }
    }, [])

    const clearHold = useCallback(() => {
        if (holdRaf.current) { cancelAnimationFrame(holdRaf.current); holdRaf.current = null }
        holdStart.current = null
        setHoldProgress(0)
    }, [])

    const resetGesture = useCallback(() => {
        clearIntent()
        clearHold()
        gesture.current = 'idle'
        currentDY.current = 0
        velocityY.current = 0
    }, [clearIntent, clearHold])

    // ── Hold loop ────────────────────────────────────────────────────────────
    const beginHold = useCallback(() => {
        gesture.current = 'holding'
        holdStart.current = performance.now()

        const tick = (now: number) => {
            if (gesture.current !== 'holding') return
            const p = Math.min(1, (now - holdStart.current!) / HOLD_DURATION_MS)
            setHoldProgress(p)
            if (p >= 1) { resetGesture(); onFlipRef.current(); return }
            holdRaf.current = requestAnimationFrame(tick)
        }
        holdRaf.current = requestAnimationFrame(tick)
    }, [resetGesture])

    // ── Animación de salida ──────────────────────────────────────────────────
    const exitAndAdvance = useCallback((wasKnown: boolean) => {
        const el = innerRef.current
        if (!el) { onNextRef.current(wasKnown); return }

        gesture.current = 'idle'

        const currentY = currentDY.current
        const targetY = wasKnown ? -window.innerHeight : window.innerHeight
        const rotate = wasKnown ? '-8deg' : '8deg'

        // Capturar si estaba volteada ANTES de resetear el flip
        const wasFlipped = flippedRef.current

        // Resetear el estado de flip inmediatamente — así cuando React monte
        // la nueva carta, flipped ya es false y el useEffect no pisa el DOM
        if (wasFlipped) onResetFlipRef.current()

        const base = wasFlipped ? 'rotateY(180deg) ' : ''
        const remaining = Math.abs(targetY - currentY)
        const durationMs = Math.max(160, remaining * 0.3)

        el.style.transition = `transform ${durationMs}ms ease, opacity ${durationMs * 0.75}ms ease`
        el.style.transform = `${base}translateY(${targetY}px) rotate(${rotate})`
        el.style.opacity = '0'

        setTimeout(() => {
            el.style.transition = 'none'
            el.style.transform = ''
            el.style.opacity = '1'
            onNextRef.current(wasKnown)
        }, durationMs + 16)
    }, [innerRef])

    // ── Handlers ─────────────────────────────────────────────────────────────
    const onPointerDown = useCallback((clientY: number) => {
        if (gesture.current !== 'idle') return
        gesture.current = 'pending'
        startY.current = clientY
        lastY.current = clientY
        lastTime.current = performance.now()
        currentDY.current = 0
        velocityY.current = 0
        intentTimer.current = setTimeout(beginHold, INTENT_DELAY_MS)
    }, [beginHold])

    const onPointerMove = useCallback((clientY: number) => {
        const dy = clientY - startY.current
        const now = performance.now()

        // Calcular velocidad instantánea (px/ms) con ventana pequeña
        const dt = now - lastTime.current
        if (dt > 0) {
            velocityY.current = (clientY - lastY.current) / dt
        }
        lastY.current = clientY
        lastTime.current = now
        currentDY.current = dy

        if (gesture.current === 'pending') {
            if (Math.abs(dy) > DRAG_SLOP_PX) {
                clearIntent()
                gesture.current = 'dragging'
                applyDrag(dy)
            }
            return
        }
        if (gesture.current === 'holding') {
            if (Math.abs(dy) > DRAG_SLOP_PX) {
                clearHold()
                gesture.current = 'dragging'
                applyDrag(dy)
            }
            return
        }
        if (gesture.current === 'dragging') {
            applyDrag(dy)
        }
    }, [applyDrag, clearIntent, clearHold])

    const onPointerUp = useCallback(() => {
        const dy = currentDY.current
        const state = gesture.current
        resetGesture()

        if (state === 'dragging') {
            const isFast = Math.abs(velocityY.current) > VELOCITY_THRESHOLD
            const threshold = isFast ? DRAG_THRESHOLD_FAST : DRAG_THRESHOLD_PX

            if (dy < -threshold) exitAndAdvance(true)
            else if (dy > threshold) exitAndAdvance(false)
            else snapBack()
        } else if (state === 'pending' || state === 'holding') {
            snapBack()
        }
    }, [resetGesture, snapBack, exitAndAdvance])

    const onPointerCancel = useCallback(() => {
        resetGesture()
        snapBack()
    }, [resetGesture, snapBack])

    // ── Wheel ────────────────────────────────────────────────────────────────
    useEffect(() => {
        const el = wrapperRef.current
        if (!el) return
        let lastWheel = 0
        const handler = (e: WheelEvent) => {
            e.preventDefault()
            const now = Date.now()
            if (now - lastWheel < WHEEL_COOLDOWN_MS) return
            lastWheel = now
            if (e.deltaY < -30) exitAndAdvance(true)
            else if (e.deltaY > 30) exitAndAdvance(false)
        }
        el.addEventListener('wheel', handler, { passive: false })
        return () => el.removeEventListener('wheel', handler)
    }, [wrapperRef, exitAndAdvance])

    return { holdProgress, onPointerDown, onPointerMove, onPointerUp, onPointerCancel }
}