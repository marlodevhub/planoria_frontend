import api from "@/lib/axios";
import { COURSE_API_ROUTES } from "../constants/api";
import type {
  Course,
  CourseDetail,
  CreateCourseDto,
  UpdateCourseDto,
  CourseMember,
  AddMemberDto,
  CourseExam,
  CreateExamDto,
  UpdateExamDto,
  CourseStats,
  CourseExamProgress,
  ReadinessScore,
  WeaknessesResponse,
} from "../types/course.types";

export const courseService = {
  async getAll(): Promise<Course[]> {
    const { data } = await api.get<Course[]>(COURSE_API_ROUTES.BASE);
    return data;
  },

  async search(searchTerm: string): Promise<Course[]> {
    const { data } = await api.get<Course[]>(COURSE_API_ROUTES.SEARCH, {
      params: { searchTerm },
    });
    return data;
  },

  async getById(id: number): Promise<CourseDetail> {
    const { data } = await api.get<CourseDetail>(COURSE_API_ROUTES.BY_ID(id));
    return data;
  },

  async create(dto: CreateCourseDto): Promise<Course> {
    const { data } = await api.post<Course>(COURSE_API_ROUTES.BASE, dto);
    return data;
  },

  async update(id: number, dto: UpdateCourseDto): Promise<Course> {
    const { data } = await api.put<Course>(COURSE_API_ROUTES.BY_ID(id), dto);
    return data;
  },

  async remove(id: number): Promise<void> {
    await api.delete(COURSE_API_ROUTES.BY_ID(id));
  },

  async archive(id: number): Promise<void> {
    await api.patch(COURSE_API_ROUTES.ARCHIVE(id));
  },

  async restore(id: number): Promise<void> {
    await api.patch(COURSE_API_ROUTES.RESTORE(id));
  },

  async getMembers(courseId: number): Promise<CourseMember[]> {
    const { data } = await api.get<CourseMember[]>(
      COURSE_API_ROUTES.MEMBERS(courseId),
    );
    return data;
  },

  async addMember(courseId: number, dto: AddMemberDto): Promise<CourseMember> {
    const { data } = await api.post<CourseMember>(
      COURSE_API_ROUTES.MEMBERS(courseId),
      dto,
    );
    return data;
  },

  async removeMember(courseId: number, userId: number): Promise<void> {
    await api.delete(COURSE_API_ROUTES.MEMBER_BY_ID(courseId, userId));
  },

  async getExams(courseId: number): Promise<CourseExam[]> {
    const { data } = await api.get<CourseExam[]>(
      COURSE_API_ROUTES.EXAMS(courseId),
    );
    return data;
  },

  async createExam(courseId: number, dto: CreateExamDto): Promise<CourseExam> {
    const { data } = await api.post<CourseExam>(
      COURSE_API_ROUTES.EXAMS(courseId),
      dto,
    );
    return data;
  },

  async updateExam(
    courseId: number,
    examId: number,
    dto: UpdateExamDto,
  ): Promise<CourseExam> {
    const { data } = await api.put<CourseExam>(
      COURSE_API_ROUTES.EXAM_BY_ID(courseId, examId),
      dto,
    );
    return data;
  },

  async deleteExam(courseId: number, examId: number): Promise<void> {
    await api.delete(COURSE_API_ROUTES.EXAM_BY_ID(courseId, examId));
  },

  async getStats(courseId: number): Promise<CourseStats> {
    const { data } = await api.get<CourseStats>(
      COURSE_API_ROUTES.STATS(courseId),
    );
    return data;
  },

  async getExamProgress(courseId: number): Promise<CourseExamProgress> {
    const { data } = await api.get<CourseExamProgress>(
      COURSE_API_ROUTES.COURSE_EXAM_PROGRESS(courseId),
    );
    return data;
  },

  async getReadiness(courseId: number): Promise<ReadinessScore> {
    const { data } = await api.get<ReadinessScore>(
      COURSE_API_ROUTES.EXAM_READINESS(courseId),
    );
    return data;
  },

  async getWeaknesses(courseId: number): Promise<WeaknessesResponse> {
    const { data } = await api.get<WeaknessesResponse>(
      COURSE_API_ROUTES.EXAM_WEAKNESSES(courseId),
    );
    return data;
  },
};
