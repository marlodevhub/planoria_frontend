import { useState } from "react";
import type { CourseDetail, CourseExam } from "../types/course.types";
import {
  useDeleteCourse,
  useCourseExams,
  useCreateExam,
  useUpdateExam,
  useDeleteExam,
  useCourseMembers,
  useAddMember,
  useRemoveMember,
  useUpdateMemberRole,
  useCourseExamProgress,
  useCourseReadiness,
  useCourseWeaknesses,
  useCourseStats,
} from "../hooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CourseDetailModalProps {
  course: CourseDetail | null;
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
}

function StatBox({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-muted/50 rounded-xl p-3 flex flex-col gap-1">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <i className={`${icon} text-[13px]`} />
        <span className="text-xs">{label}</span>
      </div>
      <p className="text-foreground text-sm font-semibold">{value}</p>
    </div>
  );
}

function ExamForm({
  initial,
  onSave,
  onCancel,
  isPending,
}: {
  initial?: CourseExam;
  onSave: (data: { title: string; description: string; date: string; time: string; duration: number; location?: string }) => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [date, setDate] = useState(initial?.date?.split("T")[0] ?? "");
  const [time, setTime] = useState(initial?.time ?? "");
  const [duration, setDuration] = useState(initial?.duration?.toString() ?? "60");
  const [location, setLocation] = useState(initial?.location ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, description, date, time, duration: parseInt(duration) || 60, location: location || undefined });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input placeholder="Título del examen" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <Textarea placeholder="Descripción (opcional)" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="resize-none" />
      <div className="grid grid-cols-2 gap-2">
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Input type="number" placeholder="Duración (min)" value={duration} onChange={(e) => setDuration(e.target.value)} min={1} />
        <Input placeholder="Ubicación (opcional)" value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>
      <div className="flex gap-2">
        <Button type="button" variant="outline" size="sm" className="flex-1" onClick={onCancel} disabled={isPending}>Cancelar</Button>
        <Button type="submit" size="sm" className="flex-1" disabled={isPending}>{isPending ? "Guardando..." : initial ? "Actualizar" : "Crear"}</Button>
      </div>
    </form>
  );
}

