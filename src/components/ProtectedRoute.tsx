import { Navigate, Link } from '@tanstack/react-router'
import { useAuth } from '@/features/auth'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShieldAlert, ArrowLeft, LogIn } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, isAdmin, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <span className="text-xs font-mono text-muted-foreground">
            Verifying security credentials...
          </span>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <Card className="max-w-md w-full p-6 md:p-8 rounded-2xl md:rounded-3xl border-destructive/30 bg-card text-center space-y-4">
          <div className="size-14 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
            <ShieldAlert className="size-7" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-foreground">Access Restricted</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This area is strictly restricted to dealership staff and administrators. Your current account does not have administrative privileges.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button asChild variant="outline" className="flex-1 rounded-xl text-xs gap-1.5">
              <Link to="/">
                <ArrowLeft className="size-3.5" />
                <span>Return to Showroom</span>
              </Link>
            </Button>
            <Button asChild className="flex-1 rounded-xl text-xs gap-1.5">
              <Link to="/login">
                <LogIn className="size-3.5" />
                <span>Switch Account</span>
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
