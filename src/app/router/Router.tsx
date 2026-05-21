import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from './routes'
import { PrivateRoute } from './PrivateRoute'
import { LandingPage } from '@/features/landing/pages/LandingPage'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'
import { AppLayout } from '@/shared/components/layout/AppLayout'

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Públicas */}
                <Route path={ROUTES.LANDING} element={<LandingPage />} />
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />

                {/* Privadas */}
                <Route element={<PrivateRoute />}>
                    <Route element={<AppLayout />}>
                        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
                    </Route>
                </Route>

                <Route path="*" element={<Navigate to={ROUTES.LANDING} replace />} />
            </Routes>
        </BrowserRouter>
    )
}