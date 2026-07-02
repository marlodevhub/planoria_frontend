import { useAuthStore } from '@/features/auth/store/authStore'
import { useCourses } from '@/features/courses/hooks'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/app/router/routes'

export function TodayRecommendation() {
  const user = useAuthStore((s) => s.user)
  const { data: courses } = useCourses()
  const navigate = useNavigate()

  const activeCourses = courses?.filter(c => !c.isArchived) ?? []
  const upcomingExams = activeCourses.filter(c => c.examDate)

  let recommendation = 'Empieza creando un curso y generando tu primer set de flashcards con IA.'

  if (activeCourses.length > 0 && upcomingExams.length > 0) {
    const nearestExam = upcomingExams.sort(
      (a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime()
    )[0]
    recommendation = `Tienes un examen de "${nearestExam.name}" próximo. Dedica tiempo a repasar con flashcards y quizzes.`
  } else if (activeCourses.length > 0) {
    recommendation = 'Sigue estudiando tus cursos activos. Revisa las tarjetas pendientes y practica con quizzes.'
  }
  return (
    <div className="bg-card border border-border rounded-2xl p-6 h-full flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <div className="bg-accent rounded-xl p-2.5 text-white text-xl shrink-0">
          ✦
        </div>
        <div>
          <h2 className="text-foreground font-semibold text-base">
            Recomendación de hoy
          </h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            {user ? `Basada en tu progreso, ${user.nombre}` : 'Generada por la IA según tu progreso y exámenes'}
          </p>
        </div>
      </div>

      <p className="text-foreground text-sm leading-relaxed">
        {recommendation}
      </p>

      <div className="mt-auto">
        <button
          onClick={() => navigate(ROUTES.CRONOGRAMA)}
          className="flex items-center gap-2 text-sm text-foreground border border-border rounded-xl px-4 py-2 hover:bg-muted transition-colors"
        >
          Ver cronograma del día
          <span className="text-base">→</span>
        </button>
      </div>
    </div>
  )
}
