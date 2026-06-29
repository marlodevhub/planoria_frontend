import { useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMonthView } from '../hooks/useMonthView'
import { useDayView } from '../hooks/useDayView'
import { useCreateSchedule } from '../hooks/useCreateSchedule'
import { useToggleComplete } from '../hooks/useToggleComplete'
import { useDeleteSchedule } from '../hooks/useDeleteSchedule'
import { useScheduleContents } from '../hooks/useScheduleContents'
import { useCreateScheduleContent } from '../hooks/useCreateScheduleContent'
import { useDeleteScheduleContent } from '../hooks/useDeleteScheduleContent'
import { useAutoAssignContent } from '../hooks/useAutoAssignContent'
import { useCourses } from '@/features/courses/hooks'
import { useDecks } from '@/features/flashcards/hooks'
import { useQuizzes } from '@/features/quizzes/hooks'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import type { ScheduleListItem } from '../types/cronograma.types'

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

const scheduleSchema = z.object({
  titulo: z.string().min(1, 'El título es requerido'),
  fecha: z.string().min(1, 'Seleccioná una fecha'),
  horaInicio: z.string().min(1, 'Seleccioná hora de inicio'),
  horaFin: z.string().min(1, 'Seleccioná hora de fin'),
  cursoId: z.string().default(''),
})

const contentSchema = z.object({
  contentType: z.enum(['flashcard', 'quiz']),
  contentId: z.string().min(1, 'Seleccioná un contenido'),
  estimatedMinutes: z.string().optional(),
})

type ScheduleFormFields = z.infer<typeof scheduleSchema>
type ContentFormFields = z.infer<typeof contentSchema>

function formatTime(iso: string) {
  try { return new Date(iso).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) } catch { return iso }
}

function formatDate(iso: string) {
  try { return new Date(iso).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }) } catch { return iso }
}

