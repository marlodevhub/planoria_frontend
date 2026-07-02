import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useRegister } from "../hooks";
import type { RegisterCredentials } from "@/features/auth/types/auth.types";
import { ROUTES } from "@/app/router/routes";
import { cn } from "@/lib/utils";

const schema = z
  .object({
    nombre: z.string().min(2, "Mínimo 2 caracteres"),
    apellido: z.string().min(2, "Mínimo 2 caracteres"),
    correo: z.string().email("Email inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type FormFields = z.infer<typeof schema>;

export function RegisterPage() {
  const { mutate: register_, isPending, error } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const password = watch("password", "");
  const strength = getStrength(password);

  const onSubmit = (data: FormFields) => {
    const payload: RegisterCredentials = {
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.correo,
      password: data.password,
    };
    register_(payload);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center md:p-10 font-sans text-foreground overflow-x-hidden selection:bg-primary/30">
      <div className="w-full min-h-screen md:min-h-[620px] md:max-w-5xl bg-card md:rounded-[2.5rem] md:shadow-2xl flex flex-col md:flex-row overflow-hidden border-0 md:border border-border relative">
        {/* ─── PANEL IZQUIERDO: Desktop Only ─── */}
        <div className="hidden md:flex w-full md:w-[55%] bg-background p-12 flex-col justify-between relative overflow-hidden isolation-auto">
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-background translate-x-10 skew-x-6 transform origin-top-right z-0 will-change-transform" />

          {/* Header Desktop */}
          <div className="relative z-10 flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-sm">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground font-black text-sm">
                  P
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight text-foreground">
                Planoria
              </h2>
              <p className="text-[10px] text-muted-foreground font-medium leading-3">
                Plataforma de Aprendizaje
              </p>
            </div>
          </div>

          {/* Feature Center */}
          <div className="relative z-10 flex flex-col gap-5 my-auto py-8 max-w-xs mx-auto w-full text-center animate-fade-in [animation-duration:500ms]">
            <h2 className="text-2xl font-bold text-foreground leading-tight transform-gpu backface-hidden">
              Gestiona tu aprendizaje en
              <br />
              <span className="text-accent">un entorno limpio y modular</span>
            </h2>
            <p className="text-muted-foreground text-xs leading-relaxed transform-gpu backface-hidden">
              Crea tu perfil en menos de 1 minuto y experimenta una comunicación
              limpia, enfocada y modular.
            </p>
          </div>

          {/* Footer Desktop */}
          <div className="relative z-10 text-[10px] text-muted-foreground font-mono flex justify-between items-center">
            <span>© 2026 Planoria.</span>
            <span>Módulos de estudio activo</span>
          </div>
        </div>

        {/* ─── PANEL DERECHO: Formulario ─── */}
        <div className="w-full md:w-[45%] bg-card p-6 sm:p-10 md:p-12 flex flex-col justify-between relative z-10 min-h-screen md:min-h-0">
          <div className="my-auto max-w-sm w-full mx-auto space-y-5 animate-slide-left [animation-duration:300ms] will-change-transform">
            {/* LOGO MÓVIL */}
            <div className="flex md:hidden items-center gap-2.5 mb-2">
              <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-sm">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-black text-sm">
                    P
                  </span>
                </div>
              </div>
              <div>
                <h2 className="text-sm font-bold tracking-tight text-foreground">
                  Planoria
                </h2>
                <p className="text-[10px] text-muted-foreground font-medium leading-3">
                  Plataforma de Aprendizaje
                </p>
              </div>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-1 tracking-tight">
                Registro
              </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3.5">
                <Field label="Nombre" error={errors.nombre?.message}>
                  <input
                    {...register("nombre")}
                    type="text"
                    placeholder="Juan"
                    className={cn(inputCls, errors.nombre && errorCls)}
                  />
                </Field>
                <Field label="Apellido" error={errors.apellido?.message}>
                  <input
                    {...register("apellido")}
                    type="text"
                    placeholder="García"
                    className={cn(inputCls, errors.apellido && errorCls)}
                  />
                </Field>
              </div>

              <Field label="Email" error={errors.correo?.message}>
                <input
                  {...register("correo")}
                  type="email"
                  autoComplete="username"
                  placeholder="tu@email.com"
                  className={cn(inputCls, errors.correo && errorCls)}
                />
              </Field>

              <Field label="Contraseña" error={errors.password?.message}>
                <input
                  {...register("password")}
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className={cn(inputCls, errors.password && errorCls)}
                />
                {password && (
                  <div className="mt-2 space-y-1 transform-gpu">
                    <div className="flex gap-1">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={cn(
                            "h-1 flex-1 rounded-full transition-all duration-300",
                            i < strength.score ? strength.color : "bg-border",
                          )}
                        />
                      ))}
                    </div>
                    <p
                      className={cn(
                        "text-[11px] font-mono transition-colors duration-150",
                        strength.textColor,
                      )}
                    >
                      {strength.label}
                    </p>
                  </div>
                )}
              </Field>

              <Field
                label="Confirmar contraseña"
                error={errors.confirmPassword?.message}
              >
                <input
                  {...register("confirmPassword")}
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className={cn(inputCls, errors.confirmPassword && errorCls)}
                />
              </Field>

              {error && (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-mono animate-fade-up [animation-duration:150ms] transform-gpu">
                  <span>✕</span>
                  <span>Error al crear la cuenta. Intenta de nuevo.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 mt-2 rounded-full font-semibold text-sm text-primary-foreground bg-primary hover:bg-primary/90 active:scale-[0.99] touch-manipulation transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {isPending ? (
                  <>
                    <Spinner /> Creando cuenta...
                  </>
                ) : (
                  "Crear cuenta →"
                )}
              </button>
            </form>

            <div className="text-center text-xs text-muted-foreground pt-1">
              ¿Ya tienes cuenta?{" "}
              <Link
                to={ROUTES.LOGIN}
                className="text-accent hover:underline block sm:inline-block sm:mt-0 mt-1 font-semibold transition-colors"
              >
                Inicia sesión
              </Link>
            </div>
          </div>

          <div className="text-[10px] text-muted-foreground flex flex-col sm:flex-row justify-between items-center gap-3 mt-8 border-t border-border pt-4 font-mono w-full">
            <Link
              to="#"
              className="hover:text-foreground hover:underline transition-colors"
            >
              {" "}
            </Link>
            <span className="text-center sm:text-right">
              Necesitas ayuda?{" "}
              <a
                href="mailto:soporte@planoria.com"
                className="text-accent font-semibold hover:underline block sm:inline transition-colors"
              >
                soporte@planoria.com
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputCls = [
  "w-full bg-background border border-border rounded-xl px-4 py-3.5 font-mono",
  "text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none",
  "focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-150",
  "appearance-none tap-highlight-transparent",
].join(" ");

const errorCls =
  "border-destructive focus:border-destructive focus:ring-destructive/30";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5 text-left w-full">
      <label className="block text-sm font-medium text-foreground/95">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-destructive text-xs font-mono tracking-wide mt-1 animate-fade-up [animation-duration:150ms] will-change-transform transform-gpu">
          {error}
        </p>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin transform-gpu" />
  );
}

function getStrength(p: string) {
  let s = 0;
  if (p.length >= 6) s++;
  if (p.length >= 10) s++;
  if (/[A-Z]/.test(p) && /[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  const m = [
    { label: "Muy débil", color: "bg-red-500", textColor: "text-red-400" },
    { label: "Débil", color: "bg-orange-500", textColor: "text-orange-400" },
    {
      label: "Aceptable",
      color: "bg-yellow-500",
      textColor: "text-yellow-400",
    },
    { label: "Fuerte", color: "bg-emerald-500", textColor: "text-emerald-400" },
  ];
  return { score: s, ...(m[Math.max(0, s - 1)] ?? m[0]) };
}
