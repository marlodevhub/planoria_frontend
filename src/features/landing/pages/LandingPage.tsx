import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/app/router/routes";
import { Button } from "@/components/ui/button";

export function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-accent/5 blur-2xl" />
      </div>

      <div className="relative z-10 text-center max-w-2xl px-6 animate-fade-up">
        <div className="inline-flex items-center justify-center rounded-2xl border border-border bg-card mb-8">
          <div className="h-16 w-16 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-black text-3xl">
              P
            </span>
          </div>
        </div>

        <h1 className="text-5xl font-bold text-foreground leading-tight mb-4">
          Bienvenido a <span className="text-primary">Planoria</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          Estudia con enfoque, sin distracciones y convierte tu esfuerzo en
          resultados.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Button size="lg" onClick={() => navigate(ROUTES.LOGIN)}>
            Iniciar sesión →
          </Button>
          <Button size="lg" variant="outline">
            Documentación
          </Button>
        </div>
      </div>

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
