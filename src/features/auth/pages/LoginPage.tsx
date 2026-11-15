import { LoginForm } from '../components/LoginForm'

export function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}
