import { create } from 'zustand'
import type { StudySession } from '../types/study.types'

export type StudyMode = 'FLASHCARDS' | 'QUIZ' | null

interface StudyState {
    currentSession: StudySession | null
    studyMode: StudyMode

    setCurrentSession: (session: StudySession | null) => void
    setStudyMode: (mode: StudyMode) => void
    clearStudy: () => void
}

export const useStudyStore = create<StudyState>((set) => ({
    currentSession: null,
    studyMode: null,

    setCurrentSession: (session) => set({ currentSession: session }),
    setStudyMode: (mode) => set({ studyMode: mode }),
    clearStudy: () => set({ currentSession: null, studyMode: null }),
}))