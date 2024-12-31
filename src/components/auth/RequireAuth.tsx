import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../lib/auth/AuthProvider'

interface Props {
  children: React.ReactNode
  requireAdmin?: boolean
}

export default function RequireAuth({ children, requireAdmin = false }: Props) {
  const { user, profile, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  if (requireAdmin && profile?.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