export function CourseDetailModal({
  course,
  open,
  onClose,
  onEdit,
}: CourseDetailModalProps) {
  const { mutate: deleteCourse, isPending: isDeletingCourse } = useDeleteCourse();
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [tab, setTab] = useState("overview");

  const courseId = course?.id;
  const { data: exams, isLoading: examsLoading } = useCourseExams(courseId ?? 0);
  const { mutate: createExam, isPending: isCreatingExam } = useCreateExam(courseId ?? 0);
  const { mutate: updateExam, isPending: isUpdatingExam } = useUpdateExam(courseId ?? 0);
  const { mutate: deleteExam, isPending: isDeletingExam } = useDeleteExam(courseId ?? 0);
  const { data: members, isLoading: membersLoading } = useCourseMembers(courseId ?? 0);
  const { mutate: addMember, isPending: isAddingMember } = useAddMember(courseId ?? 0);
  const { mutate: removeMember, isPending: isRemovingMember } = useRemoveMember(courseId ?? 0);
  const { mutate: updateMemberRole, isPending: isUpdatingRole } = useUpdateMemberRole(courseId ?? 0);
  const { data: examProgress, isLoading: progressLoading } = useCourseExamProgress(courseId ?? 0);
  const { data: readiness, isLoading: readinessLoading } = useCourseReadiness(courseId ?? 0);
  const { data: weaknesses, isLoading: weaknessesLoading } = useCourseWeaknesses(courseId ?? 0);
  const { data: stats } = useCourseStats(courseId ?? 0);

  const [editingExam, setEditingExam] = useState<CourseExam | null>(null);
  const [showExamForm, setShowExamForm] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState<"editor" | "viewer">("viewer");

  const handleDelete = () => {
    if (!course) return;
    deleteCourse(course.id, { onSuccess: onClose });
  };

  const handleCreateExam = (data: any) => {
    createExam(data, {
      onSuccess: () => { setShowExamForm(false); },
    });
  };

  const handleUpdateExam = (data: any) => {
    if (!editingExam) return;
    updateExam({ ...data, examId: editingExam.id } as any, {
      onSuccess: () => { setEditingExam(null); },
    });
  };

  const handleDeleteExam = (examId: number) => {
    if (confirm(`¿Eliminar el examen "${exams?.find(e => e.id === examId)?.title}"?`)) {
      deleteExam(examId);
    }
  };

  const handleAddMember = () => {
    if (!newMemberEmail.trim()) return;
    addMember(
      { email: newMemberEmail.trim(), role: newMemberRole },
      { onSuccess: () => { setNewMemberEmail(""); } },
    );
  };

  const safeDate = (val: string | null | undefined) => {
    if (!val) return null;
    const d = new Date(val);
    return isNaN(d.getTime()) ? null : d;
  };

  const examDateStr = safeDate(course?.examDate);
  const examDate = examDateStr
    ? examDateStr.toLocaleDateString("es-PE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  const daysUntil = examDateStr
    ? Math.ceil(
        (examDateStr.getTime() - new Date().setHours(0, 0, 0, 0)) /
          (1000 * 60 * 60 * 24),
      )
    : null;

  if (!course) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden gap-0 max-h-[90vh] flex flex-col">
        <div
          className="h-1.5 w-full flex-shrink-0"
          style={{ backgroundColor: course.colorHex }}
        />

        <div className="px-6 pt-5 pb-2 flex-shrink-0">
          <DialogHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className="h-3 w-3 rounded-full flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: course.colorHex }}
                />
                <DialogTitle className="text-base leading-tight">
                  {course.name}
                </DialogTitle>
              </div>
              {course.isArchived && (
                <Badge variant="secondary" className="flex-shrink-0 text-xs">
                  Archivado
                </Badge>
              )}
            </div>
          </DialogHeader>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="flex-1 flex flex-col min-h-0">
          <div className="px-6 flex-shrink-0">
            <TabsList className="h-8 mb-2">
              <TabsTrigger value="overview" className="text-xs px-3 h-6">General</TabsTrigger>
              <TabsTrigger value="exams" className="text-xs px-3 h-6">Exámenes</TabsTrigger>
              <TabsTrigger value="members" className="text-xs px-3 h-6">Miembros</TabsTrigger>
              <TabsTrigger value="progress" className="text-xs px-3 h-6">Progreso</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-6">
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4 mt-0">
              {course.description && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {course.description}
                </p>
              )}

              <div className="grid grid-cols-2 gap-2">
                {examDate && (
                  <StatBox icon="ti ti-calendar" label="Fecha examen" value={examDate} />
                )}
                {course.examTime && (
                  <StatBox icon="ti ti-clock" label="Hora" value={course.examTime} />
                )}
                <StatBox icon="ti ti-cards" label="Flashcards" value={course.totalFlashcards} />
                <StatBox icon="ti ti-clipboard-check" label="Quizzes" value={course.totalQuizzes} />
              </div>

              {stats && (
                <div className="grid grid-cols-3 gap-2">
                  <StatBox icon="ti ti-users" label="Miembros" value={stats.totalMembers} />
                  <StatBox icon="ti ti-flame" label="Racha" value={`${stats.streakDays}d`} />
                  <StatBox icon="ti ti-clock-hour-5" label="Estudio/sem" value={`${stats.studyTimeThisWeek}h`} />
                </div>
              )}

              {daysUntil !== null && daysUntil >= 0 && (
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono"
                  style={{
                    backgroundColor: `${course.colorHex}15`,
                    borderLeft: `3px solid ${course.colorHex}`,
                  }}
                >
                  <i className="ti ti-hourglass text-[13px]" style={{ color: course.colorHex }} />
                  <span className="text-muted-foreground">
                    {daysUntil === 0
                      ? "¡El examen es hoy!"
                      : `${daysUntil} día${daysUntil !== 1 ? "s" : ""} para el examen`}
                  </span>
                </div>
              )}

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progreso general</span>
                  <span className="font-mono">{course.progressPercentage}%</span>
                </div>
                <Progress value={course.progressPercentage} className="h-1.5" />
              </div>

              <Separator />

              {confirmingDelete ? (
                <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 space-y-3">
                  <p className="text-sm text-foreground">
                    ¿Seguro que querés borrar <span className="font-medium">"{course.name}"</span>? Esta acción no se puede deshacer.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" size="sm" onClick={() => setConfirmingDelete(false)}>
                      Cancelar
                    </Button>
                    <Button variant="destructive" className="flex-1" size="sm" onClick={handleDelete} disabled={isDeletingCourse}>
                      {isDeletingCourse ? "Borrando..." : "Borrar"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => setConfirmingDelete(true)} className="text-muted-foreground hover:border-destructive/50 hover:text-destructive flex-shrink-0" aria-label="Borrar curso">
                    <i className="ti ti-trash text-[15px]" />
                  </Button>
                  <Button variant="outline" className="flex-1" size="sm" onClick={onEdit}>
                    <i className="ti ti-pencil text-[14px]" />
                    Editar
                  </Button>
                  <Button className="flex-1" size="sm" onClick={onEdit}>
                    <i className="ti ti-arrow-right text-[14px]" />
                    Abrir
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Exams Tab */}
            <TabsContent value="exams" className="space-y-3 mt-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">Exámenes del curso</p>
                {!showExamForm && !editingExam && (
                  <Button size="sm" variant="outline" onClick={() => setShowExamForm(true)}>
                    <i className="ti ti-plus text-[13px]" />
                    Nuevo
                  </Button>
                )}
              </div>

              {showExamForm && (
                <div className="rounded-xl border p-3 bg-muted/30">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Nuevo examen</p>
                  <ExamForm onSave={handleCreateExam} onCancel={() => setShowExamForm(false)} isPending={isCreatingExam} />
                </div>
              )}

              {editingExam && (
                <div className="rounded-xl border p-3 bg-muted/30">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Editar examen</p>
                  <ExamForm initial={editingExam} onSave={handleUpdateExam} onCancel={() => setEditingExam(null)} isPending={isUpdatingExam} />
                </div>
              )}

              {examsLoading && (
                <div className="space-y-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
                  ))}
                </div>
              )}

              {!examsLoading && exams?.length === 0 && (
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="h-10 w-10 rounded-2xl bg-muted flex items-center justify-center mb-3">
                    <i className="ti ti-calendar-off text-[18px] text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">Sin exámenes</p>
                  <p className="text-xs text-muted-foreground">Agregá exámenes para este curso</p>
                </div>
              )}

              {!examsLoading && exams && exams.length > 0 && (
                <div className="space-y-2">
                  {exams.map((exam) => (
                    <div key={exam.id} className="flex items-center justify-between rounded-xl border p-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate">{exam.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {safeDate(exam.date)?.toLocaleDateString("es-PE") ?? exam.date} {exam.time && `- ${exam.time}`}
                          {exam.duration && ` · ${exam.duration}min`}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                        <button
                          onClick={() => setEditingExam(exam)}
                          className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Editar examen"
                        >
                          <i className="ti ti-pencil text-[13px]" />
                        </button>
                        <button
                          onClick={() => handleDeleteExam(exam.id)}
                          className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Eliminar examen"
                        >
                          <i className="ti ti-trash text-[13px]" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Members Tab */}
            <TabsContent value="members" className="space-y-3 mt-0">
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Agregar miembro</p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Email del usuario"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={newMemberRole} onValueChange={(v: "editor" | "viewer") => setNewMemberRole(v)}>
                    <SelectTrigger className="w-[110px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Visor</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" onClick={handleAddMember} disabled={isAddingMember || !newMemberEmail.trim()}>
                    <i className="ti ti-plus text-[13px]" />
                  </Button>
                </div>
              </div>

              <Separator />

              {membersLoading && (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-12 rounded-xl bg-muted animate-pulse" />
                  ))}
                </div>
              )}

              {!membersLoading && members?.length === 0 && (
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="h-10 w-10 rounded-2xl bg-muted flex items-center justify-center mb-3">
                    <i className="ti ti-users text-[18px] text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">Sin miembros</p>
                  <p className="text-xs text-muted-foreground">Invita a otros usuarios al curso</p>
                </div>
              )}

              {!membersLoading && members && members.length > 0 && (
                <div className="space-y-2">
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between rounded-xl border p-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate">{member.fullName}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        <Select
                          value={member.role}
                          onValueChange={(role: "owner" | "editor" | "viewer") => {
                            if (role !== member.role) {
                              updateMemberRole({ userId: member.userId, role });
                            }
                          }}
                        >
                          <SelectTrigger className="w-[100px] h-7 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="owner">Dueño</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                            <SelectItem value="viewer">Visor</SelectItem>
                          </SelectContent>
                        </Select>
                        {member.role !== "owner" && (
                          <button
                            onClick={() => removeMember(member.userId)}
                            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-destructive transition-colors"
                            aria-label="Eliminar miembro"
                          >
                            <i className="ti ti-user-x text-[13px]" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Progress Tab */}
            <TabsContent value="progress" className="space-y-4 mt-0">
              {/* Exam Progress */}
              {progressLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 rounded-xl bg-muted animate-pulse" />
                  ))}
                </div>
              ) : examProgress ? (
                <>
                  <p className="text-sm font-medium text-foreground">Avance de examen</p>
                  <div className="grid grid-cols-2 gap-2">
                    <StatBox icon="ti ti-target" label="Preparación" value={`${examProgress.readinessScore}%`} />
                    <StatBox icon="ti ti-cards" label="Flashcards" value={`${examProgress.reviewedFlashcards}/${examProgress.totalFlashcards}`} />
                    <StatBox icon="ti ti-clipboard-check" label="Quizzes hechos" value={examProgress.quizzesCompleted} />
                    <StatBox icon="ti ti-score" label="Promedio quiz" value={`${examProgress.averageQuizScore}%`} />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <StatBox icon="ti ti-clock-hour-5" label="Estudio" value={`${examProgress.studyHoursCompleted}h / ${examProgress.studyHoursTarget}h`} />
                    <StatBox icon="ti ti-flag" label="Meta semanal" value={`${examProgress.weeklyGoalProgress}%`} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Masterización</span>
                      <span className="font-mono">{examProgress.masteryPercentage}%</span>
                    </div>
                    <Progress value={examProgress.masteryPercentage} className="h-1.5" />
                  </div>
                  <Separator />
                </>
              ) : (
                <div className="flex flex-col items-center py-6 text-center">
                  <i className="ti ti-chart-bar text-[22px] text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">No hay datos de progreso disponibles</p>
                </div>
              )}

              {/* Readiness */}
              {readinessLoading ? (
                <div className="h-16 rounded-xl bg-muted animate-pulse" />
              ) : readiness ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Nivel de preparación</p>
                  <div className="grid grid-cols-2 gap-2">
                    <StatBox icon="ti ti-gauge" label="General" value={`${readiness.overall}%`} />
                    <StatBox icon="ti ti-chart-dots" label="Puntaje predicho" value={`${readiness.predictedScore}%`} />
                  </div>
                  {readiness.confidenceInterval && (
                    <StatBox
                      icon="ti ti-confidence"
                      label="Intervalo de confianza"
                      value={`${readiness.confidenceInterval.low}% - ${readiness.confidenceInterval.high}%`}
                    />
                  )}
                  {readiness.byTopic && Object.keys(readiness.byTopic).length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-xs font-medium text-muted-foreground">Por tema</p>
                      {Object.entries(readiness.byTopic).map(([topic, score]) => (
                        <div key={topic} className="flex items-center gap-2">
                          <span className="text-xs text-foreground w-24 truncate flex-shrink-0">{topic}</span>
                          <Progress value={score} className="h-1.5 flex-1" />
                          <span className="text-xs text-muted-foreground font-mono w-8 text-right">{score}%</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <Separator />
                </div>
              ) : null}

              {/* Weaknesses */}
              {weaknessesLoading ? (
                <div className="h-16 rounded-xl bg-muted animate-pulse" />
              ) : weaknesses ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Debilidades</p>
                  {weaknesses.topics?.length > 0 ? (
                    <>
                      <div className="space-y-1.5">
                        {weaknesses.topics.map((topic) => (
                          <div key={topic.topic} className="rounded-xl border p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-foreground">{topic.topic}</span>
                              <Badge
                                variant="secondary"
                                className="text-[10px]"
                                style={{
                                  backgroundColor: topic.strength < 40 ? "#ef444415" : topic.strength < 70 ? "#f59e0b15" : "#22c55e15",
                                  color: topic.strength < 40 ? "#ef4444" : topic.strength < 70 ? "#f59e0b" : "#22c55e",
                                }}
                              >
                                {topic.strength}%
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {topic.cardCount} tarjetas · Última revisión: {safeDate(topic.lastReviewed)?.toLocaleDateString("es-PE") ?? "nunca"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">No hay debilidades detectadas</p>
                  )}
                  {weaknesses.recommendations?.length > 0 && (
                    <div className="rounded-xl bg-primary/5 border border-primary/10 p-3 space-y-1">
                      <p className="text-xs font-medium text-foreground">Recomendaciones</p>
                      {weaknesses.recommendations.map((rec, i) => (
                        <p key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                          <i className="ti ti-bulb text-[12px] text-primary mt-0.5 flex-shrink-0" />
                          {rec}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
