import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from './routes'
import { ProtectedRoute } from './guards/ProtectedRoute'
import { RoleGuard } from './guards/RoleGuard'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { WorkspaceLayout } from '@/components/layout/WorkspaceLayout'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { LandingPage } from '@/features/landing/pages/LandingPage'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { RegisterPage } from '@/features/auth/pages/RegisterPage'
import { WorkspacePage } from '@/features/workspace/pages/WorkspacePage'
import { FlashcardsPage } from '@/features/workspace/pages/FlashcardsPage'
import { QuizzesPage } from '@/features/workspace/pages/QuizzesPage'
import { CronogramaPage } from '@/features/workspace/pages/CronogramaPage'
import { ProgresosPage } from '@/features/workspace/pages/ProgresosPage'
import { CursosPage } from '@/features/workspace/pages/CursosPage'
import { AdminPage } from '@/features/admin/pages/AdminPage'

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Públicas */}
                <Route element={<PublicLayout />}>
                    <Route path={ROUTES.LANDING} element={<LandingPage />} />
                </Route>

                {/* Auth */}
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

                {/* Workspace — rutas anidadas */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<WorkspaceLayout />}>
                        <Route path={ROUTES.WORKSPACE} element={<WorkspacePage />} />
                        <Route path={ROUTES.FLASHCARDS} element={<FlashcardsPage />} />
                        <Route path={ROUTES.QUIZZES} element={<QuizzesPage />} />
                        <Route path={ROUTES.CRONOGRAMA} element={<CronogramaPage />} />
                        <Route path={ROUTES.PROGRESO} element={<ProgresosPage />} />
                        <Route path={ROUTES.CURSOS} element={<CursosPage />} />
                    </Route>
                </Route>

                {/* Admin */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<RoleGuard allowedRoles={['admin']} />}>
                        <Route element={<AdminLayout />}>
                            <Route path={ROUTES.ADMIN} element={<AdminPage />} />
                        </Route>
                    </Route>
                </Route>

                <Route path="*" element={<Navigate to={ROUTES.LANDING} replace />} />
            </Routes>
        </BrowserRouter>
    )
}