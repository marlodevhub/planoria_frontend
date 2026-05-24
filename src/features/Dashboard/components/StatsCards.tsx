// features/dashboard/components/StatsCards.tsx

interface StatCardProps {
    label: string
    value: string
    subtitle: string
    icon: string
}

function StatCard({ label, value, subtitle, icon }: StatCardProps) {
    return (
        <div className="bg-surface border border-border rounded-2xl p-5 flex items-start justify-between">
            <div>
                <p className="text-muted text-xs font-medium uppercase tracking-wide">
                    {label}
                </p>
                <p className="text-text text-3xl font-bold mt-1">{value}</p>
                <p className="text-muted text-sm mt-0.5">{subtitle}</p>
            </div>
            <div className="bg-bg border border-border rounded-xl p-2.5 text-xl">
                {icon}
            </div>
        </div>
    )
}

export function StatsCards() {
    const stats: StatCardProps[] = [
        {
            label: 'Tarjetas hoy',
            value: '0',
            subtitle: 'estudiadas',
            icon: '',
        },
        {
            label: 'Retención global',
            value: '0%',
            subtitle: 'acumulada',
            icon: '',
        },
        {
            label: 'Racha',
            value: '5 días',
            subtitle: 'consecutivos',
            icon: '',
        },
        {
            label: 'Plan semanal',
            value: '0%',
            subtitle: '0/10 bloques',
            icon: '',
        },
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
            ))}
        </div>
    )
}