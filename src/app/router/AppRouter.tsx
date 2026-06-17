import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./routes";
import { ProtectedRoute } from "@/features/auth/guards/ProtectedRoute";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";
import { LandingPage } from "@/features/landing/pages/LandingPage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { FlashcardsPage } from "@/features/flashcards/pages/FlashcardsPage";
import { DeckPage } from "@/features/flashcards/pages/DeckPage";
import { StudyPage } from "@/features/flashcards/pages/StudyPage";
import { QuizzesPage } from "@/features/quizzes/pages/QuizzesPage";
import { CronogramaPage } from "@/features/cronograma/pages/CronogramaPage";
import { ProgresosPage } from "@/features/progresos/pages/ProgresosPage";
import { CoursesPage } from "@/features/courses/pages/CoursesPage";

// Definición de rutas
export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.LANDING} element={<LandingPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        </Route>

        {/* Workspace — rutas anidadas */}
        <Route element={<ProtectedRoute />}>
          <Route element={<WorkspaceLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
            <Route path={ROUTES.DECK} element={<DeckPage />} />
            <Route path={ROUTES.FLASHCARDS_STUDY} element={<StudyPage />} />
            <Route path={ROUTES.FLASHCARDS} element={<FlashcardsPage />} />
            <Route path={ROUTES.QUIZZES} element={<QuizzesPage />} />
            <Route path={ROUTES.CRONOGRAMA} element={<CronogramaPage />} />
            <Route path={ROUTES.PROGRESO} element={<ProgresosPage />} />
            <Route path={ROUTES.CURSOS} element={<CoursesPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.LANDING} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
