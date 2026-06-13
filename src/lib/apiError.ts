/**
 * ApiError
 * Clase estándar para errores de API
 * Mapea estados HTTP y errores del servidor a códigos predefinidos
 */

export enum ApiErrorCode {
    // Auth errors
    UNAUTHORIZED = 'UNAUTHORIZED',
    EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    WEAK_PASSWORD = 'WEAK_PASSWORD',
    TOKEN_EXPIRED = 'TOKEN_EXPIRED',

    // Validation errors
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    BAD_REQUEST = 'BAD_REQUEST',

    // Server errors
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
    RATE_LIMITED = 'RATE_LIMITED',

    // Network errors
    NETWORK_ERROR = 'NETWORK_ERROR',
    TIMEOUT = 'TIMEOUT',

    // Unknown
    UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export class ApiError extends Error {
    constructor(
        public code: ApiErrorCode,
        public statusCode: number,
        public originalError?: any,
        message?: string
    ) {
        super(message || ApiError.getDefaultMessage(code))
        this.name = 'ApiError'
    }

    static getDefaultMessage(code: ApiErrorCode): string {
        const messages: Record<ApiErrorCode, string> = {
            [ApiErrorCode.UNAUTHORIZED]: 'Sesión expirada. Por favor, inicia sesión nuevamente.',
            [ApiErrorCode.EMAIL_ALREADY_EXISTS]: 'El correo electrónico ya está registrado.',
            [ApiErrorCode.INVALID_CREDENTIALS]: 'Correo o contraseña incorrectos.',
            [ApiErrorCode.WEAK_PASSWORD]: 'La contraseña es muy débil.',
            [ApiErrorCode.TOKEN_EXPIRED]: 'Tu token ha expirado.',
            [ApiErrorCode.VALIDATION_ERROR]: 'Error en la validación de datos.',
            [ApiErrorCode.BAD_REQUEST]: 'Solicitud inválida.',
            [ApiErrorCode.INTERNAL_SERVER_ERROR]: 'Error interno del servidor.',
            [ApiErrorCode.SERVICE_UNAVAILABLE]: 'Servicio no disponible.',
            [ApiErrorCode.RATE_LIMITED]: 'Demasiadas solicitudes. Intenta más tarde.',
            [ApiErrorCode.NETWORK_ERROR]: 'Error de conectividad.',
            [ApiErrorCode.TIMEOUT]: 'La solicitud tardó demasiado.',
            [ApiErrorCode.UNKNOWN_ERROR]: 'Error desconocido.',
        }
        return messages[code]
    }

    isAuthError(): boolean {
        return [ApiErrorCode.UNAUTHORIZED, ApiErrorCode.TOKEN_EXPIRED].includes(this.code)
    }

    isNetworkError(): boolean {
        return [ApiErrorCode.NETWORK_ERROR, ApiErrorCode.TIMEOUT].includes(this.code)
    }

    isServerError(): boolean {
        return this.statusCode >= 500
    }
}
