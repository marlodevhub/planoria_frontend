import { cn } from '@/lib/utils'

interface BadgeProps {
    value: number
    className?: string
}

export function Badge({ value, className }: BadgeProps) {
    const color =
        value >= 80 ? 'text-emerald-400 bg-emerald-400/10' :
            value >= 60 ? 'text-yellow-400 bg-yellow-400/10' :
                'text-red-400 bg-red-400/10'

    return (
        <span className={cn(
            'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono font-medium',
            color,
            className
        )}>
            {value}%
        </span>
    )
}