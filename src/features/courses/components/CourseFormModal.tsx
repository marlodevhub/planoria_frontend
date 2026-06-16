import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateCourse } from "../hooks";
import { useUpdateCourse } from "../hooks";
import type { CourseDetail } from "../types/course.types";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const COLORS = [
  "#291D50",
  "#5d3689",
  "#b085c2",
  "#51BF8F",
  "#3498db",
  "#e74c3c",
  "#f39c12",
  "#1abc9c",
  "#e67e22",
];

const schema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  examDate: z.string().optional(),
  examTime: z.string().optional(),
  colorHex: z.string(),
});

type FormFields = z.infer<typeof schema>;

interface CourseFormModalProps {
  course?: CourseDetail | null;
  onClose: () => void;
}

export function CourseFormModal({ course, onClose }: CourseFormModalProps) {
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
      colorHex: course?.colorHex ?? "#291D50",
    },
  });

  const selectedColor = form.watch("colorHex");

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
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar curso" : "Nuevo curso"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descripción opcional..."
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
                      {COLORS.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => form.setValue("colorHex", color)}
                          className="h-7 w-7 rounded-full transition-transform hover:scale-110"
                          style={{
                            backgroundColor: color,
                            outline:
                              selectedColor === color
                                ? `2px solid ${color}`
                                : "none",
                            outlineOffset: "2px",
                          }}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={onClose}
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
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

