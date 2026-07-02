import type { AxiosError } from 'axios'
import { ApiError, ApiErrorCode } from '@/lib/apiError'
import { useAuthStore } from '@/features/auth/store/authStore'
import { authService } from '@/features/auth/services/authService'

const SKIP_REFRESH_URLS = ['/auth/login', '/auth/register', '/auth/refresh']

function shouldSkipRefresh(url?: string): boolean {
    if (!url) return false
    return SKIP_REFRESH_URLS.some((skipUrl) => url.includes(skipUrl))
}

function mapStatusToErrorCode(status: number, message?: string): ApiErrorCode {
    switch (status) {
        case 400:
            if (message?.toLowerCase().includes('password')) return ApiErrorCode.WEAK_PASSWORD
            if (message?.toLowerCase().includes('credential')) return ApiErrorCode.INVALID_CREDENTIALS
            return ApiErrorCode.BAD_REQUEST
        case 401: return ApiErrorCode.UNAUTHORIZED
        case 409:
            if (message?.toLowerCase().includes('email') || message?.toLowerCase().includes('already'))
                return ApiErrorCode.EMAIL_ALREADY_EXISTS
            return ApiErrorCode.BAD_REQUEST
        case 422: return ApiErrorCode.VALIDATION_ERROR
        case 429: return ApiErrorCode.RATE_LIMITED
        case 500:
        case 502:
        case 503:
        case 504: return ApiErrorCode.INTERNAL_SERVER_ERROR
        default: return ApiErrorCode.UNKNOWN_ERROR
    }
}

async function attemptTokenRefresh(): Promise<boolean> {
    try {
        const refreshToken = useAuthStore.getState().refreshToken
        if (!refreshToken) return false

        const response = await authService.refreshToken(refreshToken)
        return !!response
    } catch {
        return false
    }
}

export const errorResponseInterceptor = async (error: AxiosError) => {
    const status = error.response?.status || 0
    const responseData = error.response?.data as any
    const errorCode = mapStatusToErrorCode(status, responseData?.message || responseData?.error)
    const apiError = new ApiError(errorCode, status, error, responseData?.message)

    if (status === 401 && !shouldSkipRefresh(error.config?.url)) {
        const refreshSucceeded = await attemptTokenRefresh()

        if (!refreshSucceeded) {
            useAuthStore.getState().logout()
            window.location.href = '/login'
        }
    }

    return Promise.reject(apiError)
}