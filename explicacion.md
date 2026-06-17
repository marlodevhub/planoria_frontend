# Resumen de cambios — Planoria Frontend

## Objetivo
Hacer que los 20 controladores del backend funcionen correctamente desde el frontend, arreglando errores de ruteo, tipos, mapeo de datos y UI faltante. **Todo se resolvió exclusivamente en el frontend**, sin tocar el backend.

---

## 1. Arquitectura general

- **Feature‑based** — cada funcionalidad tiene su carpeta con `types/`, `constants/`, `services/`, `hooks/`, `pages/`, `components/`.
- **React Query + Axios** — baseURL `http://localhost:7075/api`, interceptor JWT.
- **DTOs en camelCase** — los tipos del frontend mapean exactamente los campos JSON que devuelve el backend.
- **Tailwind + shadcn/ui + animate-fade-up** — transiciones consistentes en todas las páginas.

---

## 2. Flashcard / Study Session

### Problema
El DeckDetailPage mostraba una lista de tarjetas estática. El usuario quería poder **estudiar** interactivamente.

### Solución
- **`DeckDetailPage.tsx`** fue reemplazado por el flujo de estudio: al hacer clic en un mazo se navega a `/workspace/flashcards/:deckId` y se entra directo al modo estudio.
- **`StudySessionPage.tsx`** — página interactiva con:
  - Volteo de tarjeta (clic en la carta).
  - Botones **"La sé"** / **"No me la sé"**.
  - Barra de progreso (card actual / total).
  - Pantalla de resumen al terminar (aciertos, tiempo, etc.).
- **`useStudySession.ts`** — hook que maneja el ciclo de vida de la sesión:
  1. `POST /study/sessions` — crea sesión
  2. `GET /study/sessions/{id}/next` — obtiene siguiente carta
  3. `POST /study/sessions/{id}/answer` — envía respuesta
  4. `POST /study/sessions/{id}/end` — finaliza sesión
- **API routes agregadas** en `flashcards/constants/api.ts`:
  - `STUDY_SESSION` → `/study/sessions`
  - `STUDY_NEXT_CARD` → `/study/sessions/{id}/next`
  - `STUDY_SUBMIT_ANSWER` → `/study/sessions/{id}/answer`
  - `STUDY_END_SESSION` → `/study/sessions/{id}/end`
- **`flashcardService.ts`**: se agregaron `startSession`, `getNextCard`, `submitAnswer`, `endSession`.

### Fixes de rutas
- `CARDS_BY_DECK` → `GET /decks/{id}/cards`
- `CREATE_CARD` → `POST /decks/{id}/cards`
- Progress/mastery → `/progress/flashcards/decks/{id}*`
- Mapeo de `BackendFlashcardResponse` con `lastReviewedAt`, `repetitionCount`, `easeFactor`, `masteredCount`.

---

## 3. Cronograma (Calendario)

### Problema
Los tipos y rutas no coincidían con el backend. El backend espera `title`, `startDateTime`, `endDateTime`, `courseIds: number[]`.

### Solución
- **DTOs corregidos**: `title` (no `titulo`), `startDateTime`/`endDateTime` (ISO strings), `courseIds: number[]`. Se eliminaron `color`, `descripcion`, `tipoRepeticion`.
- **API routes corregidas**:
  - `MONTH_VIEW` → `/schedules/calendar/month`
  - Se agregaron `RANGE`, `MARK_COMPLETE`, `MARK_INCOMPLETE`, `BULK_COMPLETE`, `RECURRING_BY_ID`.
- **`cronogramaService.ts`**: `getMonthView` extrae `days` del wrapper `{ Year, Month, Days }`.
- **`useToggleComplete`**: firma corregida a `{ id, completed }`.
- **CronogramaPage**: construye ISO `startDateTime`/`endDateTime` desde el formulario, envía `courseIds: []`, puntos en el calendario usan `courseColorMap` desde cursos, badge del sidebar con punto de color.

---

## 4. User (Perfil)

### Problema
Las rutas de usuario usaban `/users/…` pero el backend usa ruteo case‑insensitive con `/User/…`.

