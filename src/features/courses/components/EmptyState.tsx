import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onNew: () => void;
}

export function EmptyState({ onNew }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="relative mb-5">
        <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center">
          <i className="ti ti-book-2 text-[26px] text-muted-foreground" />
        </div>
        <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
          <i className="ti ti-plus text-[11px] text-primary-foreground" />
        </div>
      </div>

      <p className="font-semibold text-foreground mb-1">Sin cursos todavía</p>
      <p className="text-muted-foreground text-sm mb-5 max-w-[220px] leading-relaxed">
        Creá tu primer curso para organizar tus flashcards y quizzes
      </p>

      <Button onClick={onNew} size="sm">
        <i className="ti ti-plus text-[15px]" />
        Nuevo curso
      </Button>
    </div>
  );
}