export function CronogramaPage() {
  const today = useMemo(() => new Date(), [])
  const [viewingYear, setViewingYear] = useState(today.getFullYear())
  const [viewingMonth, setViewingMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null)
  const [showContentModal, setShowContentModal] = useState(false)

  const { data: monthDays, isLoading, isError: monthError } = useMonthView(viewingYear, viewingMonth + 1)
  const { data: daySchedules, isLoading: dayLoading, isError: dayError } = useDayView(selectedDate ?? '')
  const { data: courses } = useCourses()
  const { data: decks } = useDecks()
  const { data: quizzes } = useQuizzes()

  const courseColorMap = useMemo(() => {
    const map = new Map<string, string>()
    if (courses) {
      for (const c of courses) {
        map.set(c.name, c.colorHex)
      }
    }
    return map
  }, [courses])

  const toggleComplete = useToggleComplete()
  const deleteSchedule = useDeleteSchedule()
  const createSchedule = useCreateSchedule()

  const { data: contents } = useScheduleContents(selectedScheduleId ?? 0)
  const createContent = useCreateScheduleContent(selectedScheduleId ?? 0)
  const deleteContent = useDeleteScheduleContent(selectedScheduleId ?? 0)
  const autoAssign = useAutoAssignContent(selectedScheduleId ?? 0)

  const contentForm = useForm<ContentFormFields>({
    resolver: zodResolver(contentSchema) as any,
    defaultValues: {
      contentType: 'flashcard',
      contentId: '',
      estimatedMinutes: '15',
    },
  })

  const form = useForm<ScheduleFormFields>({
    resolver: zodResolver(scheduleSchema) as any,
    defaultValues: {
      titulo: '',
      fecha: '',
      horaInicio: '',
      horaFin: '',
      cursoId: '',
    },
  })

  function openCreateModalWithDate(date?: string) {
    if (date) {
      form.setValue('fecha', date)
    } else {
      const y = today.getFullYear()
      const m = String(today.getMonth() + 1).padStart(2, '0')
      const d = String(today.getDate()).padStart(2, '0')
      form.setValue('fecha', `${y}-${m}-${d}`)
    }
    form.setValue('horaInicio', '09:00')
    form.setValue('horaFin', '10:00')
    setShowCreateModal(true)
  }

  function openContentModal(scheduleId: number) {
    setSelectedScheduleId(scheduleId)
    contentForm.reset({
      contentType: 'flashcard',
      contentId: '',
      estimatedMinutes: '15',
    })
    setShowContentModal(true)
  }

  function onCourseSelect(courseId: string) {
    form.setValue('cursoId', courseId)
    if (!courseId) return
    const course = courses?.find((c) => String(c.id) === courseId)
    if (course) {
      form.setValue('titulo', `Estudio: ${course.name}`)
    }
  }

  function onSubmit(data: ScheduleFormFields) {
    const startDateTime = `${data.fecha}T${data.horaInicio}:00`
    const endDateTime = `${data.fecha}T${data.horaFin}:00`
    createSchedule.mutate(
      {
        title: data.titulo,
        startDateTime,
        endDateTime,
        courseIds: data.cursoId ? [Number(data.cursoId)] : [],
      },
      {
        onSuccess: () => {
          setShowCreateModal(false)
          setSelectedDate(data.fecha)
          form.reset()
        },
      },
    )
  }

  function onContentSubmit(data: ContentFormFields) {
    if (!selectedScheduleId) return
    createContent.mutate(
      {
        contentType: data.contentType,
        contentId: Number(data.contentId),
        estimatedMinutes: Number(data.estimatedMinutes) || 15,
      },
      {
        onSuccess: () => {
          setShowContentModal(false)
          contentForm.reset()
        },
      },
    )
  }

  function handleAutoAssign() {
    if (!selectedScheduleId) return
    autoAssign.mutate({
      courseId: 0,
      daysBeforeExam: 30,
    })
  }

  const selectedDateObj = selectedDate ? new Date(selectedDate + 'T00:00:00') : null

  const monthGrid = useMemo(() => {
    const firstDay = new Date(viewingYear, viewingMonth, 1)
    const lastDay = new Date(viewingYear, viewingMonth + 1, 0)
    const startPad = firstDay.getDay()
    const totalSlots = startPad + lastDay.getDate()
    const rows = Math.ceil(totalSlots / 7)
    const grid: ({ date: Date; schedules: ScheduleListItem[] } | null)[] = []

    const dayMap = new Map<string, ScheduleListItem[]>()
    if (monthDays) {
      for (const d of monthDays) {
        const key = new Date(d.date).toDateString()
        const existing = dayMap.get(key) ?? []
        existing.push(...d.schedules)
        dayMap.set(key, existing)
      }
    }

    for (let i = 0; i < rows * 7; i++) {
      const dayNum = i - startPad + 1
      if (dayNum < 1 || dayNum > lastDay.getDate()) {
        grid.push(null)
      } else {
        const date = new Date(viewingYear, viewingMonth, dayNum)
        const key = date.toDateString()
        const schedules = dayMap.get(key) ?? []
        grid.push({ date, schedules })
      }
    }

    return { grid, cols: 7 }
  }, [viewingYear, viewingMonth, monthDays])

  function prevMonth() {
    if (viewingMonth === 0) {
      setViewingYear((y) => y - 1)
      setViewingMonth(11)
    } else {
      setViewingMonth((m) => m - 1)
    }
    setSelectedDate(null)
  }

  function nextMonth() {
    if (viewingMonth === 11) {
      setViewingYear((y) => y + 1)
      setViewingMonth(0)
    } else {
      setViewingMonth((m) => m + 1)
    }
    setSelectedDate(null)
  }

  function handleDayClick(date: Date) {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    setSelectedDate(`${y}-${m}-${d}`)
  }

  function isToday(d: Date) {
    return d.toDateString() === today.toDateString()
  }

  const availableFlashcards = decks ?? []
  const availableQuizzes = quizzes?.filter((q) => q.activo) ?? []

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Cronograma</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gestiona tus horarios de estudio
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-5">
              <Button variant="ghost" onClick={prevMonth}>
                <i className="ti ti-chevron-left" />
              </Button>
              <h2 className="text-lg font-semibold text-foreground">
                {MONTHS[viewingMonth]} {viewingYear}
              </h2>
              <Button variant="ghost" onClick={nextMonth}>
                <i className="ti ti-chevron-right" />
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {DAYS.map((d) => (
                <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">
                  {d}
                </div>
              ))}

              {isLoading
                ? Array.from({ length: 35 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-lg bg-muted animate-pulse" />
                ))
                : monthError
                  ? <div className="col-span-7 text-center py-8 text-muted-foreground text-sm">Error al cargar el mes. Intentá de nuevo.</div>
                  : monthGrid.grid.map((day, i) => (
                    <button
                      key={i}
                      onClick={() => day && handleDayClick(day.date)}
                      className={`aspect-square rounded-lg text-xs p-1 flex flex-col items-center justify-start gap-0.5 border transition-colors
                        ${!day ? 'invisible' : ''}
                        ${day && isToday(day.date) ? 'border-accent bg-accent/10' : 'border-transparent hover:border-border'}
                        ${day && selectedDateObj && day.date.toDateString() === selectedDateObj.toDateString() ? 'ring-2 ring-accent' : ''}
                      `}
                      disabled={!day}
                    >
                      <span className={`font-medium mt-1 ${day && isToday(day.date) ? 'text-accent' : 'text-foreground'}`}>
                        {day ? day.date.getDate() : ''}
                      </span>
                      {day && day.schedules.length > 0 && (
                        <div className="flex gap-0.5 flex-wrap justify-center">
                          {day.schedules.slice(0, 3).map((s) => (
                            <div
                              key={s.id}
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: courseColorMap.get(s.courseName) ?? '#888' }}
                            />
                          ))}
                          {day.schedules.length > 3 && (
                            <span className="text-[9px] text-muted-foreground">+{day.schedules.length - 3}</span>
                          )}
                        </div>
                      )}
                    </button>
                  ))}
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">
                {selectedDate ? formatDate(selectedDate + 'T00:00:00') : 'Selecciona un día'}
              </h3>
              {selectedDate && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 px-3 text-xs"
                  onClick={() => openCreateModalWithDate(selectedDate)}
                >
                  <i className="ti ti-plus text-[12px] mr-1" />
                  Agregar
                </Button>
              )}
            </div>

            {dayLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
                ))}
              </div>
            ) : dayError ? (
              <p className="text-destructive text-sm">Error al cargar horarios del día.</p>
            ) : !selectedDate ? (
              <p className="text-muted-foreground text-sm">Haz clic en un día del calendario para ver los horarios.</p>
            ) : daySchedules && daySchedules.length > 0 ? (
              <div className="space-y-2">
                {daySchedules.map((sched) => (
                  <div key={sched.id} className="rounded-xl border border-border p-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${sched.isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {sched.title}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2"
                        onClick={() => openContentModal(sched.id)}
                      >
                        <i className="ti ti-plus text-[12px]" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatTime(sched.startDateTime)} – {formatTime(sched.endDateTime)}
                    </p>
                    {sched.courseName && (
                      <Badge variant="secondary" className="text-[10px] flex items-center gap-1">
                        <span
                          className="w-1.5 h-1.5 rounded-full inline-block"
                          style={{ backgroundColor: courseColorMap.get(sched.courseName) ?? '#888' }}
                        />
                        {sched.courseName}
                      </Badge>
                    )}
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => toggleComplete.mutate({ id: sched.id, completed: !sched.isCompleted })}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {sched.isCompleted ? '↩ Reabrir' : '✓ Completar'}
                      </button>
                      <button
                        onClick={() => deleteSchedule.mutate(sched.id)}
                        className="text-xs text-destructive hover:text-destructive/80 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center mb-3">
                  <i className="ti ti-calendar-off text-[22px] text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">Sin horarios para este día</p>
              </div>
            )}
          </Card>
        </div>
      </div>

      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Nuevo horario</DialogTitle>
            <DialogDescription>Creá un bloque de estudio en tu cronograma</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="cursoId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Curso (opcional)</FormLabel>
                    <Select
                      onValueChange={(v) => { field.onChange(v); onCourseSelect(v) }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccioná un curso" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courses?.filter((c) => !c.isArchived).map((course) => (
                          <SelectItem key={course.id} value={String(course.id)}>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: course.colorHex }} />
                              {course.name}
                              {course.examDate && (() => { try { return ` (${new Date(course.examDate).toLocaleDateString()})` } catch { return '' } })()}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="titulo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Repaso de química" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fecha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="horaInicio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Inicio *</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="horaFin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fin *</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setShowCreateModal(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1" disabled={createSchedule.isPending}>
                  {createSchedule.isPending ? 'Creando...' : 'Crear horario'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={showContentModal} onOpenChange={setShowContentModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Asignar contenido</DialogTitle>
            <DialogDescription>Agregá flashcards o quizzes a este horario</DialogDescription>
          </DialogHeader>

          <div className="flex gap-2 mb-4">
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
              onClick={handleAutoAssign}
              disabled={autoAssign.isPending}
            >
              <i className="ti ti-sparkles text-[14px] mr-1" />
              Auto-asignar
            </Button>
          </div>

          <Form {...contentForm}>
            <form onSubmit={contentForm.handleSubmit(onContentSubmit)} className="space-y-4">
              <FormField
                control={contentForm.control}
                name="contentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de contenido</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccioná un tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="flashcard">Flashcard</SelectItem>
                        <SelectItem value="quiz">Quiz</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={contentForm.control}
                name="contentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contenido</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccioná un contenido" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {contentForm.watch('contentType') === 'flashcard'
                          ? availableFlashcards.map((f) => (
                            <SelectItem key={f.id} value={String(f.id)}>
                              {f.name}
                            </SelectItem>
                          ))
                          : availableQuizzes.map((q) => (
                            <SelectItem key={q.id} value={String(q.id)}>
                              {q.titulo}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={contentForm.control}
                name="estimatedMinutes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minutos estimados</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="15" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setShowContentModal(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1" disabled={createContent.isPending}>
                  {createContent.isPending ? 'Asignando...' : 'Asignar'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}