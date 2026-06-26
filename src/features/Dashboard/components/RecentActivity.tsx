// features/dashboard/components/RecentActivity.tsx

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, FileText, Book, Layers, Pin, ArrowRight } from "lucide-react";

// ─── Tipos ──────────────────────────────────────────────
interface ActivityItem {
  id: string;
  description: string;
  timeAgo: string;
  type: "quiz" | "set" | "flashcard" | "other";
}

// ─── Datos mock ──────────────────────────────────────────
const ACTIVITY: ActivityItem[] = [
  {
    id: "1",
    description: "Nuevo quiz generado — Quiz: La mediana",
    timeAgo: "hace 1 día",
    type: "quiz",
  },
  {
    id: "2",
    description: "Nuevo set creado — Arte",
    timeAgo: "hace 1 día",
    type: "set",
  },
  {
    id: "3",
    description: "Sesión de flashcards — Varianza y desviación estándar",
    timeAgo: "hace 7 días",
    type: "flashcard",
  },
  {
    id: "4",
    description: "Sesión de flashcards — Varianza y desviación estándar",
    timeAgo: "hace 6 días",
    type: "flashcard",
  },
  {
    id: "5",
    description: "Sesión de flashcards — Varianza y desviación estándar",
    timeAgo: "hace 5 días",
    type: "flashcard",
  },
  {
    id: "6",
    description: "Sesión de flashcards — Varianza y desviación estándar",
    timeAgo: "hace 4 días",
    type: "flashcard",
  },
  {
    id: "7",
    description: "Sesión de flashcards — Varianza y desviación estándar",
    timeAgo: "hace 3 días",
    type: "flashcard",
  },
];

// ─── Configuración de tipos ─────────────────────────────
const TYPE_CONFIG: Record<
  ActivityItem["type"],
  { icon: React.ReactNode; iconBg: string; iconColor: string }
> = {
  quiz: {
    icon: <FileText className="h-4 w-4" />,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  set: {
    icon: <Book className="h-4 w-4" />,
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
  },
  flashcard: {
    icon: <Layers className="h-4 w-4" />,
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
  other: {
    icon: <Pin className="h-4 w-4" />,
    iconBg: "bg-muted/10",
    iconColor: "text-muted-foreground",
  },
};

// ─── Componente ──────────────────────────────────────────
export function RecentActivity() {
  return (
    <Card className="transition-all duration-300 hover:border-primary/20 hover:shadow-md">
      {/* ─── Header ─── */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          Actividad reciente
        </CardTitle>
        <Badge variant="secondary" className="text-xs">
          {ACTIVITY.length}
        </Badge>
      </CardHeader>

      {/* ─── Lista de actividades ─── */}
      <CardContent className="space-y-1">
        {ACTIVITY.map((item, index) => {
          const config = TYPE_CONFIG[item.type];
          return (
            <div key={item.id}>
              <div className="group flex items-center justify-between gap-3 py-2.5 px-2 -mx-2 rounded-lg transition-all duration-200 hover:bg-muted/50 cursor-default">
                {/* ─── Icono y descripción ─── */}
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div
                    className={`p-1 rounded-md shrink-0 ${config.iconBg} ${config.iconColor}`}
                  >
                    {config.icon}
                  </div>
                  <p className="text-sm truncate group-hover:text-primary transition-colors duration-200">
                    {item.description}
                  </p>
                </div>

                {/* ─── Tiempo ─── */}
                <Badge
                  variant="outline"
                  className="text-xs whitespace-nowrap shrink-0"
                >
                  {item.timeAgo}
                </Badge>
              </div>
              {index < ACTIVITY.length - 1 && <Separator className="my-1" />}
            </div>
          );
        })}
      </CardContent>

      {/* ─── Footer ─── */}
      <CardFooter className="border-t pt-4">
        <Button
          variant="link"
          size="sm"
          className="text-xs px-0 h-auto gap-1"
          onClick={() => {
            /* TODO: Ver todas las actividades */
          }}
        >
          Ver todas las actividades
          <ArrowRight className="h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
}
