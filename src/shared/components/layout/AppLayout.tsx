import { Outlet } from 'react-router-dom'
import { useUIStore } from '@/store/uiStore'
import { useAuthStore } from '@/features/auth/store/authStore'
import { cn } from '@/lib/utils'

export function AppLayout() {
    const { sidebarOpen, toggleSidebar } = useUIStore()
    const { user, logout } = useAuthStore()

    return (
        <div className="flex h-screen bg-bg overflow-hidden">
            {/* Sidebar */}
            <aside
                className={cn(
                    'flex flex-col border-r border-border bg-surface',
                    'transition-all duration-300',
                    sidebarOpen ? 'w-60' : 'w-16'
                )}
            >
                <div className="flex items-center gap-3 px-4 h-16 border-b border-border">
                    <div className="h-8 w-8 rounded-lg bg-accent flex-shrink-0" />
                    {sidebarOpen && (
                        <span className="font-semibold text-text truncate">MyApp</span>
                    )}
                </div>

                <nav className="flex-1 p-2 space-y-1">
                    <SidebarItem icon="⊞" label="Dashboard" open={sidebarOpen} />
                    <SidebarItem icon="◎" label="Reportes" open={sidebarOpen} />
                    <SidebarItem icon="◈" label="Usuarios" open={sidebarOpen} />
                </nav>

                <div className="p-2 border-t border-border">
                    <SidebarItem icon="⇥" label="Salir" open={sidebarOpen} onClick={logout} />
                </div>
            </aside>

            {/* Main */}
            <div className="flex flex-col flex-1 min-w-0">
                {/* Header */}
                <header className="flex items-center gap-4 px-6 h-16 border-b border-border bg-surface">
                    <button
                        onClick={toggleSidebar}
                        className="text-muted hover:text-text transition-colors"
                    >
                        ☰
                    </button>
                    <div className="flex-1" />
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-medium">
                            {user?.name?.[0]?.toUpperCase() ?? 'U'}
                        </div>
                        <span className="text-sm text-muted font-mono">{user?.email}</span>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

function SidebarItem({
    icon, label, open, onClick,
}: {
    icon: string
    label: string
    open: boolean
    onClick?: () => void
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                'flex items-center gap-3 w-full rounded-lg px-3 py-2',
                'text-muted hover:text-text hover:bg-white/5 transition-all duration-200',
                !open && 'justify-center'
            )}
        >
            <span className="text-base flex-shrink-0">{icon}</span>
            {open && <span className="text-sm truncate">{label}</span>}
        </button>
    )
}