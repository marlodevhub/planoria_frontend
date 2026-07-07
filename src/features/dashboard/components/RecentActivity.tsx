import { useRecentActivity } from '../hooks'

const TYPE_ICON: Record<string, string> = {
  quiz: '\uD83D\uDCDD',
  flashcards: '\uD83C\uDCCF',
  study: '\uD83D\uDCD6',
  schedule: '\uD83D\uDCC5',
  course: '\uD83D\uDCDA',
  exam: '\uD83C\uDFAF',
  achievement: '\uD83C\uDFC6',
}

const ACTION_LABELS: Record<string, string> = {
  'course.created': 'Creaste el curso',
  'course.updated': 'Actualizaste el curso',
  'course.deleted': 'Eliminaste el curso',
  'course.archived': 'Archivaste el curso',
  'course.restored': 'Restauraste el curso',
  'course.exam_date_set': 'Estableciste fecha de examen',
  'course.exam_date_removed': 'Eliminaste fecha de examen',
  'course.member_added': 'Agregaste un miembro',
  'course.member_removed': 'Eliminaste un miembro',
  'course.member_role_changed': 'Cambiaste rol de miembro',
  'flashcard.created': 'Creaste tarjetas en',
  'flashcard.updated': 'Actualizaste tarjetas en',
  'flashcard.deleted': 'Eliminaste tarjetas de',
  'flashcard.reviewed': 'Repasaste tarjetas de',
  'deck.created': 'Creaste el mazo',
  'deck.updated': 'Actualizaste el mazo',
  'deck.deleted': 'Eliminaste el mazo',
  'quiz.created': 'Creaste el quiz',
  'quiz.updated': 'Actualizaste el quiz',
  'quiz.deleted': 'Eliminaste el quiz',
  'quiz.completed': 'Completaste el quiz',
  'quiz.started': 'Iniciaste el quiz',
  'study.session_started': 'Iniciaste sesión de estudio en',
  'study.session_completed': 'Completaste sesión de estudio en',
  'schedule.created': 'Agregaste un horario',
  'schedule.updated': 'Actualizaste un horario',
  'schedule.deleted': 'Eliminaste un horario',
  'schedule.completed': 'Completaste un horario',
  'exam.created': 'Registraste examen de',
  'exam.updated': 'Actualizaste examen de',
  'exam.deleted': 'Eliminaste examen de',
  'file.uploaded': 'Subiste un archivo a',
  'file.processed': 'Procesaste un archivo de',
  'ai.generated': 'Generaste contenido con IA para',
  'user.registered': 'Te registraste en Planoria',
  'user.login': 'Iniciaste sesión',
  'user.logout': 'Cerraste sesión',
  'achievement.unlocked': 'Desbloqueaste el logro',
  'goal.created': 'Estableciste una meta',
  'goal.updated': 'Actualizaste una meta',
  'goal.completed': 'Completaste una meta',
}

const CAMEL_CASE_LABELS: Record<string, string> = {
  'Register': 'Te registraste en Planoria',
  'Login': 'Iniciaste sesión',
  'Logout': 'Cerraste sesión',
  'ChangePassword': 'Cambiaste tu contraseña',
  'CreateSchedule': 'Creaste un horario de estudio',
  'AutoAssignContent': 'Contenidos auto-asignados',
  'StartQuizAttempt': 'Iniciaste un intento de quiz',
  'SubmitQuizAttempt': 'Completaste un intento de quiz',
  'CreateDeck': 'Se creó el mazo',
  'CreateQuiz': 'Se creó el quiz',
  'StartStudySession': 'Iniciaste sesión de estudio',
  'EndStudySession': 'Finalizaste sesión de estudio',
  'ScheduleReview': 'Programaste revisión',
  'UpdateProfile': 'Actualizaste tu perfil',
  'UploadAvatar': 'Cambiaste tu foto de perfil',
  'DeleteAvatar': 'Eliminaste tu avatar',
  'DeleteAccount': 'Eliminaste tu cuenta',
  'ExportData': 'Exportaste tus datos',
  'Deactivate': 'Desactivaste tu cuenta',
  'TestNotification': 'Recibiste una notificación de prueba',
  'ResetDefaults': 'Restableciste preferencias',
  'UpdatePreferences': 'Actualizaste preferencias',
  'UpdateNotificationSettings': 'Actualizaste notificaciones',
  'GenerateFlashcards': 'Generaste flashcards con IA',
  'GenerateQuiz': 'Generaste un quiz con IA',
  'GenerateFlashcards_Completed': 'Flashcards generadas con IA',
  'GenerateQuiz_Completed': 'Quiz generado con IA',
  'RegenerateContent': 'Contenido regenerado con IA',
  'TestAiConnection': 'Probaste conexión con IA',
  'ExtractTextError': 'Error al extraer texto',
  'ReorderContent': 'Reordenaste contenido',
  'ReorderIntervals': 'Reordenaste intervalos',
  'RegisterPushDevice': 'Registraste un dispositivo',
  'UnregisterPushDevice': 'Desregistraste un dispositivo',
  'SendPush': 'Notificación push enviada',
  'CreateCustomReport': 'Creaste un reporte personalizado',
  'UpdateConfig': 'Actualizaste la configuración',
  'SetGoal': 'Estableciste una meta',
  'UpdateGoalProgress': 'Actualizaste progreso de meta',
}

function translateAction(action: string, title: string): string {
  const label = CAMEL_CASE_LABELS[action] ?? ACTION_LABELS[action]
  if (label) {
    if (!title || title === action) return label
    return `${label} ${title}`
  }
  if (title) return title
  return action?.replace(/\./g, ' ') ?? ''
}

export function RecentActivity() {
  const { data: activities, isLoading } = useRecentActivity(10)

  if (isLoading) {
    return <div className="h-48 rounded-2xl bg-muted animate-pulse" />
  }

  const items = activities ?? []

  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 className="text-foreground font-semibold text-base">
        Actividad reciente
      </h2>

      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          Aún no hay actividad. Empieza a estudiar para ver tu progreso.
        </p>
      ) : (
        <div className="space-y-1">
          {items.map((item, i) => (
            <div
              key={`${item.timestamp}-${i}`}
              className="flex items-start justify-between gap-3 py-2.5 border-b border-border last:border-0"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <span className="text-sm mt-0.5 shrink-0">
                  {TYPE_ICON[item.type] ?? '\uD83D\uDCCC'}
                </span>
                <div className="min-w-0">
                  <p className="text-foreground text-sm">
                    {translateAction(item.action, item.title)}
                  </p>
                  {item.courseName && (
                    <p className="text-muted-foreground text-xs mt-0.5">
                      {item.courseName}
                    </p>
                  )}
                </div>
              </div>
              <span className="text-muted-foreground text-xs shrink-0 whitespace-nowrap">
                {formatRelativeTime(item.timestamp)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function formatRelativeTime(timestamp: string): string {
  const now = Date.now()
  const date = new Date(timestamp).getTime()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'ahora'
  if (diffMins < 60) return `hace ${diffMins}m`
  if (diffHours < 24) return `hace ${diffHours}h`
  if (diffDays < 7) return `hace ${diffDays}d`
  return new Date(timestamp).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'short',
  })
}
