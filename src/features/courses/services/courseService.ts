import api from "@/lib/axios";
import { COURSE_API_ROUTES } from "../constants/api";
import type {
  Course,
  CourseDetail,
  CreateCourseDto,
  UpdateCourseDto,
} from "../types/course.types";

export const courseService = {
  /**
   * [HttpGet] api/courses
   * Obtiene los cursos asignados al Usuario autenticado
   */
  async getAll(): Promise<Course[]> {
    const { data } = await api.get<Course[]>(COURSE_API_ROUTES.BASE);
    return data;
  },

  /**
   * [HttpGet("search")] api/courses/search
   * Filtra los cursos del usuario (Envía Query Params)
   */
  async search(searchTerm: string): Promise<Course[]> {
    const { data } = await api.get<Course[]>(COURSE_API_ROUTES.SEARCH, {
      params: { searchTerm }, // Tu C# espera un CourseSearchRequestDto, ajusta la clave si es necesario
    });
    return data;
  },

  /**
   * [HttpGet("{id}")] api/courses/{id}
   * Obtiene el detalle completo de un curso por su ID
   */
  async getById(id: number): Promise<CourseDetail> {
    const { data } = await api.get<CourseDetail>(COURSE_API_ROUTES.BY_ID(id));
    return data;
  },

  /**
   * [HttpPost] api/courses
   * Crea un nuevo curso (El backend asocia automáticamente el UserId desde el token)
   */
  async create(dto: CreateCourseDto): Promise<Course> {
    const { data } = await api.post<Course>(COURSE_API_ROUTES.BASE, dto);
    return data;
  },

  /**
   * [HttpPut("{id}")] api/courses/{id}
   * Actualiza la información básica del curso
   */
  async update(id: number, dto: UpdateCourseDto): Promise<Course> {
    const { data } = await api.put<Course>(COURSE_API_ROUTES.BY_ID(id), dto);
    return data;
  },

  /**
   * [HttpDelete("{id}")] api/courses/{id}
   * Elimina físicamente o por soft-delete un curso
   * Mapea a un `NoContent()` en C#, por lo que retorna void en TS
   */
  async remove(id: number): Promise<void> {
    await api.delete(COURSE_API_ROUTES.BY_ID(id));
  },

  /**
   * [HttpPatch("{id}/archive")] api/courses/{id}/archive
   * Cambia el estado del curso a archivado (NoContent en C#)
   */
  async archive(id: number): Promise<void> {
    await api.patch(COURSE_API_ROUTES.ARCHIVE(id));
  },

  /**
   * [HttpPatch("{id}/restore")] api/courses/{id}/restore
   * Restaura un curso archivado (NoContent en C#)
   */
  async restore(id: number): Promise<void> {
    await api.patch(COURSE_API_ROUTES.RESTORE(id));
  },
};

