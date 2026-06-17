// features/quizzes/pages/QuizzesPage.tsx

import { Card } from "@/components/ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Datos de ejemplo - reemplazar con datos reales de tu API/store
const QUIZZES = [
  {
    id: 1,
    title: "Quiz Rápido",
    description: "10 preguntas · 5 min",
    questions: 10,
    duration: 5,
    difficulty: "Fácil",
    category: "Matemáticas",
    status: "disponible",
    icon: "ti-bolt",
    color: "bg-blue-50 border-blue-200 text-blue-600",
  },
  {
    id: 2,
    title: "Examen Completo",
    description: "50 preguntas · 30 min",
    questions: 50,
    duration: 30,
    difficulty: "Difícil",
    category: "Física",
    status: "disponible",
    icon: "ti-file-text",
    color: "bg-purple-50 border-purple-200 text-purple-600",
  },
  {
    id: 3,
    title: "Práctica Diaria",
    description: "5 preguntas · 2 min",
    questions: 5,
    duration: 2,
    difficulty: "Fácil",
    category: "Estadística",
    status: "completado",
    icon: "ti-book",
    color: "bg-green-50 border-green-200 text-green-600",
  },
  {
    id: 4,
    title: "Repaso Semanal",
    description: "20 preguntas · 15 min",
    questions: 20,
    duration: 15,
    difficulty: "Media",
    category: "Historia",
    status: "disponible",
    icon: "ti-rotate",
    color: "bg-orange-50 border-orange-200 text-orange-600",
  },
  {
    id: 5,
    title: "Desafío de Álgebra",
    description: "15 preguntas · 10 min",
    questions: 15,
    duration: 10,
    difficulty: "Media",
    category: "Matemáticas",
    status: "bloqueado",
    icon: "ti-lock",
    color: "bg-gray-50 border-gray-200 text-gray-400",
  },
  {
    id: 6,
    title: "Quiz de Inglés",
    description: "8 preguntas · 4 min",
    questions: 8,
    duration: 4,
    difficulty: "Fácil",
    category: "Inglés",
    status: "disponible",
    icon: "ti-world",
    color: "bg-cyan-50 border-cyan-200 text-cyan-600",
  },
  {
    id: 7,
    title: "Álgebra Lineal",
    description: "25 preguntas · 20 min",
    questions: 25,
    duration: 20,
    difficulty: "Difícil",
    category: "Matemáticas",
    status: "disponible",
    icon: "ti-math",
    color: "bg-indigo-50 border-indigo-200 text-indigo-600",
  },
  {
    id: 8,
    title: "Historia del Arte",
    description: "12 preguntas · 8 min",
    questions: 12,
    duration: 8,
    difficulty: "Media",
    category: "Historia",
    status: "completado",
    icon: "ti-palette",
    color: "bg-pink-50 border-pink-200 text-pink-600",
  },
];

const DIFFICULTY_COLORS: Record<string, string> = {
  Fácil: "bg-emerald-100 text-emerald-700",
  Media: "bg-amber-100 text-amber-700",
  Difícil: "bg-rose-100 text-rose-700",
};

const STATUS_LABELS: Record<string, string> = {
  disponible: "Disponible",
  completado: "Completado",
  bloqueado: "Bloqueado",
};

const STATUS_COLORS: Record<string, string> = {
  disponible: "bg-accent/10 text-accent",
  completado: "bg-emerald-100 text-emerald-700",
  bloqueado: "bg-gray-100 text-gray-500",
};

