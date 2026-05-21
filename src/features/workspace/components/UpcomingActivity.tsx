import { Card } from '@/components/ui/Card'

const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
const tasks = [
    { day: 1, label: 'Mabar.co Project', start: 1, span: 2, color: 'bg-accent/80' },
    { day: 2, label: 'Meeting', start: 4, span: 1, color: 'bg-emerald-500/80' },
    { day: 4, label: 'Website Redesign', start: 2, span: 3, color: 'bg-accent/60' },
    { day: 6, label: 'Sport', start: 5, span: 1, color: 'bg-yellow-500/80' },
]

export function UpcomingActivity() {
    return (
        <Card>
            <h3 className="font-semibold text-text mb-4">Actividad próxima</h3>

            {/* Placeholder — aquí irá el gráfico Gantt */}
            <div className="overflow-x-auto">
                <div className="min-w-[400px]">
                    {/* Horas header */}
                    <div className="flex mb-2 pl-10">
                        {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00'].map((h) => (
                            <div key={h} className="flex-1 text-muted text-xs font-mono">{h}</div>
                        ))}
                    </div>

                    {/* Filas por día */}
                    {days.map((day, di) => {
                        const dayTasks = tasks.filter((t) => t.day === di)
                        return (
                            <div key={day} className="flex items-center gap-2 mb-2">
                                <span className="text-muted text-xs font-mono w-8 flex-shrink-0">{day}</span>
                                <div className="flex-1 h-7 bg-bg rounded-lg relative">
                                    {dayTasks.map((task) => (
                                        <div
                                            key={task.label}
                                            className={`absolute top-1 bottom-1 rounded-md ${task.color} flex items-center px-2`}
                                            style={{
                                                left: `${(task.start / 6) * 100}%`,
                                                width: `${(task.span / 6) * 100}%`,
                                            }}
                                        >
                                            <span className="text-white text-xs truncate font-medium">{task.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <p className="text-muted text-xs font-mono mt-3 text-center">
                → Aquí puedes integrar una librería de gráficos Gantt
            </p>
        </Card>
    )
}