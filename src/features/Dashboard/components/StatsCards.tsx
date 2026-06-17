// features/dashboard/components/StatsCards.tsx

interface StatCardProps {
  label: string;
  value: string;
  subtitle: string;
  icon: string;
  iconColor?: string;
}

function StatCard({
  label,
  value,
  subtitle,
  icon,
  iconColor = "text-accent",
}: StatCardProps) {
  return (
    <div className="bg-white border border-border rounded-2xl p-5 flex items-start justify-between hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5">
      <div>
        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
          {label}
        </p>
        <p className="text-foreground text-3xl font-bold mt-1">{value}</p>
        <p className="text-muted-foreground text-sm mt-0.5">{subtitle}</p>
      </div>
      <div className="bg-bg border border-border rounded-xl p-2.5 text-xl">
        <i className={`ti ${icon} ${iconColor} text-2xl`} aria-hidden="true" />
      </div>
    </div>
  );
}

export function StatsCards() {
  const stats: StatCardProps[] = [
    {
      label: "Tarjetas hoy",
      value: "0",
      subtitle: "estudiadas",
      icon: "ti-cards",
      iconColor: "text-accent",
    },
    {
      label: "Retención global",
      value: "0%",
      subtitle: "acumulada",
      icon: "ti-brain",
      iconColor: "text-primary",
    },
    {
      label: "Racha",
      value: "5 días",
      subtitle: "consecutivos",
      icon: "ti-flame",
      iconColor: "text-destructive",
    },
    {
      label: "Plan semanal",
      value: "0%",
      subtitle: "0/10 bloques",
      icon: "ti-calendar-stats",
      iconColor: "text-secondary",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
