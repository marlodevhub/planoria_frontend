import { useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMonthView } from '../hooks/useMonthView'
import { useDayView } from '../hooks/useDayView'
import { useCreateSchedule } from '../hooks/useCreateSchedule'
import { useToggleComplete } from '../hooks/useToggleComplete'
import { useDeleteSchedule } from '../hooks/useDeleteSchedule'
import { useCourses } from '@/features/courses/hooks'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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

type ScheduleFormFields = z.infer<typeof scheduleSchema>

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

  const { data: monthDays, isLoading } = useMonthView(viewingYear, viewingMonth + 1)
  const { data: daySchedules, isLoading: dayLoading } = useDayView(selectedDate ?? '')
  const { data: courses } = useCourses()

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

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Cronograma</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gestiona tus horarios de estudio
          </p>
        </div>
        <Button onClick={() => openCreateModalWithDate(selectedDate ?? undefined)}>
          <i className="ti ti-plus text-[16px] mr-1" />
          Nuevo horario
        </Button>
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
            <h3 className="text-sm font-semibold text-foreground mb-4">
              {selectedDate ? formatDate(selectedDate + 'T00:00:00') : 'Selecciona un día'}
            </h3>

            {dayLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
                ))}
              </div>
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
              <p className="text-muted-foreground text-sm">Sin horarios para este día.</p>
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
                              {course.examDate && ` (${new Date(course.examDate).toLocaleDateString()})`}
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
    </div>
  )
}
