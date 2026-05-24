import api from '@/lib/axios'
import type { UploadFileResponse } from '../types/study.types'

/**
 * Servicio para la gestión de documentos y análisis IA
 */
export const studyService = {
    /**
     * Sube el archivo y recibe el objeto de análisis de la IA
     */
    async uploadDocument(file: File): Promise<UploadFileResponse> {
        const formData = new FormData()
        // Asegúrate de que 'archivo' coincida exactamente con el nombre esperado por tu backend
        formData.append('archivo', file)

        const response = await api.post<UploadFileResponse>('/archivo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        return response.data
    },

    /**
     * Lista los documentos subidos anteriormente
     */
    async getAllDocuments(): Promise<UploadFileResponse[]> {
        const response = await api.get<UploadFileResponse[]>('/archivos')
        return response.data
    }
}