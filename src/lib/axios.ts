/**
 * Axios Instance
 * Cliente HTTP centralizado con interceptores desacoplados
 *
 * Arquitectura:
 * - Request interceptor: agrega autenticación
 * - Response interceptor: mapea errores, maneja refresh token
 */

import axios from 'axios'
import { env } from '@/app/config/env'
import { authRequestInterceptor } from '@/lib/authInterceptor'
import { errorResponseInterceptor } from '@/lib/errorInterceptor'

/**
 * Crear instancia de Axios con configuración base
 */
const api = axios.create({
    baseURL: env.apiUrl,
    timeout: 15000,
})

/**
 * Interceptor de REQUEST
 * Responsabilidad: Agregar autenticación (Bearer token)
 */
api.interceptors.request.use(authRequestInterceptor)

/**
 * Interceptor de RESPONSE
 * Responsabilidad: Mapear errores y manejar refresh token
 */
api.interceptors.response.use(
    (response) => response,
    errorResponseInterceptor
)

export default api