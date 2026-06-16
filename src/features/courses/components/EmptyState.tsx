interface EmptyStateProps {
  onNew: () => void;
}

export function EmptyState({ onNew }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center mb-4">
        <i className="ti ti-book-2 text-[24px] text-muted-foreground" />
      </div>
      <p className="font-semibold text-foreground mb-1">
        No tienes cursos todavía
      </p>
      <p className="text-muted-foreground text-sm mb-4">
        Crea tu primer curso para empezar
      </p>
      <button
        onClick={onNew}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        <i className="ti ti-plus text-[16px]" />
        Nuevo curso
      </button>
    </div>
  );
}

