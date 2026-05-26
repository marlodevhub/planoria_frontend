import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { useRegister } from '../hooks/useRegister'
import { RegisterPayload } from '../types/auth.types'
import { ROUTES } from '@/app/router/routes'
import { cn } from '@/lib/utils'

const schema = z.object({
    nombre: z.string().min(2, 'Mínimo 2 caracteres'),
    apellido: z.string().min(2, 'Mínimo 2 caracteres'),
    correo: z.string().email('Email inválido'),
    password: z.string().min(6, 'Mínimo 6 caracteres'),
    confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
})

type FormFields = z.infer<typeof schema>

export function RegisterPage() {
    const { mutate: register_, isPending, error } = useRegister()
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormFields>({
        resolver: zodResolver(schema),
    })

    const password = watch('password', '')
    const strength = getStrength(password)

    const onSubmit = (data: FormFields) => {
        const payload: RegisterPayload = {
            nombre: data.nombre,
            apellido: data.apellido,
            correo: data.correo,
            password: data.password,
        }
        register_(payload)
    }

    return (
        // p-0 en móvil para evitar espacios perimetrales y asegurar la pantalla completa
        <div className="min-h-screen bg-bg flex items-center justify-center md:p-10 font-sans text-text overflow-x-hidden selection:bg-accent/30">

            {/* Móvil: w-full min-h-screen (pantalla completa sin bordes ni rounded)
              Desktop (md): max-w-5xl, rounded, borde y sombreado de tarjeta asimétrica
            */}
            <div className="w-full min-h-screen md:min-h-[620px] md:max-w-5xl bg-surface md:rounded-[2.5rem] md:shadow-2xl flex flex-col md:flex-row overflow-hidden border-0 md:border border-border/20 relative">

                {/* ─── PANEL IZQUIERDO: Desktop Only (Isotipo Geométrico) ─── */}
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

                    {/* Feature Center (Entrada única y fluida) */}
                    <div className="relative z-10 flex flex-col gap-5 my-auto py-8 max-w-xs mx-auto w-full text-center animate-fade-in [animation-duration:500ms]">
                        {/* <div className="relative h-20 w-20 mx-auto flex items-center justify-center mb-2 transform-gpu backface-hidden">
                            <div className="absolute inset-0 bg-indigo-500/10 blur-xl" />
                            <div className="relative h-16 w-16 bg-bg border border-border/10 rotate-45 transform flex items-center justify-center shadow-md">
                                <div className="h-6 w-6 bg-surface rotate-[-45deg] flex items-center justify-center text-sm">✨</div>
                            </div>
                        </div> */}
                        <h2 className="text-2xl font-bold text-black leading-tight transform-gpu backface-hidden">
                            Gestiona tu aprendizaje en<br />
                            <span className=" bg-clip-text bg-gradient-to-r text-accent-2 ">
                                un entorno limpio y modular
                            </span>
                        </h2>
                        <p className="text-muted text-xs leading-relaxed transform-gpu backface-hidden">
                            Crea tu perfil en menos de 1 minutos y experimenta una comunicación limpia, enfocada y modular.
                        </p>
                    </div>

                    {/* Footer Desktop */}
                    <div className="relative z-10 text-[10px] text-muted font-mono flex justify-between items-center">
                        <span>© 2026 Planoria.</span>
                        <span>Módulos de estudio activo</span>
                    </div>
                </div>

                {/* ─── PANEL DERECHO: Formulario (Pantalla Completa en Móvil) ─── */}
                <div className="w-full md:w-[45%] bg-surface p-6 sm:p-10 md:p-12 flex flex-col justify-between relative z-10 min-h-screen md:min-h-0">

                    <div className="my-auto max-w-sm w-full mx-auto space-y-5 animate-slide-left [animation-duration:300ms] will-change-transform">

                        {/*  LOGO SUPERIOR MÓVIL: Totalmente estático, sin animaciones que causen parpadeos */}
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
                            <h1 className="text-3xl md:text-4xl font-semibold text-black mb-1 tracking-tight">Registro</h1>
                        </div>

                        {/* Formulario */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">

                            {/* Inputs en paralelo (Nombre / Apellido) */}
                            <div className="grid grid-cols-2 gap-3.5">
                                <Field label="Nombre" error={errors.nombre?.message}>
                                    <input
                                        {...register('nombre')}
                                        type="text"
                                        placeholder="Juan"
                                        className={cn(inputCls, errors.nombre && errorCls)}
                                    />
                                </Field>

                                <Field label="Apellido" error={errors.apellido?.message}>
                                    <input
                                        {...register('apellido')}
                                        type="text"
                                        placeholder="García"
                                        className={cn(inputCls, errors.apellido && errorCls)}
                                    />
                                </Field>
                            </div>

                            {/* Email */}
                            <Field label="Email" error={errors.correo?.message}>
                                <input
                                    {...register('correo')}
                                    type="email"
                                    autoComplete="username"
                                    placeholder="tu@email.com"
                                    className={cn(inputCls, errors.correo && errorCls)}
                                />
                            </Field>

                            {/* Contraseña */}
                            <Field label="Contraseña" error={errors.password?.message}>
                                <input
                                    {...register('password')}
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    className={cn(inputCls, errors.password && errorCls)}
                                />

                                {/* Medidor de Fuerza con Transición Suave */}
                                {password && (
                                    <div className="mt-2 space-y-1 transform-gpu">
                                        <div className="flex gap-1">
                                            {[0, 1, 2, 3].map((i) => (
                                                <div
                                                    key={i}
                                                    className={cn(
                                                        'h-1 flex-1 rounded-full transition-all duration-300',
                                                        i < strength.score ? strength.color : 'bg-border/20'
                                                    )}
                                                />
                                            ))}
                                        </div>
                                        <p className={cn('text-[11px] font-mono transition-colors duration-150', strength.textColor)}>
                                            {strength.label}
                                        </p>
                                    </div>
                                )}
                            </Field>

                            {/* Confirmar Contraseña */}
                            <Field label="Confirmar contraseña" error={errors.confirmPassword?.message}>
                                <input
                                    {...register('confirmPassword')}
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    className={cn(inputCls, errors.confirmPassword && errorCls)}
                                />
                            </Field>

                            {/* Error del Servidor */}
                            {error && (
                                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-1/10 border border-red-1/20 text-red-1 text-xs font-mono animate-fade-up [animation-duration:150ms] transform-gpu">
                                    <span>✕</span>
                                    <span>Error al crear la cuenta. Intenta de nuevo.</span>
                                </div>
                            )}

                            {/* Botón ovalado adaptado a feedback táctil */}
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 mt-2 rounded-full font-semibold text-sm text-white bg-accent hover:bg-accent-hover active:scale-[0.99] touch-manipulation transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                            >
                                {isPending ? (
                                    <><Spinner /> Creando cuenta...</>
                                ) : (
                                    'Crear cuenta →'
                                )}
                            </button>
                        </form>

                        {/* Enlace a Login */}
                        <div className="text-center text-xs text-muted pt-1">
                            ¿Ya tienes cuenta?{' '}
                            <Link to={ROUTES.LOGIN} className="text-accent-2 hover:underline block sm:inline-block sm:mt-0 mt-1 font-semibold transition-colors">
                                Inicia sesión
                            </Link>
                        </div>
                    </div>

                    {/* Footer Legal Responsivo completo */}
                    <div className="text-[10px] text-muted flex flex-col sm:flex-row justify-between items-center gap-3 mt-8 border-t border-border/10 pt-4 font-mono w-full">
                        <Link to="#" className="hover:text-text hover:underline transition-colors"> </Link>
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

// ─── Clases de Utilidad Estables de Tailwind ──────────────────

const inputCls = [
    'w-full bg-bg border border-border/20 rounded-xl px-4 py-3.5 font-mono',  // Mismo padding táctil que login móvil
    'text-text text-sm placeholder:text-muted/50 focus:outline-none',
    'focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all duration-150',
    'appearance-none tap-highlight-transparent',
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

function getStrength(p: string) {
    let s = 0; if (p.length >= 6) s++; if (p.length >= 10) s++; if (/[A-Z]/.test(p) && /[0-9]/.test(p)) s++; if (/[^A-Za-z0-9]/.test(p)) s++;
    const m = [
        { label: 'Muy débil', color: 'bg-red-500', textColor: 'text-red-400' },
        { label: 'Débil', color: 'bg-orange-500', textColor: 'text-orange-400' },
        { label: 'Aceptable', color: 'bg-yellow-500', textColor: 'text-yellow-400' },
        { label: 'Fuerte', color: 'bg-emerald-500', textColor: 'text-emerald-400' }
    ]
    return { score: s, ...m[Math.max(0, s - 1)] ?? m[0] }
}