import api from '@/lib/axios'
import type { Curso } from '../types/curso.types'

export const cursoService = {
    getCursos: (): Promise<Curso[]> =>
        api.get('/cursos').then(r => r.data),

    createCurso: (nombre: string): Promise<Curso> =>
        api.post('/cursos', { nombre }).then(r => r.data),
}