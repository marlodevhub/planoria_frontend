import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'

interface ProductivityCardProps {
    day: string
    date: number
    productive: number
    productiveTime: string
    timeAtWork: string
    active?: boolean
}

export function ProductivityCard({
    day, date, productive, productiveTime, timeAtWork, active = false,
}: ProductivityCardProps) {
    return (
        <div className={cn(
            'flex items-center gap-4 rounded-2xl p-4 transition-all duration-200',
            'border',
            active
                ? 'bg-accent/10 border-accent/30'
                : 'bg-surface border-border hover:border-accent/30'
        )}>
            {/* Fecha */}
            <div className={cn(
                'flex flex-col items-center justify-center rounded-xl w-14 h-14 flex-shrink-0',
                active ? 'bg-accent text-white' : 'bg-bg text-text'
            )}>
                <span className="text-xs font-mono opacity-70">{day}</span>
                <span className="text-xl font-bold leading-none">{date}</span>
            </div>

            {/* Productivo */}
            <div className="flex-1 min-w-0">
                <p className="text-muted text-xs font-mono mb-1">Productivo</p>
                <div className="flex items-center gap-2">
                    {/* Mini wave */}
                    <svg width="40" height="16" viewBox="0 0 40 16" className="opacity-50">
                        <path
                            d="M0 8 Q5 2 10 8 Q15 14 20 8 Q25 2 30 8 Q35 14 40 8"
                            fill="none"
                            stroke={active ? '#6366f1' : '#64748b'}
                            strokeWidth="2"
                        />
                    </svg>
                    <Badge value={productive} />
                </div>
            </div>

            {/* Tiempo productivo */}
            <div className="text-center hidden sm:block">
                <p className="text-muted text-xs font-mono mb-1">Tiempo prod.</p>
                <p className="text-text font-bold text-sm">{productiveTime}</p>
            </div>

            {/* Tiempo en trabajo */}
            <div className="text-center hidden md:block">
                <p className="text-muted text-xs font-mono mb-1">En trabajo</p>
                <p className="text-text font-bold text-sm">{timeAtWork}</p>
            </div>
        </div>
    )
}