import { useRef, useEffect, useMemo } from "react";
import { useGestureHandler } from "../hooks/useGestureHandler";
import { HoldRing } from "./HoldRing";
import type { Flashcard } from "../types/flashcard.types";

// Gradientes vivos inspirados en la imagen de referencia
const GRADIENTS = [
  "linear-gradient(135deg, #a78bfa 0%, #818cf8 100%)", // violeta → índigo
  "linear-gradient(135deg, #93c5fd 0%, #67e8f9 100%)", // azul → cyan
  "linear-gradient(135deg, #f9a8d4 0%, #fb7185 100%)", // rosa → rojo
  "linear-gradient(135deg, #86efac 0%, #34d399 100%)", // verde claro → esmeralda
  "linear-gradient(135deg, #fde68a 0%, #fb923c 100%)", // amarillo → naranja
  "linear-gradient(135deg, #c4b5fd 0%, #f0abfc 100%)", // lavanda → lila
  "linear-gradient(135deg, #67e8f9 0%, #818cf8 100%)", // cyan → índigo
  "linear-gradient(135deg, #fca5a5 0%, #f472b6 100%)", // rojo → rosa
];

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: "Fácil",
  medium: "Media",
  hard: "Difícil",
};

interface StudyCardProps {
  card: Flashcard;
  flipped: boolean;
  cardsBehind: number;
  onFlip: () => void;
  onResetFlip: () => void;
  onNext: (wasKnown: boolean) => void;
}

export function StudyCard({
  card,
  flipped,
  cardsBehind,
  onFlip,
  onResetFlip,
  onNext,
}: StudyCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Gradiente aleatorio fijo por tarjeta (basado en el id)
  const gradient = useMemo(() => {
    return GRADIENTS[card.id % GRADIENTS.length];
  }, [card.id]);

  const {
    holdProgress,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
  } = useGestureHandler({
    flipped,
    onFlip,
    onResetFlip,
    onNext,
    wrapperRef,
    innerRef,
  });

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    el.style.transition = "transform 0.5s cubic-bezier(0.4,0,0.2,1)";
    el.style.transform = flipped ? "rotateY(180deg)" : "";
  }, [flipped]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    onPointerDown(e.clientY);
    const handleMove = (e: MouseEvent) => onPointerMove(e.clientY);
    const handleUp = () => {
      onPointerUp();
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
    };
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
  };

  const difficultyLabel =
    DIFFICULTY_LABELS[card.difficulty?.toLowerCase()] ?? card.difficulty;

  return (
    <div className="relative w-[340px] h-[220px]" ref={wrapperRef}>
      {/* Cartas detrás */}
      {cardsBehind >= 2 && (
        <div
          className="absolute inset-0 rounded-2xl translate-y-5 scale-[0.94] opacity-40"
          style={{ background: gradient }}
        />
      )}
      {cardsBehind >= 1 && (
        <div
          className="absolute inset-0 rounded-2xl translate-y-2.5 scale-[0.97] opacity-70"
          style={{ background: gradient }}
        />
      )}

      <div
        className="absolute inset-0 touch-none select-none"
        style={{ perspective: "1200px" }}
        onMouseDown={handleMouseDown}
        onTouchStart={(e) => onPointerDown(e.touches[0].clientY)}
        onTouchMove={(e) => {
          e.preventDefault();
          onPointerMove(e.touches[0].clientY);
        }}
        onTouchEnd={onPointerUp}
        onTouchCancel={onPointerCancel}
      >
        <div
          ref={innerRef}
          className="w-full h-full relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* ── Frente — gradiente vivo ── */}
          <div
            className="absolute inset-0 rounded-2xl flex flex-col p-6 shadow-lg"
            style={{
              background: gradient,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {/* Círculo decorativo de fondo */}
            <div
              className="absolute right-4 bottom-4 w-28 h-28 rounded-full opacity-20"
              style={{ background: "rgba(255,255,255,0.4)" }}
            />
            <div
              className="absolute right-10 bottom-10 w-16 h-16 rounded-full opacity-15"
              style={{ background: "rgba(255,255,255,0.4)" }}
            />

            <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest">
              Pregunta
            </span>

            <p className="text-white font-bold text-xl leading-snug flex-1 flex items-center justify-center text-center mt-2">
              {card.question}
            </p>

            <HoldRing progress={holdProgress} />
          </div>

          {/* ── Reverso — blanco limpio ── */}
          <div
            className="absolute inset-0 rounded-2xl bg-white flex flex-col p-6 shadow-lg"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {/* Acento de color arriba */}
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
              style={{ background: gradient }}
            />

            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                Respuesta
              </span>
              {card.difficulty && (
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full text-white"
                  style={{ background: gradient }}
                >
                  {difficultyLabel}
                </span>
              )}
            </div>

            <p className="text-gray-800 font-semibold text-lg leading-snug flex-1 flex items-center justify-center text-center">
              {card.answer}
            </p>

            <HoldRing progress={holdProgress} />
          </div>
        </div>
      </div>
    </div>
  );
}
