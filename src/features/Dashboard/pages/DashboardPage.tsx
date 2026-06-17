// features/dashboard/pages/DashboardPage.tsx

import { useAuthStore } from "@/features/auth/store/authStore";
import { StatsCards } from "../components/StatsCards";
import { TodayRecommendation } from "../components/TodayRecommendation";
import { UpcomingExam } from "../components/UpcomingExam";
import { RetentionByTopic } from "../components/RetentionByTopic";
import { RecentActivity } from "../components/RecentActivity";

export function DashboardPage() {
  const user = useAuthStore((s) => s.user);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Buenos días" : hour < 18 ? "Buenas tardes" : "Buenas noches";

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{greeting} 👋</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {user?.name
              ? `Bienvenido de vuelta, ${user.name}`
              : "Aquí está tu panorama de estudio."}
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/80 transition-all duration-300 shadow-sm shadow-accent/20">
          <span>✦</span>
          Nueva sesión
        </button>
      </div>

      {/* Stats Row */}
      <StatsCards />

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <TodayRecommendation />
        </div>
        <div>
          <UpcomingExam />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RetentionByTopic />
        <RecentActivity />
      </div>
    </div>
  );
}
