import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'
import { ROUTES } from '@/app/router/routes'
import { cn } from '@/lib/utils'

const schema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Mínimo 6 caracteres'),
})

type Form = z.infer<typeof schema>

export function LoginPage() {
    const { mutate: login, isPending, error } = useLogin()
    const { register, handleSubmit, formState: { errors } } = useForm<Form>({
        resolver: zodResolver(schema),
    })

    return (
        <div className="min-h-screen bg-[#080810] flex overflow-hidden">

            {/* Panel izquierdo — decorativo */}
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

                <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl animate-pulse-glow" />
                <div className="absolute bottom-1/3 right-1/4 h-48 w-48 rounded-full bg-violet-500/10 blur-2xl" />

                <div className="relative z-10 text-center max-w-sm animate-fade-up">
                    <div className="mx-auto mb-10 animate-float">
                        <div className="relative h-20 w-20 mx-auto">
                            <div className="absolute inset-0 rounded-2xl bg-indigo-500/20 blur-xl" />
                            <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30">
                                <span className="text-3xl font-black text-white tracking-tighter">M</span>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                        Tu espacio de<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                            trabajo inteligente
                        </span>
                    </h2>

                    <p className="text-slate-400 text-sm leading-relaxed">
                        Gestiona, analiza y colabora desde un solo lugar. Diseñado para equipos que no se conforman.
                    </p>

                    <div className="mt-10 space-y-3 text-left">
                        {[
                            { icon: '⚡', text: 'Velocidad sin compromisos' },
                            { icon: '🔒', text: 'Seguridad de nivel empresarial' },
                            { icon: '∞', text: 'Escala con tu equipo' },
                        ].map((f, i) => (
                            <div
                                key={f.text}
                                className="flex items-center gap-3 animate-fade-up"
                                style={{ animationDelay: `${0.2 + i * 0.1}s`, opacity: 0 }}
                            >
                                <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-sm flex-shrink-0">
                                    {f.icon}
                                </div>
                                <span className="text-slate-300 text-sm">{f.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Panel derecho — formulario */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 relative">
                <div className="absolute inset-0 bg-[#0d0d18] lg:block hidden" />

                <div className="relative z-10 w-full max-w-md animate-slide-left">

                    {/* Header móvil */}
                    <div className="lg:hidden flex items-center gap-2 mb-10">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                            <span className="text-sm font-black text-white">M</span>
                        </div>
                        <span className="font-bold text-white">MyApp</span>
                    </div>

                    <div className="mb-8">
                        <p className="text-indigo-400 text-xs font-mono uppercase tracking-widest mb-2">
                            Bienvenido de nuevo
                        </p>
                        <h1 className="text-3xl font-bold text-white">Inicia sesión</h1>
                        <p className="text-slate-400 text-sm mt-2">
                            ¿No tienes cuenta?{' '}
                            <Link to={ROUTES.REGISTER} className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                                Regístrate gratis
                            </Link>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit((d) => login(d))} className="space-y-5">
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
                        </Field>

                        <div className="flex justify-end">
                            <button type="button" className="text-xs text-slate-400 hover:text-indigo-400 transition-colors">
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                <span>✕</span>
                                <span>Credenciales incorrectas. Intenta de nuevo.</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isPending}
                            className={cn(
                                'w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm',
                                'bg-gradient-to-r from-indigo-500 to-violet-600',
                                'hover:from-indigo-400 hover:to-violet-500',
                                'shadow-lg shadow-indigo-500/25 transition-all duration-200',
                                'disabled:opacity-60 disabled:cursor-not-allowed text-white'
                            )}
                        >
                            {isPending
                                ? <><Spinner /> Iniciando sesión...</>
                                : 'Iniciar sesión →'
                            }
                        </button>
                    </form>

                    <p className="text-center text-slate-600 text-xs mt-8 font-mono">
                        © 2026 MyApp · Todos los derechos reservados
                    </p>
                </div>
            </div>
        </div>
    )
}

// ─── Helpers ────────────────────────────────────────────────────────────────

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