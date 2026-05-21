export interface User {
    id: string
    name: string
    email: string
    role: 'admin' | 'user'
}

export interface LoginPayload {
    email: string
    password: string
}

export interface RegisterPayload {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export interface AuthResponse {
    user: User
    token: string
}