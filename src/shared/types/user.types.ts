export interface User {
    id: string
    nombre: string
    correo: string
    rol: 'ADMIN' | 'USER'
}