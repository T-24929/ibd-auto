import { useState } from 'react'
import { useNavigate, Link } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useAuth } from '../hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react'

export function LoginForm() {
  const { login, isLoading } = useAuth()
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState('')

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      setErrorMsg('')
      const { error } = await login({ email: value.email, password: value.password })
      if (error) {
        setErrorMsg(error.message || 'Failed to sign in. Please verify your credentials.')
        toast.error('Sign in failed', { description: error.message })
      } else {
        toast.success('Welcome back!')
        if (value.email.toLowerCase().includes('admin')) {
          navigate({ to: '/admin' })
        } else {
          navigate({ to: '/portal' })
        }
      }
    },
  })

  return (
    <Card className="w-full max-w-md mx-auto p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl border-border/60 bg-card">
      <div className="space-y-2 text-center pb-2">
        <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-1">
          <ShieldCheck className="size-6" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Sign In</h1>
        <p className="text-sm text-muted-foreground">
          Access your buyer garage, tracked inspections, or administrative desk
        </p>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2 p-3 text-sm rounded-xl bg-destructive/10 text-destructive border border-destructive/20">
          <AlertCircle className="size-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Demo Credentials Helper */}
      <div className="p-3 rounded-xl bg-muted/60 border border-border/60 flex items-center justify-between gap-3 text-left">
        <div className="min-w-0">
          <div className="text-[11px] font-semibold text-foreground flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Admin Demo</span>
          </div>
          <p className="text-[11px] text-muted-foreground font-mono truncate">
            admin@gmail.com · admin@123
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => {
            form.setFieldValue('email', 'admin@gmail.com')
            form.setFieldValue('password', 'admin@123')
          }}
          className="rounded-lg h-7 px-2.5 text-[11px] font-medium shrink-0 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Auto Fill
        </Button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="space-y-4 pt-2"
      >
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => (!value ? 'Email is required' : undefined),
          }}
        >
          {(field) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id={field.name}
                  type="email"
                  placeholder="name@example.com"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="pl-10 h-11 rounded-xl"
                  required
                />
              </div>
            </div>
          )}
        </form.Field>

        <form.Field
          name="password"
          validators={{
            onChange: ({ value }) => (!value ? 'Password is required' : undefined),
          }}
        >
          {(field) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>Password</Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id={field.name}
                  type="password"
                  placeholder="••••••••"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="pl-10 h-11 rounded-xl"
                  required
                />
              </div>
            </div>
          )}
        </form.Field>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 rounded-xl text-base font-medium shadow-md shadow-primary/20 gap-2 mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Signing In...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </form>

      <div className="pt-4 border-t border-border/50 text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-primary font-medium hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </Card>
  )
}
