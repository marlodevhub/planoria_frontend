import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { useRegister } from '../hooks/useRegister'
import { ROUTES } from '@/app/router/routes'
import { cn } from '@/lib/utils'

const schema = z.object({
    name: z.string().min(2, 'Mínimo 2 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Mínimo 6 caracteres'),
    confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
})

type Form = z.infer<typeof schema>

export function RegisterPage() {
    const { mutate: register_, isPending, error } = useRegister()
    const { register, handleSubmit, formState: { errors }, watch } = useForm<Form>({
        resolver: zodResolver(schema),
    })

    const password = watch('password', '')
    const strength = getStrength(password)

    return (
        <div className="min-h-screen bg-[#080810] flex overflow-hidden">

            {/* Panel izquierdo — formulario */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 relative">
                <div className="absolute inset-0 bg-[#0d0d18] lg:block hidden" />

                <div className="relative z-10 w-full max-w-md animate-fade-up">

                    {/* Header móvil */}
                    <div className="lg:hidden flex items-center gap-2 mb-10">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                            <span className="text-sm font-black text-white">M</span>
                        </div>
                        <span className="font-bold text-white">MyApp</span>
                    </div>

                    <div className="mb-8">
                        <p className="text-indigo-400 text-xs font-mono uppercase tracking-widest mb-2">
                            Empieza hoy
                        </p>
                        <h1 className="text-3xl font-bold text-white">Crea tu cuenta</h1>
                        <p className="text-slate-400 text-sm mt-2">
                            ¿Ya tienes cuenta?{' '}
                            <Link to={ROUTES.LOGIN} className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                                Inicia sesión
                            </Link>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit((d) => register_(d))} className="space-y-4">
                        <Field label="Nombre completo" error={errors.name?.message}>
                            <input
                                {...register('name')}
                                type="text"
                                placeholder="Juan García"
                                className={cn(inputCls, errors.name && errorCls)}
                            />
                        </Field>

                        <Field label="Email" error={errors.email?.message}>
                            <input
                                {...register('email')}
                                type="email"
                                placeholder="tu@email.com"
                                className={cn(inputCls, errors.email && errorCls)}
                            />
                        </Field>

                        <Field label="Contraseña" error={errors.password?.message}>
                            <input
                                {...register('password')}
                                type="password"
                                placeholder="••••••••"
                                className={cn(inputCls, errors.password && errorCls)}
                            />
                            {/* Indicador de fortaleza */}
                            {password && (
                                <div className="mt-2 space-y-1">
                                    <div className="flex gap-1">
                                        {[0, 1, 2, 3].map((i) => (
                                            <div
                                                key={i}
                                                className={cn(
                                                    'h-1 flex-1 rounded-full transition-all duration-300',
                                                    i < strength.score
                                                        ? strength.color
                                                        : 'bg-slate-700'
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <p className={cn('text-xs font-mono', strength.textColor)}>
                                        {strength.label}
                                    </p>
                                </div>
                            )}
                        </Field>

                        <Field label="Confirmar contraseña" error={errors.confirmPassword?.message}>
                            <input
                                {...register('confirmPassword')}
                                type="password"
                                placeholder="••••••••"
                                className={cn(inputCls, errors.confirmPassword && errorCls)}
                            />
                        </Field>

                        {error && (
                            <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                <span>✕</span>
                                <span>Error al crear la cuenta. Intenta de nuevo.</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isPending}
                            className={cn(
                                'w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm mt-2',
                                'bg-gradient-to-r from-indigo-500 to-violet-600',
                                'hover:from-indigo-400 hover:to-violet-500',
                                'shadow-lg shadow-indigo-500/25 transition-all duration-200',
                                'disabled:opacity-60 disabled:cursor-not-allowed text-white'
                            )}
                        >
                            {isPending
                                ? <><Spinner /> Creando cuenta...</>
                                : 'Crear cuenta →'
                            }
                        </button>

                        <p className="text-xs text-slate-500 text-center pt-1">
                            Al registrarte aceptas nuestros{' '}
                            <span className="text-slate-400 hover:text-indigo-400 cursor-pointer transition-colors">
                                Términos de servicio
                            </span>{' '}
                            y{' '}
                            <span className="text-slate-400 hover:text-indigo-400 cursor-pointer transition-colors">
                                Política de privacidad
                            </span>
                        </p>
                    </form>

                    <p className="text-center text-slate-600 text-xs mt-6 font-mono">
                        © 2026 MyApp · Todos los derechos reservados
                    </p>
                </div>
            </div>

            {/* Panel derecho — decorativo */}
            <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center p-12 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(99,102,241,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)
            `,
                        backgroundSize: '48px 48px',
                    }}
                />

                <div className="absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
                <div className="absolute bottom-1/4 left-1/4 h-48 w-48 rounded-full bg-indigo-500/10 blur-2xl animate-pulse-glow" />

                <div className="relative z-10 text-center max-w-sm animate-fade-up">
                    <div className="mx-auto mb-10 animate-float">
                        <div className="relative h-20 w-20 mx-auto">
                            <div className="absolute inset-0 rounded-2xl bg-violet-500/20 blur-xl" />
                            <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-2xl shadow-violet-500/30">
                                <span className="text-3xl font-black text-white">M</span>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                        Únete a miles de<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                            equipos exitosos
                        </span>
                    </h2>

                    <p className="text-slate-400 text-sm leading-relaxed mb-10">
                        Configura tu cuenta en menos de 2 minutos y empieza a trabajar de manera más inteligente.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { value: '10k+', label: 'Usuarios' },
                            { value: '99%', label: 'Uptime' },
                            { value: '4.9', label: 'Rating' },
                        ].map((s, i) => (
                            <div
                                key={s.label}
                                className="bg-white/5 border border-white/10 rounded-xl p-3 animate-fade-up"
                                style={{ animationDelay: `${0.1 + i * 0.1}s`, opacity: 0 }}
                            >
                                <p className="text-white font-bold text-lg">{s.value}</p>
                                <p className="text-slate-400 text-xs font-mono">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

// ─── Helpers compartidos ────────────────────────────────────────────────────

const inputCls = [
    'w-full bg-[#080810] border border-slate-700/50 rounded-xl px-4 py-3',
    'text-white text-sm placeholder:text-slate-500 font-mono',
    'focus:outline-none focus:border-indigo-500/70 focus:bg-[#0a0a14]',
    'transition-all duration-200',
].join(' ')

const errorCls = 'border-red-500/50 focus:border-red-500/70'

function Field({ label, error, children }: {
    label: string
    error?: string
    children: React.ReactNode
}) {
    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-300">{label}</label>
            {children}
            {error && <p className="text-red-400 text-xs font-mono">{error}</p>}
        </div>
    )
}

function Spinner() {
    return (
        <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
    )
}

function getStrength(password: string) {
    let score = 0
    if (password.length >= 6) score++
    if (password.length >= 10) score++
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    const map = [
        { label: 'Muy débil', color: 'bg-red-500', textColor: 'text-red-400' },
        { label: 'Débil', color: 'bg-orange-500', textColor: 'text-orange-400' },
        { label: 'Aceptable', color: 'bg-yellow-500', textColor: 'text-yellow-400' },
        { label: 'Fuerte', color: 'bg-emerald-500', textColor: 'text-emerald-400' },
    ]

    return { score, ...map[Math.max(0, score - 1)] ?? map[0] }
}