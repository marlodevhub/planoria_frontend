import { Card } from '@/components/ui/Card'

const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

export function CronogramaPage() {
    return (
        <div className="space-y-6 animate-fade-up">
            <div>
                <h1 className="text-2xl font-bold text-text">Cronograma</h1>
                <p className="text-muted text-sm mt-1">Planifica tu semana de estudio</p>
            </div>
            <Card>
                <div className="grid grid-cols-7 gap-2">
                    {days.map((day, i) => (
                        <div key={day} className="text-center">
                            <p className="text-muted text-xs font-mono mb-2">{day}</p>
                            <div className={cn(
                                'h-9 w-9 mx-auto rounded-xl flex items-center justify-center text-sm font-medium',
                                i === 1
                                    ? 'bg-accent text-white'
                                    : 'bg-bg text-text hover:bg-accent/10 cursor-pointer transition-colors'
                            )}>
                                {18 + i}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 space-y-2">
                    {['09:00 — Matemáticas', '11:00 — Historia', '15:00 — Inglés'].map((item) => (
                        <div key={item} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-bg border border-border">
                            <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                            <span className="text-text text-sm font-mono">{item}</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}

import { cn } from '@/lib/utils'