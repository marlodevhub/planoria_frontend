import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../types/auth.types'

interface AuthState {
    user: User | null
    token: string | null
    refreshToken: string | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null

    setAuth: (user: User, token: string, refreshToken: string) => void
    setToken: (token: string, refreshToken: string) => void
    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            setAuth: (user, token, refreshToken) =>
                set({ user, token, refreshToken, isAuthenticated: true, error: null }),

            setToken: (token, refreshToken) =>
                set({ token, refreshToken }),

            setLoading: (isLoading) => set({ isLoading }),

            setError: (error) => set({ error }),

            logout: () =>
                set({
                    user: null,
                    token: null,
                    refreshToken: null,
                    isAuthenticated: false,
                    error: null,
                }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                refreshToken: state.refreshToken,
                isAuthenticated: state.isAuthenticated,
            }),
        },
    ),
)