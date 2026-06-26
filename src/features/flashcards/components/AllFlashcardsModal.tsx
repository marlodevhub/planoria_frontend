import { useState } from "react";
import { useAllFlashcards } from "../hooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AllFlashcardsModalProps {
  open: boolean;
  onClose: () => void;
}

export function AllFlashcardsModal({ open, onClose }: AllFlashcardsModalProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading, isError } = useAllFlashcards(page, 50);

  const filtered = data?.items.filter(
    (c) =>
      !search ||
      c.question.toLowerCase().includes(search.toLowerCase()) ||
      c.answer.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col p-0 gap-0">
        <div className="px-6 pt-5 pb-3 space-y-2">
          <DialogHeader>
            <DialogTitle className="text-base">Todas las tarjetas</DialogTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              {data ? `${data.totalCount} tarjetas en total` : "Cargando..."}
            </p>
          </DialogHeader>
          <div className="relative">
            <i className="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar tarjetas..."
              className="pl-8 h-8 text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-3 space-y-1.5">
          {isLoading && (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-14 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          )}

          {isError && (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="h-10 w-10 rounded-2xl bg-destructive/10 flex items-center justify-center mb-3">
                <i className="ti ti-alert-circle text-lg text-destructive" />
              </div>
              <p className="text-sm font-medium text-foreground mb-1">Error al cargar</p>
              <p className="text-xs text-muted-foreground">No se pudieron obtener las tarjetas</p>
            </div>
          )}

          {!isLoading && !isError && (!filtered || filtered.length === 0) && (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="h-10 w-10 rounded-2xl bg-muted flex items-center justify-center mb-3">
                <i className="ti ti-cards text-lg text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground mb-1">
                {search ? "Sin resultados" : "Sin tarjetas"}
              </p>
              <p className="text-xs text-muted-foreground">
                {search ? "Probá con otros términos" : "No hay tarjetas disponibles"}
              </p>
            </div>
          )}

          {!isLoading && !isError && filtered && filtered.length > 0 && (
            filtered.map((card) => (
              <div
                key={card.id}
                className="flex items-center gap-3 rounded-xl border p-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{card.question}</p>
                  <p className="text-xs text-muted-foreground truncate">{card.answer}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground flex-shrink-0">
                  <span className={`h-1.5 w-1.5 rounded-full ${
                    card.difficulty === "easy" ? "bg-green-500" :
                    card.difficulty === "medium" ? "bg-yellow-500" : "bg-red-500"
                  }`} />
                  <span className="font-mono hidden sm:inline">{card.deckName}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-6 pb-5 pt-2 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Página {page}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={!data?.hasNextPage}
              onClick={() => setPage((p) => p + 1)}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
