import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/features/auth/types/auth.types'

interface AuthState {
    user: User | null        // ← tipado correcto, no any
    token: string | null
    isAuthenticated: boolean
    setAuth: (user: User, token: string) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            setAuth: (user, token) => {
                set({ user, token, isAuthenticated: true })  // ← sin localStorage
            },

            logout: () => {
                set({ user: null, token: null, isAuthenticated: false })  // ← sin localStorage
            },
        }),
        { name: 'auth-storage' }
    )
)