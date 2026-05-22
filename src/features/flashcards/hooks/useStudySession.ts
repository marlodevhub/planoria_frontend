
import { useState, useCallback } from 'react'
import type { Card } from '../types/flashcard.types'

export function useStudySession(cards: Card[]) {
    const [idx, setIdx] = useState(0)
    const [flipped, setFlipped] = useState(false)
    const [known, setKnown] = useState(0)
    const [unknown, setUnknown] = useState(0)
    const [done, setDone] = useState(false)

    const current = cards[idx]
    const progress = cards.length > 0 ? idx / cards.length : 0
    const isLast = idx + 1 >= cards.length

    const advance = useCallback((wasKnown: boolean) => {
        if (wasKnown) setKnown((k) => k + 1)
        else setUnknown((u) => u + 1)

        if (isLast) setDone(true)
        else setIdx((i) => i + 1)
    }, [isLast])

    const resetFlip = useCallback(() => {
        setFlipped(false)
    }, [])

    const flip = useCallback(() => {
        setFlipped((f) => !f)
    }, [])

    const reset = useCallback(() => {
        setIdx(0)
        setKnown(0)
        setUnknown(0)
        setDone(false)
        setFlipped(false)
    }, [])

    return { current, idx, flipped, known, unknown, done, progress, flip, resetFlip, advance, reset }
}