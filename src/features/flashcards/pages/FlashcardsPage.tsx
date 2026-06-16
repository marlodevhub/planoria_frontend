import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GenerateFlashcardsModal } from "../components/GenerateFlashcardsModal";

export function FlashcardsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-5 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            Flashcards
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Generá mazos desde tus archivos
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)} size="sm">
          <i className="ti ti-sparkles text-[15px]" />
          Generar mazo
        </Button>
      </div>

      {/* Contenido — por implementar */}
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="relative mb-5">
          <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center">
            <i className="ti ti-cards text-[26px] text-muted-foreground" />
          </div>
          <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
            <i className="ti ti-sparkles text-[11px] text-primary-foreground" />
          </div>
        </div>
        <p className="font-semibold text-foreground mb-1">Sin mazos todavía</p>
        <p className="text-muted-foreground text-sm mb-5 max-w-[220px] leading-relaxed">
          Generá tu primer mazo subiendo un PDF de tu curso
        </p>
      </div>

      {/* Modal */}
      <GenerateFlashcardsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}

