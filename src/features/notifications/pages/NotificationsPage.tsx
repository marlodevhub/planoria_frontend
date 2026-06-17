import { useNotifications, useUnreadCount, useMarkAsRead, useMarkAllAsRead } from '../hooks'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const typeStyles: Record<string, string> = {
  study_reminder: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  achievement: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  course_update: 'bg-green-500/10 text-green-400 border-green-500/30',
  quiz_result: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  system: 'bg-muted text-muted-foreground border-border',
}

function formatTime(iso: string) {
  const d = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  if (diffMin < 1) return 'Ahora'
  if (diffMin < 60) return `Hace ${diffMin}m`
  const diffHr = Math.floor(diffMin / 60)
  if (diffHr < 24) return `Hace ${diffHr}h`
  const diffDay = Math.floor(diffHr / 24)
  if (diffDay < 7) return `Hace ${diffDay}d`
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
}

export function NotificationsPage() {
  const { data, isLoading } = useNotifications()
  const { data: unread } = useUnreadCount()
  const markAsRead = useMarkAsRead()
  const markAllAsRead = useMarkAllAsRead()

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notificaciones</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {unread?.unreadCount ?? 0} sin leer
          </p>
        </div>
        {unread && unread.unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={() => markAllAsRead.mutate()}>
            Marcar todo como leído
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : data && data.notifications.length > 0 ? (
        <div className="space-y-2">
          {data.notifications.map((n) => (
            <Card
              key={n.id}
              className={`p-4 flex items-start gap-3 transition-all duration-200 cursor-pointer hover:bg-white/5 ${
                !n.isRead ? 'border-l-2 border-l-primary' : ''
              }`}
              onClick={() => { if (!n.isRead) markAsRead.mutate(n.id) }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge
                    variant="outline"
                    className={`text-[10px] px-1.5 py-0 ${typeStyles[n.type] ?? typeStyles.system}`}
                  >
                    {n.type.replace('_', ' ')}
                  </Badge>
                  {!n.isRead && <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />}
                </div>
                <p className="text-foreground text-sm font-medium">{n.title}</p>
                <p className="text-muted-foreground text-xs mt-0.5 line-clamp-2">{n.message}</p>
              </div>
              <span className="text-muted-foreground text-[10px] whitespace-nowrap flex-shrink-0">
                {formatTime(n.createdAt)}
              </span>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 flex flex-col items-center justify-center text-center">
          <div className="text-4xl mb-3 opacity-30">🔔</div>
          <p className="text-muted-foreground">No hay notificaciones aún.</p>
        </Card>
      )}
    </div>
  )
}
