import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/shared/types/user.types'

interface AuthState {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    setAuth: (user: User, token: string) => void
    logout: () => void
}

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            ...initialState,
            setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
            logout: () => set(initialState),
        }),
        { name: 'auth-storage' }
    )
)