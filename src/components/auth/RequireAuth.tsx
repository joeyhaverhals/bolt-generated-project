import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../lib/auth/AuthProvider'

interface Props {
  children: React.ReactNode
  allowedRoles?: string[]
}

export default function RequireAuth({ children, allowedRoles }: Props) {
  const { user, profile, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  if (allowedRoles && (!profile?.role || !allowedRoles.includes(profile.role))) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
