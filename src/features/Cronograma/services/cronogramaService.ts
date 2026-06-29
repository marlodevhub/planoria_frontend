import api from '@/lib/axios'
import { CRONOGRAMA_API_ROUTES } from '../constants/api'
import type {
  Schedule,
  ScheduleListItem,
  CreateScheduleRequest,
  UpdateScheduleRequest,
  ScheduleContentItem,
  CreateScheduleContentDto,
  UpdateScheduleContentDto,
  AutoAssignRequest,
  ScheduleSuggestion,
  ScheduleContentListResponse,
  ScheduleRecommendation,
  AutoScheduleRequest,
  AutoScheduleResponse,
  CalendarDay,
} from '../types/cronograma.types'

export const cronogramaService = {
  async getAll(): Promise<ScheduleListItem[]> {
    const { data } = await api.get<ScheduleListItem[]>(CRONOGRAMA_API_ROUTES.SCHEDULES)
    return data
  },

  async getById(id: number): Promise<Schedule> {
    const { data } = await api.get<Schedule>(CRONOGRAMA_API_ROUTES.SCHEDULE_BY_ID(id))
    return data
  },

  async getByDateRange(from: string, to: string): Promise<ScheduleListItem[]> {
    const { data } = await api.get<ScheduleListItem[]>(CRONOGRAMA_API_ROUTES.RANGE, {
      params: { from, to },
    })
    return data
  },

  async getMonthView(year: number, month: number): Promise<CalendarDay[]> {
    interface MonthViewResponse {
      year: number
      month: number
      days: CalendarDay[]
    }
    const { data } = await api.get<MonthViewResponse>(CRONOGRAMA_API_ROUTES.CALENDAR_MONTH, {
      params: { year, month },
    })
    return data.days ?? []
  },

  async getDayView(date: string): Promise<ScheduleListItem[]> {
    const { data } = await api.get<CalendarDay>(CRONOGRAMA_API_ROUTES.CALENDAR_DAY, {
      params: { date },
    })
    return data.schedules ?? []
  },

  async create(req: CreateScheduleRequest): Promise<Schedule> {
    const { data } = await api.post<Schedule>(CRONOGRAMA_API_ROUTES.SCHEDULES, {
      ...req,
      courseIds: req.courseIds ?? [],
      intervals: req.intervals ?? [],
      content: req.content ?? [],
    })
    return data
  },

  async update(id: number, req: UpdateScheduleRequest): Promise<Schedule> {
    const { data } = await api.put<Schedule>(CRONOGRAMA_API_ROUTES.SCHEDULE_BY_ID(id), req)
    return data
  },

  async delete(id: number): Promise<void> {
    await api.delete(CRONOGRAMA_API_ROUTES.SCHEDULE_BY_ID(id))
  },

  async markComplete(id: number): Promise<void> {
    await api.patch(CRONOGRAMA_API_ROUTES.MARK_COMPLETE(id))
  },

  async markIncomplete(id: number): Promise<void> {
    await api.patch(CRONOGRAMA_API_ROUTES.MARK_INCOMPLETE(id))
  },

  async bulkComplete(ids: number[]): Promise<void> {
    await api.post(CRONOGRAMA_API_ROUTES.BULK_COMPLETE, ids)
  },

  async getContents(scheduleId: number): Promise<ScheduleContentListResponse> {
    const { data } = await api.get<ScheduleContentListResponse>(
      CRONOGRAMA_API_ROUTES.CONTENTS(scheduleId),
    )
    return data
  },

  async createContent(scheduleId: number, dto: CreateScheduleContentDto): Promise<ScheduleContentItem> {
    const { data } = await api.post<ScheduleContentItem>(
      CRONOGRAMA_API_ROUTES.CONTENTS(scheduleId),
      { ...dto, scheduleId },
    )
    return data
  },

  async deleteContent(scheduleId: number, contentId: number): Promise<void> {
    await api.delete(CRONOGRAMA_API_ROUTES.CONTENT_BY_ID(scheduleId, contentId))
  },

  async autoAssignContent(scheduleId: number, dto: AutoAssignRequest): Promise<void> {
    await api.post(CRONOGRAMA_API_ROUTES.AUTO_ASSIGN(scheduleId), dto)
  },

  async autoSchedule(dto: AutoScheduleRequest): Promise<AutoScheduleResponse> {
    const { data } = await api.post<AutoScheduleResponse>(CRONOGRAMA_API_ROUTES.BASE, dto)
    return data
  },
}
