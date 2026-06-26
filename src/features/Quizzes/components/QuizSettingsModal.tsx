import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuizSettings, useUpdateSettings, useResetSettings } from "../hooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const schema = z.object({
  mostrarResultados: z.boolean(),
  permitirReintentos: z.boolean(),
  maxIntentos: z.number().min(1).max(99),
  tiempoPorPregunta: z.number().min(0).max(600),
});

type FormFields = z.infer<typeof schema>;

interface QuizSettingsModalProps {
  quizId: number;
  open: boolean;
  onClose: () => void;
}

export function QuizSettingsModal({ quizId, open, onClose }: QuizSettingsModalProps) {
  const { data: settings, isLoading } = useQuizSettings(quizId);
  const { mutate: updateSettings, isPending: isUpdating } = useUpdateSettings(quizId);
  const { mutate: resetSettings, isPending: isResetting } = useResetSettings(quizId);

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      mostrarResultados: true,
      permitirReintentos: true,
      maxIntentos: 3,
      tiempoPorPregunta: 0,
    },
  });

  useEffect(() => {
    if (settings) {
      form.reset({
        mostrarResultados: settings.mostrarResultados,
        permitirReintentos: settings.permitirReintentos,
        maxIntentos: settings.maxIntentos,
        tiempoPorPregunta: settings.tiempoPorPregunta,
      });
    }
  }, [settings, form]);

  const onSubmit = (data: FormFields) => {
    updateSettings(data, { onSuccess: onClose });
  };

  const handleReset = () => {
    resetSettings(undefined, {
      onSuccess: () => {
        form.reset({
          mostrarResultados: true,
          permitirReintentos: true,
          maxIntentos: 3,
          tiempoPorPregunta: 0,
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 gap-0">
        <div className="px-6 pt-5 pb-2">
          <DialogHeader>
            <DialogTitle className="text-base">Configuración del quiz</DialogTitle>
          </DialogHeader>
        </div>

        {isLoading ? (
          <div className="px-6 pb-6 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="px-6 pb-6 space-y-4">
                <FormField
                  control={form.control}
                  name="mostrarResultados"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <FormLabel className="mb-0">Mostrar resultados</FormLabel>
                      <FormControl>
                        <button
                          type="button"
                          onClick={() => field.onChange(!field.value)}
                          className={`relative h-6 w-11 rounded-full transition-colors ${field.value ? "bg-primary" : "bg-muted"}`}
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${field.value ? "translate-x-5" : "translate-x-0"}`}
                          />
                        </button>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="permitirReintentos"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <FormLabel className="mb-0">Permitir reintentos</FormLabel>
                      <FormControl>
                        <button
                          type="button"
                          onClick={() => field.onChange(!field.value)}
                          className={`relative h-6 w-11 rounded-full transition-colors ${field.value ? "bg-primary" : "bg-muted"}`}
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${field.value ? "translate-x-5" : "translate-x-0"}`}
                          />
                        </button>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxIntentos"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Máximo de intentos</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          max={99}
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tiempoPorPregunta"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Tiempo por pregunta (segundos){" "}
                        <span className="text-muted-foreground font-normal">(0 = sin límite)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          max={600}
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    disabled={isResetting}
                    className="text-muted-foreground"
                  >
                    <i className="ti ti-refresh text-[13px]" />
                    Restablecer
                  </Button>
                  <Button type="button" variant="outline" size="sm" className="flex-1" onClick={onClose} disabled={isUpdating}>
                    Cancelar
                  </Button>
                  <Button type="submit" size="sm" className="flex-1" disabled={isUpdating}>
                    {isUpdating ? "Guardando..." : "Guardar"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
