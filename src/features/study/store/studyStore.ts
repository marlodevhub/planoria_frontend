import { create } from 'zustand'
import { UploadFileResponse } from '../types/study.types'

// Definimos los modos para que siempre sepamos qué está estudiando el usuario
export type StudyMode = 'FLASHCARDS' | 'QUIZ' | null

interface StudyState {
    currentMazo: UploadFileResponse | null
    studyMode: StudyMode

    // Acciones para modificar el estado
    setMazo: (mazo: UploadFileResponse | null) => void
    setStudyMode: (mode: StudyMode) => void
    clearStudy: () => void
}

export const useStudyStore = create<StudyState>((set) => ({
    currentMazo: null,
    studyMode: null,

    setMazo: (mazo) => set({ currentMazo: mazo }),
    setStudyMode: (mode) => set({ studyMode: mode }),
    clearStudy: () => set({ currentMazo: null, studyMode: null }),
}))