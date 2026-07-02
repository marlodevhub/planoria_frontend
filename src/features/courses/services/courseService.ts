import api from "@/lib/axios";
import { COURSE_API_ROUTES } from "../constants/api";
import type {
  Course,
  CourseDetail,
  CreateCoursePayload,
  UpdateCourseDto,
  CourseStats,
} from "../types/course.types";

export const courseService = {
  // ============================================================
  // CRUD BÁSICO
  // ============================================================

  /**
   * [HttpGet] api/courses
   */
  async getAll(): Promise<Course[]> {
    const { data } = await api.get<Course[]>(COURSE_API_ROUTES.BASE);
    return data;
  },

  /**
   * [HttpGet("{id}")] api/courses/{id}
   */
  async getById(id: number): Promise<CourseDetail> {
    const { data } = await api.get<CourseDetail>(COURSE_API_ROUTES.BY_ID(id));
    return data;
  },

  /**
   * [HttpPost] api/courses
   */
  async create(dto: CreateCoursePayload): Promise<Course> {
    const { data } = await api.post<Course>(COURSE_API_ROUTES.BASE, dto);
    return data;
  },

  /**
   * [HttpPut("{id}")] api/courses/{id}
   */
  async update(id: number, dto: UpdateCourseDto): Promise<Course> {
    const { data } = await api.put<Course>(COURSE_API_ROUTES.BY_ID(id), dto);
    return data;
  },

  /**
   * [HttpDelete("{id}")] api/courses/{id}
   */
  async remove(id: number): Promise<void> {
    await api.delete(COURSE_API_ROUTES.BY_ID(id));
  },

  // ============================================================
  // ARCHIVO Y RESTAURACIÓN
  // ============================================================

  /**
   * [HttpPatch("{id}/archive")] api/courses/{id}/archive
   */
  async archive(id: number): Promise<void> {
    await api.patch(COURSE_API_ROUTES.ARCHIVE(id));
  },

  /**
   * [HttpPatch("{id}/restore")] api/courses/{id}/restore
   */
  async restore(id: number): Promise<void> {
    await api.patch(COURSE_API_ROUTES.RESTORE(id));
  },

  // ============================================================
  // BÚSQUEDA Y ESTADÍSTICAS
  // ============================================================

  /**
   * [HttpGet("search")] api/courses/search
   */
  // async search(searchTerm: string): Promise<Course[]> {
  //   const { data } = await api.get<Course[]>(COURSE_API_ROUTES.SEARCH, {
  //     params: { searchTerm },
  //   });
  //   return data;
  // },

  /**
   * [HttpGet("{id}/stats")] api/courses/{id}/stats
   */
  // async getStats(id: number): Promise<CourseStats> {
  //   const { data } = await api.get<CourseStats>(COURSE_API_ROUTES.STATS(id));
  //   return data;
  // },



  // ============================================================
  //NOTE: MIEMBROS DEL CURSO FALTA
  // ============================================================

}