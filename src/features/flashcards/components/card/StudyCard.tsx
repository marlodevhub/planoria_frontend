import { useRef, useEffect } from 'react'
import { HoldRing } from './HoldRing'
import { useGestureHandler } from '../../hooks/study/useGestureHandler'
import type { Card } from '../../types/flashcard.types'

interface StudyCardProps {
    card: Card
    flipped: boolean
    cardsBehind: number
    onFlip: () => void
    onResetFlip: () => void
    onNext: (wasKnown: boolean) => void
}

export function StudyCard({ card, flipped, cardsBehind, onFlip, onResetFlip, onNext }: StudyCardProps) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const innerRef = useRef<HTMLDivElement>(null)

    const { holdProgress, onPointerDown, onPointerMove, onPointerUp, onPointerCancel } =
        useGestureHandler({ flipped, onFlip, onResetFlip, onNext, wrapperRef, innerRef })

    // Sincronizar flip visual
    useEffect(() => {
        const el = innerRef.current
        if (!el) return
        el.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)'
        el.style.transform = flipped ? 'rotateY(180deg)' : ''
    }, [flipped])

    // ── Capturar mouse en document para que funcione fuera de la tarjeta ─────
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault()
        onPointerDown(e.clientY)

        const handleMove = (e: MouseEvent) => onPointerMove(e.clientY)
        const handleUp = () => {
            onPointerUp()
            document.removeEventListener('mousemove', handleMove)
            document.removeEventListener('mouseup', handleUp)
        }

        document.addEventListener('mousemove', handleMove)
        document.addEventListener('mouseup', handleUp)
    }

    return (
        <div className="relative w-80 h-52 " ref={wrapperRef}>
            {cardsBehind >= 2 && (
                <div className="absolute inset-0 rounded-2xl bg-accent  translate-y-6 scale-[0.94] opacity-30" />
            )}
            {cardsBehind >= 1 && (
                <div className="absolute inset-0 rounded-2xl bg-accent  translate-y-3 scale-[0.97] opacity-60" />
            )}

            <div
                className="absolute inset-0 touch-none select-none"
                style={{ perspective: '1200px' }}
                onMouseDown={handleMouseDown}
                onTouchStart={(e) => onPointerDown(e.touches[0].clientY)}
                onTouchMove={(e) => { e.preventDefault(); onPointerMove(e.touches[0].clientY) }}
                onTouchEnd={onPointerUp}
                onTouchCancel={onPointerCancel}
            >
                <div ref={innerRef} className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Frente */}
                    <div
                        className="absolute inset-0 rounded-2xl bg-accent  flex flex-col items-center justify-center p-6 text-center"
                        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                    >
                        <span className="text-text text-[11px] font-mono uppercase tracking-widest mb-3">Pregunta</span>
                        <p className="text-white font-semibold text-lg leading-snug">{card.question}</p>
                        <span className="text-muted text-xs mt-4">Mantén para ver respuesta</span>
                        <HoldRing progress={holdProgress} />
                    </div>

                    {/* Reverso */}
                    <div
                        className="absolute inset-0 rounded-2xl bg-white border border-accent/30 flex flex-col items-center justify-center p-6 text-center"
                        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                        <span className="text-accent text-[11px] font-mono uppercase tracking-widest mb-3">Respuesta</span>
                        <p className="text-text font-semibold text-lg leading-snug">{card.answer}</p>
                        <HoldRing progress={holdProgress} />
                    </div>
                </div>
            </div>
        </div>
    )
}