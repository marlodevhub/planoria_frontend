// features/flashcards/components/GenerateFlashcardsModal.tsx

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCourses } from "@/features/courses/hooks";
import type { UploadFileResponse } from "../types/flashcard.types";
import { useUploadFile, useGenerateFlashcards } from "../hooks";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ─── Schemas ───────────────────────────────────────────────
const step1Schema = z.object({
  courseId: z.string().min(1, "Seleccioná un curso"),
  file: z.instanceof(File, { message: "Seleccioná un archivo PDF" }),
});

const step2Schema = z.object({
  topic: z.string().min(1, "El tema es requerido").max(200),
  numberOfItems: z.number().min(1).max(50),
  difficulty: z.enum(["easy", "medium", "hard"]),
  language: z.string().min(1),
});

type Step1Fields = z.infer<typeof step1Schema>;
type Step2Fields = z.infer<typeof step2Schema>;

interface GenerateFlashcardsModalProps {
  open: boolean;
  onClose: () => void;
}

function StepIndicator({ current }: { current: 1 | 2 }) {
  return (
    <div className="flex items-center gap-2 mb-1">
      {[1, 2].map((step) => (
        <div key={step} className="flex items-center gap-2">
          <div
            className={cn(
              "h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-200",
              current === step
                ? "bg-accent text-accent-foreground"
                : step < current
                  ? "bg-accent/30 text-accent"
                  : "bg-bg text-muted-foreground border border-border",
            )}
          >
            {step < current ? (
              <i className="ti ti-check text-[10px]" aria-hidden="true" />
            ) : (
              step
            )}
          </div>
          {step < 2 && (
            <div
              className={cn(
                "h-px w-8 transition-all duration-300",
                current > step ? "bg-accent/30" : "bg-border",
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function FileDropZone({
  file,
  onChange,
  error,
}: {
  file: File | null;
  onChange: (file: File) => void;
  error?: string;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) onChange(f);
  };

  const formatSize = (bytes: number) =>
    bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(1)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

  return (
    <div className="space-y-1.5">
      <label
        htmlFor="file-upload"
        className={cn(
          "flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-6 cursor-pointer transition-all duration-200",
          file
            ? "border-accent/40 bg-accent/5"
            : "border-border hover:border-accent/30 hover:bg-bg/50",
          error && "border-destructive/40 bg-destructive/5",
        )}
      >
        {file ? (
          <>
            <div className="h-9 w-9 rounded-xl bg-accent/10 flex items-center justify-center">
              <i
                className="ti ti-file-type-pdf text-[20px] text-accent"
                aria-hidden="true"
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground truncate max-w-[200px]">
                {file.name}
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                {formatSize(file.size)}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              Click para cambiar archivo
            </p>
          </>
        ) : (
          <>
            <div className="h-9 w-9 rounded-xl bg-bg border border-border flex items-center justify-center">
              <i
                className="ti ti-upload text-[20px] text-muted-foreground"
                aria-hidden="true"
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                Subí tu archivo PDF
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Click para seleccionar
              </p>
            </div>
          </>
        )}
        <input
          id="file-upload"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleChange}
        />
      </label>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export function GenerateFlashcardsModal({
  open,
  onClose,
}: GenerateFlashcardsModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [step1Data, setStep1Data] = useState<Step1Fields | null>(null);

  const { data: courses } = useCourses();
  const { mutate: uploadFile, isPending: isUploading } = useUploadFile();
  const { mutate: generateFlashcards, isPending: isGenerating } =
    useGenerateFlashcards(Number(step1Data?.courseId ?? 0));

  const form1 = useForm<Step1Fields>({
    resolver: zodResolver(step1Schema),
    defaultValues: { courseId: "", file: undefined as unknown as File },
  });

  const form2 = useForm<Step2Fields>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      topic: "",
      numberOfItems: 10,
      difficulty: "medium",
      language: "es",
    },
  });

  const selectedFile = form1.watch("file");

  const handleClose = () => {
    form1.reset();
    form2.reset();
    setStep(1);
    setStep1Data(null);
    onClose();
  };

  const onStep1Submit = (data: Step1Fields) => {
    setStep1Data(data);
    setStep(2);
  };

  const onStep2Submit = (data: Step2Fields) => {
    if (!step1Data) return;
    uploadFile(
      { courseId: Number(step1Data.courseId), file: step1Data.file },
      {
        onSuccess: (uploaded: UploadFileResponse) => {
          generateFlashcards(
            {
              fileId: uploaded.id,
              contentType: "flashcard",
              topic: data.topic,
              targetCourseId: Number(step1Data.courseId),
              numberOfItems: data.numberOfItems,
              difficulty: data.difficulty,
              language: data.language,
            },
            { onSuccess: handleClose },
          );
        },
      },
    );
  };

  const isPending = isUploading || isGenerating;
  const pendingLabel = isUploading
    ? "Subiendo archivo..."
    : isGenerating
      ? "Generando flashcards..."
      : "Generar";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0 overflow-visible bg-white border border-border shadow-xl">
        <div className="px-6 pt-5 pb-4 border-b border-border">
          <DialogHeader>
            <div className="flex items-center justify-between mb-3">
              <StepIndicator current={step} />
              <span className="text-xs text-muted-foreground font-mono">
                {step}/2
              </span>
            </div>
            <DialogTitle className="text-base text-foreground flex items-center gap-2">
              <i className="ti ti-sparkles text-accent" aria-hidden="true" />
              {step === 1
                ? "Seleccionar curso y archivo"
                : "Configurar generación"}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-1">
              {step === 1
                ? "Elegí el curso y subí el PDF fuente"
                : "Configurá cómo querés generar las flashcards"}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <Form {...form1}>
            <form
              onSubmit={form1.handleSubmit(onStep1Submit)}
              className="overflow-visible"
            >
              <div className="px-6 py-4 space-y-4 max-h-[60vh] overflow-y-auto">
                <FormField
                  control={form1.control}
                  name="courseId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground text-sm font-medium">
                        Curso
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white border-border">
                            <SelectValue placeholder="Seleccioná un curso" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white border-border">
                          {courses
                            ?.filter((c) => !c.isArchived)
                            .map((course) => (
                              <SelectItem
                                key={course.id}
                                value={String(course.id)}
                              >
                                <div className="flex items-center gap-2">
                                  <div
                                    className="h-2 w-2 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: course.colorHex }}
                                  />
                                  {course.name}
                                </div>
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form1.control}
                  name="file"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-foreground text-sm font-medium">
                        Archivo PDF
                      </FormLabel>
                      <FormControl>
                        <FileDropZone
                          file={selectedFile ?? null}
                          onChange={(f) =>
                            form1.setValue("file", f, { shouldValidate: true })
                          }
                          error={form1.formState.errors.file?.message}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="px-6 pb-6 pt-3 flex gap-3 border-t border-border bg-bg/30 rounded-b-2xl">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-border text-foreground hover:bg-accent/10 hover:text-foreground"
                  onClick={handleClose}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/80 transition-all duration-200 shadow-sm shadow-accent/20"
                >
                  Siguiente
                  <i
                    className="ti ti-arrow-right text-[14px]"
                    aria-hidden="true"
                  />
                </Button>
              </div>
            </form>
          </Form>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <Form {...form2}>
            <form
              onSubmit={form2.handleSubmit(onStep2Submit)}
              className="overflow-visible"
            >
              <div className="px-6 py-4 space-y-4 max-h-[60vh] overflow-y-auto">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-bg/50 border border-border">
                  <i
                    className="ti ti-file-type-pdf text-[15px] text-muted-foreground"
                    aria-hidden="true"
                  />
                  <p className="text-xs text-foreground truncate flex-1">
                    {step1Data?.file.name}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-accent hover:text-accent/80 transition-colors"
                  >
                    Cambiar
                  </button>
                </div>

                <FormField
                  control={form2.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground text-sm font-medium">
                        Tema <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ej: Conceptos clave sobre redes de computadoras"
                          rows={2}
                          className="resize-none bg-white border-border text-foreground"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form2.control}
                    name="numberOfItems"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground text-sm font-medium">
                          Cantidad
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            max={50}
                            className="bg-white border-border text-foreground"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form2.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground text-sm font-medium">
                          Dificultad
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white border-border">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border-border">
                            <SelectItem value="easy">Fácil</SelectItem>
                            <SelectItem value="medium">Media</SelectItem>
                            <SelectItem value="hard">Difícil</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form2.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground text-sm font-medium">
                        Idioma
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white border-border">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white border-border">
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="en">Inglés</SelectItem>
                          <SelectItem value="pt">Portugués</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="px-6 pb-6 pt-3 flex gap-3 border-t border-border bg-bg/30 rounded-b-2xl">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-border text-foreground hover:bg-accent/10 hover:text-foreground"
                  onClick={() => setStep(1)}
                  disabled={isPending}
                >
                  <i
                    className="ti ti-arrow-left text-[14px]"
                    aria-hidden="true"
                  />
                  Atrás
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/80 transition-all duration-200 shadow-sm shadow-accent/20"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <i
                        className="ti ti-loader-2 animate-spin text-[14px]"
                        aria-hidden="true"
                      />
                      {pendingLabel}
                    </>
                  ) : (
                    <>
                      <i
                        className="ti ti-sparkles text-[14px]"
                        aria-hidden="true"
                      />
                      Generar
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
