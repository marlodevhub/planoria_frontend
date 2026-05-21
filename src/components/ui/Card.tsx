import { cn } from '@/lib/utils'

interface CardProps {
    children: React.ReactNode
    className?: string
}

export function Card({ children, className }: CardProps) {
    return (
        <div className={cn(
            'bg-surface border border-border rounded-2xl p-5',
            'transition-colors duration-200',
            className
        )}>
            {children}
        </div>
    )
}