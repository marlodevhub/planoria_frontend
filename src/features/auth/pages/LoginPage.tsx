import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'
import { Button } from '@/shared/components/ui/Button'
import { ROUTES } from '@/app/router/routes'
import { cn } from '@/lib/utils'

const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Mínimo 6 caracteres'),
})

type LoginForm = z.infer<typeof loginSchema>

export function LoginPage() {
    const navigate = useNavigate()
    const { mutate: login, isPending, error } = useLogin()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) })

    const onSubmit = (data: LoginForm) => login(data)

    return (
        <div className="min-h-screen bg-bg flex items-center justify-center px-4">
            <div className="w-full max-w-md animate-fade-up">
                {/* Card */}
                <div className="bg-surface border border-border rounded-2xl p-8 shadow-2xl">
                    <div className="mb-8">
                        <div className="h-10 w-10 rounded-xl bg-accent mb-4" />
                        <h1 className="text-2xl font-bold text-text">Bienvenido de nuevo</h1>
                        <p className="text-muted text-sm mt-1">Ingresa tus credenciales para continuar</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <Field label="Email" error={errors.email?.message}>
                            <input
                                {...register('email')}
                                type="email"
                                placeholder="tu@email.com"
                                className={cn(inputBase, errors.email && inputError)}
                            />
                        </Field>

                        <Field label="Contraseña" error={errors.password?.message}>
                            <input
                                {...register('password')}
                                type="password"
                                placeholder="••••••••"
                                className={cn(inputBase, errors.password && inputError)}
                            />
                        </Field>

                        {error && (
                            <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2">
                                Credenciales incorrectas
                            </p>
                        )}

                        <Button type="submit" loading={isPending} className="w-full" size="lg">
                            Iniciar sesión
                        </Button>
                    </form>
                </div>

                <p className="text-center text-muted text-sm mt-6">
                    ¿Quieres volver?{' '}
                    <button
                        onClick={() => navigate(ROUTES.LANDING)}
                        className="text-accent hover:underline"
                    >
                        Ir al inicio
                    </button>
                </p>
            </div>
        </div>
    )
}

// Helpers locales
const inputBase = [
    'w-full bg-bg border border-border rounded-lg px-4 py-2.5',
    'text-text text-sm placeholder:text-muted font-mono',
    'focus:outline-none focus:border-accent transition-colors duration-200',
].join(' ')

const inputError = 'border-red-400/50 focus:border-red-400'

function Field({
    label, error, children,
}: {
    label: string
    error?: string
    children: React.ReactNode
}) {
    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">{label}</label>
            {children}
            {error && <p className="text-red-400 text-xs">{error}</p>}
        </div>
    )
}