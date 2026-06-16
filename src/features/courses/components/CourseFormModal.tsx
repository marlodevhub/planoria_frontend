import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateCourse, useUpdateCourse } from "../hooks";
import type { CourseDetail } from "../types/course.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const COLORS = [
  { hex: "#291D50", label: "Índigo" },
  { hex: "#5d3689", label: "Violeta" },
  { hex: "#b085c2", label: "Lavanda" },
  { hex: "#3b82f6", label: "Azul" },
  { hex: "#51BF8F", label: "Verde" },
  { hex: "#1abc9c", label: "Turquesa" },
  { hex: "#f59e0b", label: "Ámbar" },
  { hex: "#e67e22", label: "Naranja" },
  { hex: "#e74c3c", label: "Rojo" },
];

const schema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(80, "Máximo 80 caracteres"),
  description: z.string().max(300, "Máximo 300 caracteres").optional(),
  examDate: z.string().optional(),
  examTime: z.string().optional(),
  colorHex: z.string(),
});

type FormFields = z.infer<typeof schema>;

interface CourseFormModalProps {
  course?: CourseDetail | null;
  open: boolean; // ← nueva prop
  onClose: () => void;
}

export function CourseFormModal({
  course,
  open,
  onClose,
}: CourseFormModalProps) {
  const isEditing = !!course;
  const { mutate: createCourse, isPending: isCreating } = useCreateCourse();
  const { mutate: updateCourse, isPending: isUpdating } = useUpdateCourse(
    course?.id ?? 0,
  );
  const isPending = isCreating || isUpdating;

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: course?.name ?? "",
      description: course?.description ?? "",
      examDate: course?.examDate ? course.examDate.split("T")[0] : "",
      examTime: course?.examTime ?? "",
      colorHex: course?.colorHex ?? COLORS[0].hex,
    },
  });

  // Resetea el form cuando cambia el curso o se abre el modal
  useEffect(() => {
    if (open) {
      form.reset({
        name: course?.name ?? "",
        description: course?.description ?? "",
        examDate: course?.examDate ? course.examDate.split("T")[0] : "",
        examTime: course?.examTime ?? "",
        colorHex: course?.colorHex ?? COLORS[0].hex,
      });
    }
  }, [open, course]);

  const selectedColor = form.watch("colorHex");
  const nameValue = form.watch("name");

  const onSubmit = (data: FormFields) => {
    const payload = {
      name: data.name,
      description: data.description ?? "",
      examDate: data.examDate ? new Date(data.examDate).toISOString() : "",
      examTime: data.examTime ?? "",
      colorHex: data.colorHex,
    };

    if (isEditing) {
      updateCourse(payload, { onSuccess: onClose });
    } else {
      createCourse(payload, { onSuccess: onClose });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden gap-0">
        {/* Preview header con color dinámico */}
        <div
          className="h-1.5 w-full transition-colors duration-300"
          style={{ backgroundColor: selectedColor }}
        />

        <div className="px-6 pt-5 pb-2">
          <DialogHeader>
            <div className="flex items-center gap-2.5">
              <div
                className="h-3 w-3 rounded-full flex-shrink-0 transition-colors duration-300"
                style={{ backgroundColor: selectedColor }}
              />
              <DialogTitle>
                {isEditing ? "Editar curso" : "Nuevo curso"}
              </DialogTitle>
            </div>
            {nameValue && (
              <DialogDescription className="text-xs font-mono truncate pl-5">
                {nameValue}
              </DialogDescription>
            )}
          </DialogHeader>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="px-6 pb-6 space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Álgebra Lineal" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Descripción{" "}
                      <span className="text-muted-foreground font-normal">
                        (opcional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="¿De qué trata este curso?"
                        rows={2}
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="examDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha examen</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="examTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hora</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="colorHex"
                render={() => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <div className="flex gap-2 flex-wrap">
                        {COLORS.map(({ hex, label }) => (
                          <button
                            key={hex}
                            type="button"
                            title={label}
                            onClick={() => form.setValue("colorHex", hex)}
                            className="h-7 w-7 rounded-full transition-all duration-150 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            style={{
                              backgroundColor: hex,
                              outline:
                                selectedColor === hex
                                  ? `2px solid ${hex}`
                                  : "2px solid transparent",
                              outlineOffset: "2px",
                              boxShadow:
                                selectedColor === hex
                                  ? `0 0 0 1px ${hex}30`
                                  : "none",
                            }}
                            aria-label={label}
                            aria-pressed={selectedColor === hex}
                          />
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={onClose}
                  disabled={isPending}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1" disabled={isPending}>
                  {isPending
                    ? "Guardando..."
                    : isEditing
                      ? "Guardar cambios"
                      : "Crear curso"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
