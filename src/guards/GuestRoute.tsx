import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

type GuestRouteProps = {
  children: React.ReactNode
}

export default function GuestRoute({ children }: GuestRouteProps) {
  const { user, isAuthenticated } = useAuth()

  if (isAuthenticated && user) {
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/scan'} replace />
  }

  return <>{children}</>
}