import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'
import { LoginPayload } from '../types/auth.types'
import { ROUTES } from '@/app/router/routes'
import { cn } from '@/lib/utils'

const schema = z.object({
    correo: z.string().email('Email inválido'),
    password: z.string().min(6, 'Mínimo 6 caracteres'),
})

type Form = z.infer<typeof schema>

export function LoginPage() {
    const { mutate: login, isPending } = useLogin()
    const { register, handleSubmit, setError, formState: { errors } } = useForm<Form>({
        resolver: zodResolver(schema),
    })

    const onSubmit = (data: Form) => {
        const payload: LoginPayload = {
            correo: data.correo,
            password: data.password,
        }

        login(payload, {
            onError: () => {
                setError('password', {
                    type: 'server',
                    message: 'Credenciales incorrectas. Intenta de nuevo.',
                })
            }
        })
    }

    return (
        <div className="min-h-screen bg-bg flex items-center justify-center md:p-10 font-sans text-text overflow-x-hidden selection:bg-accent/30">

            {/* Contenedor adaptativo */}
            <div className="w-full min-h-screen md:min-h-[620px] md:max-w-5xl bg-surface md:rounded-[2.5rem] md:shadow-2xl flex flex-col md:flex-row overflow-hidden border-0 md:border border-border/20 relative">

                {/* ─── PANEL IZQUIERDO: Desktop Only ─── */}
                <div className="hidden md:flex w-full md:w-[55%] bg-white p-12 flex-col justify-between relative overflow-hidden text-black isolation-auto">

                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-white translate-x-10 skew-x-6 transform origin-top-right z-0 will-change-transform" />

                    {/* Header Desktop */}
                    <div className="relative z-10 flex items-center gap-2.5">
                        <div className="h-9 w-9 rounded-xl bg-green-1/10 flex items-center justify-center border border-green-1/20 shadow-sm">
                            <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-black text-sm">P</span>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-sm font-bold tracking-tight text-black">Planoria</h2>
                            <p className="text-[10px] text-muted font-medium leading-3">Plataforma de Aprendizaje</p>
                        </div>
                    </div>

                    {/* Dashboard Previews */}
                    <div className="relative z-10 flex flex-col gap-5 my-auto py-8 max-w-xs mx-auto w-full animate-fade-in [animation-duration:500ms]">

                        {/* Preview 1: Flashcard */}
                        <div className="bg-white-1 rounded-2xl p-4 shadow-sm border border-grey-200/60 -rotate-2 hover:rotate-0 transition-transform duration-300 ease-out animate-float will-change-transform transform-gpu backface-hidden">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-green-1 bg-green-1/10 px-2 py-0.5 rounded-full">Flashcard</span>
                                <span className="text-[10px] text-muted font-mono">Mazo: Anatomía</span>
                            </div>
                            <p className="text-xs font-semibold text-black leading-relaxed">¿Cuál es la función principal de las mitocondrias en la célula?</p>
                            <div className="mt-3 flex justify-end">
                                <span className="text-[10px] text-accent font-medium cursor-pointer select-none">Voltear tarjeta ↻</span>
                            </div>
                        </div>

                        {/* Preview 2: Cronograma Diario */}
                        <div className="bg-white-1 rounded-2xl p-4 shadow-sm border border-grey-200/60 translate-x-4 rotate-1 transition-all duration-300 will-change-transform transform-gpu backface-hidden">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-accent-2 bg-accent-2/10 px-2 py-0.5 rounded-full">Cronograma</span>
                                <span className="text-[10px] text-muted font-mono">Hoy</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2.5 text-xs">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-1" />
                                    <span className="font-medium text-black">09:00 AM — Cuestionario Inteligente</span>
                                </div>
                            </div>
                        </div>

                        {/* Preview 3: Progreso */}
                        <div className="bg-white-1 rounded-2xl p-3.5 shadow-sm border border-grey-200/60 -translate-x-2 -rotate-1 transition-all duration-300 will-change-transform transform-gpu backface-hidden">
                            <div className="flex justify-between items-center mb-1.5">
                                <span className="text-xs font-bold text-black">Rendimiento Semanal</span>
                                <span className="text-xs font-bold text-green-1 font-mono">85%</span>
                            </div>
                            <div className="w-full bg-grey-200 h-2 rounded-full overflow-hidden transform-gpu">
                                <div className="bg-green-1 h-full w-[85%] rounded-full" />
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 text-[10px] text-muted font-mono flex justify-between items-center">
                        <span>© 2026 Planoria.</span>
                    </div>
                </div>

                {/* ─── PANEL DERECHO: Formulario ─── */}
                <div className="w-full md:w-[45%] bg-surface p-6 sm:p-10 md:p-12 flex flex-col justify-between relative z-10 min-h-screen md:min-h-0">

                    {/* Se removió 'will-change-transform' para evitar que congele colores incorrectos al animar */}
                    <div className="my-auto max-w-sm w-full mx-auto space-y-6 animate-slide-left [animation-duration:300ms]">

                        {/* LOGO SUPERIOR MÓVIL */}
                        <div className="flex md:hidden items-center gap-2.5 mb-2">
                            <div className="h-9 w-9 rounded-xl bg-green-1/10 flex items-center justify-center border border-green-1/20 shadow-sm">
                                <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-black text-sm">P</span>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-sm font-bold tracking-tight text-black">Planoria</h2>
                                <p className="text-[10px] text-muted font-medium leading-3">Plataforma de Aprendizaje</p>
                            </div>
                        </div>

                        <div>
                            <h1 className="text-3xl md:text-4xl font-semibold text-black mb-1 tracking-tight">Login</h1>
                        </div>

                        {/* Formulario */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                            <Field label="Username" error={errors.correo?.message}>
                                <input
                                    {...register('correo')}
                                    type="email"
                                    autoComplete="username"
                                    placeholder="Enter your username"
                                    className={cn(inputCls, errors.correo && errorCls)}
                                />
                            </Field>

                            <Field label="Password" error={errors.password?.message}>
                                <input
                                    {...register('password')}
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    className={cn(inputCls, errors.password && errorCls)}
                                />
                            </Field>

                            <div className="flex justify-end">
                                <button type="button" className="text-xs text-accent-2 hover:underline font-medium transition-all py-1">
                                    Olvidaste tu contraseña?
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 mt-2 rounded-full font-semibold text-sm text-white bg-accent hover:bg-accent-hover active:scale-[0.99] touch-manipulation transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                            >
                                {isPending ? (
                                    <><Spinner /> Verificando...</>
                                ) : (
                                    'Igresar'
                                )}
                            </button>
                        </form>

                        <div className="text-center text-xs text-muted pt-2">
                            No tienes una cuenta?{' '}
                            <Link to={ROUTES.REGISTER} className="text-accent-2 hover:underline block sm:inline-block sm:mt-0 mt-1 font-semibold transition-colors">
                                Registrate ahora
                            </Link>
                        </div>
                    </div>

                    {/* Footer Legal */}
                    <div className="text-[10px] text-muted flex flex-col sm:flex-row justify-between items-center gap-3 mt-8 border-t border-border/10 pt-4 font-mono w-full">
                        <Link to="#" className="hover:text-text hover:underline transition-colors"></Link>
                        <span className="text-center sm:text-right">
                            Necesitas ayuda?{' '}
                            <a href="mailto:support@planoria.edu" className="text-accent-2 font-semibold hover:underline block sm:inline transition-colors">
                                soporte@planoria.com
                            </a>
                        </span>
                    </div>
                </div>

            </div>
        </div>
    )
}

// ─── Clases de Utilidad de Tailwind Unificadas ──────────────────

const inputCls = [
    'w-full bg-bg border border-border/20 rounded-xl px-4 py-3.5 font-mono',
    'text-text text-sm placeholder:text-muted/50 focus:outline-none',
    'focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all duration-150',
    'appearance-none tap-highlight-transparent transform-none',
].join(' ')

const errorCls = 'border-red-1 focus:border-red-1 focus:ring-red-1/30'

function Field({ label, error, children }: {
    label: string
    error?: string
    children: React.ReactNode
}) {
    return (
        <div className="space-y-1.5 text-left w-full">
            <label className="block text-sm font-medium text-text/95">{label}</label>
            {children}
            {error && (
                <p className="text-red-1 text-xs font-mono tracking-wide mt-1 animate-fade-up [animation-duration:150ms] will-change-transform transform-gpu">
                    {error}
                </p>
            )}
        </div>
    )
}

function Spinner() {
    return (
        <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin transform-gpu" />
    )
}   