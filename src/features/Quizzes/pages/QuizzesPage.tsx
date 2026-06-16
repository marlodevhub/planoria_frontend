import { Card } from "@/components/ui/card";

export function QuizzesPage() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold text-text">Quizzes</h1>
        <p className="text-muted text-sm mt-1">Pon a prueba tu conocimiento</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {
            title: "Quiz Rápido",
            desc: "10 preguntas · 5 min",
            color: "text-emerald-400",
          },
          {
            title: "Examen Completo",
            desc: "50 preguntas · 30 min",
            color: "text-accent",
          },
          {
            title: "Práctica Diaria",
            desc: "5 preguntas · 2 min",
            color: "text-yellow-400",
          },
          {
            title: "Repaso Semanal",
            desc: "20 preguntas · 15 min",
            color: "text-violet-400",
          },
        ].map((quiz) => (
          <Card
            key={quiz.title}
            className="hover:border-accent/50 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-text">{quiz.title}</p>
                <p className={`text-xs font-mono mt-1 ${quiz.color}`}>
                  {quiz.desc}
                </p>
              </div>
              <i
                className="ti ti-arrow-right text-muted text-[20px]"
                aria-hidden="true"
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

