import { Card } from '@/components/ui/Card'

const tasks = [
    { icon: '💻', title: 'Desk Time Redesign', subtitle: 'Trabajando en', time: '09:30 AM' },
    { icon: '📄', title: 'Nueva Landing Page', subtitle: 'Trabajando en', time: '10:40 AM' },
    { icon: '🎬', title: 'Animación para App', subtitle: 'Trabajando en', time: '11:50 AM' },
]

export function UpcomingSchedule() {
    return (
        <Card>
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-text">Próximo horario</h3>
            </div>

            <div className="space-y-3">
                {tasks.map((task) => (
                    <div key={task.title} className="flex items-center gap-3 group">
                        <div className="h-9 w-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-base flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                            {task.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-text text-sm font-medium truncate">{task.title}</p>
                            <p className="text-muted text-xs font-mono">{task.subtitle}</p>
                        </div>
                        <span className="text-muted text-xs font-mono flex-shrink-0">{task.time}</span>
                    </div>
                ))}
            </div>

            <button className="w-full mt-4 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors">
                Ver toda la actividad
            </button>
        </Card>
    )
}