### Solución
- **`USER_API_ROUTES`**: cambiado de `/users/…` a `/User/…`.
- **ProfilePage** (`/workspace/perfil`): Tabs (Perfil, Preferencias, Notificaciones, Cuenta), editor de perfil, selectores de tema/idioma/zona horaria, toggles de notificaciones, botones de exportar/desactivar/eliminar cuenta.
- **`useDeactivateAccount`**: hook creado y exportado.
- **Ruta agregada**: `ROUTES.PERFIL` + Route + sidebar nav item.
- **NotificationsPage** (`/workspace/notificaciones`): lista con scroll infinito, marcar como leído, estado vacío, timestamps relativos.

---

## 5. Quizzes

### Problema
- El flujo de creación no coincidía con la API.
- Había botones duplicados ("Crear quiz").
- La pantalla de resultado no permitía reintentar.

### Solución
- **`CreateQuizRequest`**: campos corregidos a `title`, `description`, `courseId`, `timeLimitMinutes`, `passingScore`, `shuffleQuestions`, `shuffleOptions`, `attemptsAllowed`.
- **`useCreateQuiz`**: hook creado.
- **`GenerateQuizModal.tsx`**: modal de 2 pasos (subir PDF → configurar tema/dificultad/idioma). Se eliminó el botón "Crear quiz" duplicado. Ahora QuizzesPage solo tiene **"Generar desde PDF"**.
- **UI pulida**: grid `gap-3`, borde izquierdo coloreado, icono cuadrado con color del curso, hover shadow, mejor padding, empty state con icono gradiente.
- **Resultado de quiz**: botón **"Intentar de nuevo"** que resetea el estado local (reintentos infinitos).
- **QuizzesPage.tsx**: rediseñada para coincidir exactamente con el diseño de FlashcardsPage:
  - Mismo skeleton con `animationDelay` escalonado.
  - Mismas tarjetas `p-0` con borde izquierdo de 3px, dot de color, hover con sombra.
  - Mismo patrón de subtítulo dinámico ("Cargando...", contador, o mensaje inicial).
  - Mismo estado de error con `bg-destructive/5`.
  - Mismo empty state con icono + sparkle badge.

---

## 6. Progresos

### Problema
Las rutas de progreso apuntaban a endpoints que no existen o devuelven data con estructura distinta.

### Solución
- **API routes**: split en `/progress/flashcards`, `/progress/quizzes`, agregado `COURSE_EXAM_PROGRESS`.
- **`BackendFlashcardProgress`**: tipo con `masteredCount`.
- **`progresosService.ts`**: `getGlobalStats()` llama 3 endpoints en paralelo:
  - `/performance/global` → stats globales
  - `/dashboard/overview` → streakDays, etc.
  - `/courses` → conteo de cursos activos
- **Mapeo**: `totalCardsMastered`, `totalReviews`, `totalQuizzesPassed`, `averageQuizScore`, `totalStudySessions`.
- **ProgresosPage**: StatCards con íconos por color, barras de progreso con gradientes, tabla de quizzes con colores de score, grid de logros con candado/desbloqueado, estados vacíos.
- **Actividad semanal** (`mapWeeklyTrend`):
  - **Orden Lun→Dom**: el backend devuelve la semana empezando en domingo (DayOfWeek .NET). Se reordena con `days.slice(1) + days.slice(0,1)`.
  - **Etiquetas fijas**: `['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom']` en vez de `toLocaleDateString`.
  - **cardsReviewed y quizzesCompleted**: se calculan en base a `day.activities` reales (antes siempre 0).

---

## 7. Dashboard

### Problema
El componente `UpcomingExam` solo mostraba exámenes de cursos, no los eventos del cronograma.

### Solución
- Ahora también fetchea `/schedules/range` (próximos 14 días) y mergea con los exámenes de cursos, ordenando por fecha más próxima.

---

## 8. Estilo global

- **`WorkspaceLayout.tsx`**: se agregaron círculos decorativos sutiles en desktop, tablet y mobile para reducir el fondo blanco sin usar assets.
- **`AppRouter.tsx`**: se eliminó una `s` extraña en la línea 23.
- **`npx tsc --noEmit`** → **0 errores**.
- **`npx vite build`** → **0 errores**.

---

## 9. TypeScript

- Se corrigió el cast de `zodResolver` y se cambiaron campos opcionales a `default('')` para evitar errores de compilación.

---

## Conclusión

Todos los controladores del backend ahora tienen su contraparte funcional en el frontend. La app compila y buildea sin errores. Los datos viajan con los tipos y rutas correctas, y la UI es consistente entre todas las secciones.
