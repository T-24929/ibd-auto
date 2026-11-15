import React, { useState } from 'react'
import { useNavigate, Link } from '@tanstack/react-router'
import { useAuth } from '../hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { User, Mail, Lock, Phone, ArrowRight, UserPlus, AlertCircle } from 'lucide-react'

export function RegisterForm() {
  const { register, isLoading } = useAuth()
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!fullName || !email || !password) {
      setErrorMsg('Please fill in all required fields.')
      return
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.')
      return
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.')
      return
    }

    const { error } = await register({ email, password, fullName, phone })
    if (error) {
      setErrorMsg(error.message || 'Registration failed. Please try again.')
      toast.error('Registration failed', { description: error.message })
    } else {
      toast.success('Account created successfully!', {
        description: 'You can now sign in and manage vehicle appointments.',
      })
      navigate({ to: '/portal' })
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl border-border/60 bg-card">
      <div className="space-y-2 text-center pb-2">
        <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-1">
          <UserPlus className="size-6" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Create Account</h1>
        <p className="text-sm text-muted-foreground">
          Join IBD Auto to save vehicles and manage inspection visits
        </p>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2 p-3 text-sm rounded-xl bg-destructive/10 text-destructive border border-destructive/20">
          <AlertCircle className="size-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5 pt-2">
        <div className="space-y-1.5">
          <Label htmlFor="fullName">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="fullName"
              placeholder="Johnathan Davis"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="pl-10 h-11 rounded-xl"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="reg-email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="reg-email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-11 rounded-xl"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone Number (Optional)</Label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              placeholder="+94 77 123 4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="pl-10 h-11 rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="reg-password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="reg-password"
              type="password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 h-11 rounded-xl"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Repeat password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-10 h-11 rounded-xl"
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 rounded-xl text-base font-medium shadow-md shadow-primary/20 gap-2 mt-4"
        >
          {isLoading ? 'Creating Account...' : 'Complete Registration'}
          <ArrowRight className="size-4" />
        </Button>
      </form>

      <div className="pt-4 border-t border-border/50 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Sign In here
          </Link>
        </p>
      </div>
    </Card>
  )
}
