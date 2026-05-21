// import { Navigate, Outlet } from 'react-router-dom'
// import { useAuthStore } from '@/features/auth/store/authStore'
// import { ROUTES } from './routes'

// export function PrivateRoute() {
//   const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
//   return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />
// }


import { Outlet } from 'react-router-dom'

export function PrivateRoute() {
  return <Outlet />
}