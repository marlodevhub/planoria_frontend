import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks";
import type { LoginCredentials } from "@/features/auth/types/auth.types";
import { ROUTES } from "@/app/router/routes";
import { cn } from "@/lib/utils";

const schema = z.object({
  correo: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type Form = z.infer<typeof schema>;

export function LoginPage() {
  const { mutate: login, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Form) => {
    const payload: LoginCredentials = {
      email: data.correo,
      password: data.password,
    };
    login(payload, {
      onError: () => {
        setError("password", {
          type: "server",
          message: "Credenciales incorrectas. Intenta de nuevo.",
        });
      },
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center md:p-10 font-sans text-foreground overflow-x-hidden selection:bg-primary/30">
      <div className="w-full min-h-screen md:min-h-[620px] md:max-w-5xl bg-card md:rounded-[2.5rem] md:shadow-2xl flex flex-col md:flex-row overflow-hidden border-0 md:border border-border relative">
        {/* ─── PANEL IZQUIERDO: Desktop Only ─── */}
        <div className="hidden md:flex w-full md:w-[55%] bg-background p-12 flex-col justify-between relative overflow-hidden isolation-auto">
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-background translate-x-10 skew-x-6 transform origin-top-right z-0" />

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

          {/* Dashboard Previews */}
          <div className="relative z-10 flex flex-col gap-5 my-auto py-8 max-w-xs mx-auto w-full animate-fade-in [animation-duration:500ms]">
            {/* Preview 1: Flashcard — wrapper escala, inner flota */}
            <div className="hover:scale-105 hover:-translate-y-1 transition-transform duration-300 ease-out">
              <div className="bg-card rounded-2xl p-4 shadow-sm border border-border -rotate-2 animate-float [animation-duration:6s]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    Flashcard
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    Mazo: Anatomía
                  </span>
                </div>
                <p className="text-xs font-semibold text-foreground leading-relaxed">
                  ¿Cuál es la función principal de las mitocondrias en la
                  célula?
                </p>
                <div className="mt-3 flex justify-end">
                  <span className="text-[10px] text-primary font-medium cursor-pointer select-none">
                    Voltear tarjeta ↻
                  </span>
                </div>
              </div>
            </div>

            {/* Preview 2: Cronograma */}
            <div className="hover:scale-105 hover:-translate-y-1 transition-transform duration-300 ease-out">
              <div className="bg-card rounded-2xl p-4 shadow-sm border border-border translate-x-4 rotate-1">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent-foreground bg-accent px-2 py-0.5 rounded-full">
                    Cronograma
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    Hoy
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="font-medium text-foreground">
                      09:00 AM — Cuestionario Inteligente
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview 3: Progreso */}
            <div className="hover:scale-105 hover:-translate-y-1 transition-transform duration-300 ease-out">
              <div className="bg-card rounded-2xl p-3.5 shadow-sm border border-border -translate-x-2 -rotate-1">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-foreground">
                    Rendimiento Semanal
                  </span>
                  <span className="text-xs font-bold text-emerald-500 font-mono">
                    85%
                  </span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[85%] rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-[10px] text-muted-foreground font-mono flex justify-between items-center">
            <span>© 2026 Planoria.</span>
          </div>
        </div>

        {/* ─── PANEL DERECHO: Formulario ─── */}
        <div className="w-full md:w-[45%] bg-card p-6 sm:p-10 md:p-12 flex flex-col justify-between relative z-10 min-h-screen md:min-h-0">
          <div className="my-auto max-w-sm w-full mx-auto space-y-6 animate-slide-left [animation-duration:300ms]">
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
                Login
              </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Field label="Username" error={errors.correo?.message}>
                <input
                  {...register("correo")}
                  type="email"
                  autoComplete="username"
                  placeholder="Enter your username"
                  className={cn(inputCls, errors.correo && errorCls)}
                />
              </Field>

              <Field label="Password" error={errors.password?.message}>
                <input
                  {...register("password")}
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className={cn(inputCls, errors.password && errorCls)}
                />
              </Field>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-xs text-primary hover:underline font-medium transition-all py-1"
                >
                  Olvidaste tu contraseña?
                </button>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 mt-2 rounded-full font-semibold text-sm text-primary-foreground bg-primary hover:bg-primary/90 active:scale-[0.99] touch-manipulation transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {isPending ? (
                  <>
                    <Spinner /> Verificando...
                  </>
                ) : (
                  "Ingresar"
                )}
              </button>
            </form>

            <div className="text-center text-xs text-muted-foreground pt-2">
              No tienes una cuenta?{" "}
              <Link
                to={ROUTES.REGISTER}
                className="text-primary hover:underline block sm:inline-block sm:mt-0 mt-1 font-semibold transition-colors"
              >
                Registrate ahora
              </Link>
            </div>
          </div>

          <div className="text-[10px] text-muted-foreground flex flex-col sm:flex-row justify-between items-center gap-3 mt-8 border-t border-border pt-4 font-mono w-full">
            <Link
              to="#"
              className="hover:text-foreground hover:underline transition-colors"
            />
            <span className="text-center sm:text-right">
              Necesitas ayuda?{" "}
              <a
                href="mailto:soporte@planoria.com"
                className="text-primary font-semibold hover:underline block sm:inline transition-colors"
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
  "appearance-none",
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
        <p className="text-destructive text-xs font-mono tracking-wide mt-1 animate-fade-up [animation-duration:150ms]">
          {error}
        </p>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
  );
}
