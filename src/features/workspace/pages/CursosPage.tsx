import { Card } from '@/components/ui/Card'

const courses = [
    { title: 'Álgebra Lineal', progress: 75, lessons: 24, color: 'bg-accent' },
    { title: 'Historia Mundial', progress: 40, lessons: 18, color: 'bg-emerald-500' },
    { title: 'Inglés Avanzado', progress: 90, lessons: 32, color: 'bg-yellow-500' },
    { title: 'Física Cuántica', progress: 15, lessons: 40, color: 'bg-violet-500' },
]

export function CursosPage() {
    return (
        <div className="space-y-6 animate-fade-up">
            <div>
                <h1 className="text-2xl font-bold text-text">Cursos</h1>
                <p className="text-muted text-sm mt-1">Continúa donde lo dejaste</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {courses.map((course) => (
                    <Card key={course.title} className="hover:border-accent/50 cursor-pointer">
                        <div className="flex items-center justify-between mb-3">
                            <p className="font-semibold text-text">{course.title}</p>
                            <span className="text-muted text-xs font-mono">{course.lessons} lecciones</span>
                        </div>
                        <div className="h-1.5 bg-border rounded-full overflow-hidden mb-2">
                            <div
                                className={`h-full rounded-full ${course.color} transition-all duration-700`}
                                style={{ width: `${course.progress}%` }}
                            />
                        </div>
                        <p className="text-muted text-xs font-mono">{course.progress}% completado</p>
                    </Card>
                ))}
            </div>
        </div>
    )
}