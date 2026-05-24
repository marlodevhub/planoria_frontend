import { User } from '@/shared/types/user.types'

export interface LoginPayload {
    correo: string
    password: string
}

export interface RegisterPayload {
    nombre: string
    apellido: string  // Aseguramos consistencia global con una sola 'p'
    correo: string
    password: string
}

export interface AuthResponse {
    user: User
    token: string
}

export interface ApiAuthResponse {
    token: string
    idUsuario: number
    nombre: string
    correo: string
    rol: 'ADMIN' | 'USER'
}