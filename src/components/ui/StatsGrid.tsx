interface Stat {
    label: string
    value: string
    delta: string
}

export function StatsGrid({ stats }: { stats: Stat[] }) {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="bg-surface border border-border rounded-xl p-5 hover:border-accent/50 transition-colors duration-200"
                >
                    <p className="text-muted text-xs font-mono uppercase tracking-widest mb-2">
                        {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-text">{stat.value}</p>
                    <p className="text-accent text-xs font-mono mt-1">{stat.delta} este mes</p>
                </div>
            ))}
        </div>
    )
}