export function QuizzesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("todos");

  const categories = ["todos", ...new Set(QUIZZES.map((q) => q.category))];
  const difficulties = ["todos", ...new Set(QUIZZES.map((q) => q.difficulty))];

  const filteredQuizzes = QUIZZES.filter((quiz) => {
    const matchCategory =
      selectedCategory === "todos" || quiz.category === selectedCategory;
    const matchDifficulty =
      selectedDifficulty === "todos" || quiz.difficulty === selectedDifficulty;
    return matchCategory && matchDifficulty;
  });

  const availableQuizzes = QUIZZES.filter(
    (q) => q.status === "disponible",
  ).length;

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <i className="ti ti-notes text-accent text-2xl" />
            Quizzes
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Pon a prueba tu conocimiento con estos quizzes
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/80 transition-all duration-300 shadow-sm shadow-accent/20">
            <i className="ti ti-plus text-sm" aria-hidden="true" />
            Nuevo Quiz
          </button>
          <span className="text-xs text-muted-foreground bg-bg px-3 py-1.5 rounded-full flex items-center gap-1">
            <i
              className="ti ti-circle-check text-accent text-xs"
              aria-hidden="true"
            />
            {availableQuizzes} disponibles
          </span>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-2 p-4 bg-white rounded-xl border border-border">
        <div className="flex items-center gap-1.5 mr-2">
          <i
            className="ti ti-filter text-muted-foreground text-sm"
            aria-hidden="true"
          />
          <span className="text-xs font-medium text-muted-foreground">
            Filtros:
          </span>
        </div>

        <span className="text-[10px] font-medium text-muted-foreground">
          Categoría:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "px-3 py-1 rounded-full text-[11px] font-medium transition-all duration-200",
              selectedCategory === cat
                ? "bg-accent text-accent-foreground shadow-sm shadow-accent/20"
                : "bg-bg text-muted-foreground hover:bg-accent/10",
            )}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}

        <div className="w-px h-5 bg-border mx-1" />

        <span className="text-[10px] font-medium text-muted-foreground">
          Dificultad:
        </span>
        {difficulties.map((diff) => (
          <button
            key={diff}
            onClick={() => setSelectedDifficulty(diff)}
            className={cn(
              "px-3 py-1 rounded-full text-[11px] font-medium transition-all duration-200",
              selectedDifficulty === diff
                ? "bg-accent text-accent-foreground shadow-sm shadow-accent/20"
                : "bg-bg text-muted-foreground hover:bg-accent/10",
            )}
          >
            {diff.charAt(0).toUpperCase() + diff.slice(1)}
          </button>
        ))}

        {(selectedCategory !== "todos" || selectedDifficulty !== "todos") && (
          <button
            onClick={() => {
              setSelectedCategory("todos");
              setSelectedDifficulty("todos");
            }}
            className="text-[11px] text-muted-foreground hover:text-accent transition-colors ml-auto"
          >
            <i className="ti ti-x text-sm" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Grid de Quizzes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredQuizzes.map((quiz) => {
          const isBlocked = quiz.status === "bloqueado";
          const isCompleted = quiz.status === "completado";

          return (
            <Card
              key={quiz.id}
              className={cn(
                "p-5 border border-border hover:border-accent/40 transition-all duration-300 group",
                isBlocked && "opacity-60 cursor-not-allowed",
                isCompleted && "border-emerald-200 bg-emerald-50/30",
                !isBlocked &&
                  !isCompleted &&
                  "hover:shadow-lg hover:shadow-accent/5 cursor-pointer",
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "rounded-xl p-2.5 text-lg border transition-all duration-300",
                      quiz.color,
                      !isBlocked &&
                        !isCompleted &&
                        "group-hover:scale-110 group-hover:shadow-md",
                    )}
                  >
                    <i
                      className={`ti ${quiz.icon} text-xl`}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground text-sm">
                        {quiz.title}
                      </p>
                      {isCompleted && (
                        <i
                          className="ti ti-check-circle text-emerald-500 text-sm"
                          aria-hidden="true"
                        />
                      )}
                      {isBlocked && (
                        <i
                          className="ti ti-lock text-gray-400 text-sm"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <p className="text-muted-foreground text-xs mt-0.5">
                      {quiz.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span
                        className={cn(
                          "text-[10px] px-2 py-0.5 rounded-full font-medium",
                          DIFFICULTY_COLORS[quiz.difficulty],
                        )}
                      >
                        {quiz.difficulty}
                      </span>
                      <span className="text-[10px] text-muted-foreground bg-bg px-2 py-0.5 rounded-full">
                        {quiz.category}
                      </span>
                    </div>
                  </div>
                </div>
                <span
                  className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full font-medium",
                    STATUS_COLORS[quiz.status],
                  )}
                >
                  {STATUS_LABELS[quiz.status]}
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <i className="ti ti-list text-xs" aria-hidden="true" />
                    {quiz.questions}
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="ti ti-clock text-xs" aria-hidden="true" />
                    {quiz.duration} min
                  </span>
                </div>
                {!isBlocked && !isCompleted && (
                  <button className="text-xs font-medium text-accent hover:text-accent/80 transition-colors flex items-center gap-1 group">
                    Comenzar
                    <i
                      className="ti ti-arrow-right text-xs group-hover:translate-x-0.5 transition-transform"
                      aria-hidden="true"
                    />
                  </button>
                )}
                {isCompleted && (
                  <button className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1">
                    Ver resultados
                    <i className="ti ti-chart-bar text-xs" aria-hidden="true" />
                  </button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-border rounded-xl p-4 text-center hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-200">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-foreground">
            <i
              className="ti ti-files text-accent text-2xl"
              aria-hidden="true"
            />
            {QUIZZES.length}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Total quizzes</p>
        </div>
        <div className="bg-white border border-border rounded-xl p-4 text-center hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-200">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-primary">
            <i
              className="ti ti-circle-check text-primary text-2xl"
              aria-hidden="true"
            />
            {availableQuizzes}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Disponibles</p>
        </div>
        <div className="bg-white border border-border rounded-xl p-4 text-center hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-200">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-emerald-500">
            <i
              className="ti ti-checkbox text-emerald-500 text-2xl"
              aria-hidden="true"
            />
            {QUIZZES.filter((q) => q.status === "completado").length}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Completados</p>
        </div>
        <div className="bg-white border border-border rounded-xl p-4 text-center hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-200">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-accent">
            <i
              className="ti ti-progress text-accent text-2xl"
              aria-hidden="true"
            />
            {Math.round(
              (QUIZZES.filter((q) => q.status === "completado").length /
                QUIZZES.length) *
                100,
            )}
            %
          </div>
          <p className="text-xs text-muted-foreground mt-1">Progreso</p>
        </div>
      </div>
    </div>
  );
}
