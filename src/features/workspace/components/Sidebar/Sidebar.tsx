import { cn } from '@/lib/utils'
import { useAuthStore } from '@/features/auth/store/authStore'
import { SidebarItem } from './SidebarItem'
import { navItems } from './navItems'

interface SidebarProps {
    collapsed: boolean
    onToggle: () => void
    onNavClick?: () => void
    variant?: 'desktop' | 'tablet'
}

export function Sidebar({
    collapsed,
    onToggle,
    onNavClick,
    variant = 'desktop',
}: SidebarProps) {
    const { user, logout } = useAuthStore()

    const isTablet = variant === 'tablet'
    const isDesktop = variant === 'desktop'

    return (
        <aside
            className={cn(
                'flex flex-col bg-surface border-border transition-all duration-300',
                isTablet
                    ? 'rounded-2xl border shadow-2xl shadow-black/30'
                    : 'border-r h-screen',
                collapsed ? 'w-[64px]' : 'w-[220px]'
            )}
        >
            {/* Logo — solo desktop */}
            {isDesktop && (
                <div
                    className={cn(
                        'flex items-center h-16 px-4 flex-shrink-0',
                        collapsed ? 'justify-center' : 'gap-3'
                    )}
                >
                    <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-black text-sm">P</span>
                    </div>

                    {!collapsed && (
                        <span className="font-bold text-accent text-sm truncate">
                            Planoria
                        </span>
                    )}
                </div>
            )}

            {/* Nav */}
            <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
                {navItems.map((item) => (
                    <SidebarItem
                        key={item.key}
                        item={item}
                        collapsed={collapsed}
                        onClick={onNavClick}
                    />
                ))}
            </nav>

            {/* Footer */}
            <div className="p-2  space-y-0.5 flex-shrink-0">
                {/* User */}
                <div
                    className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl',
                        collapsed && 'justify-center'
                    )}
                >
                    <div className="h-7 w-7 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold flex-shrink-0">
                        {user?.nombre?.[0]?.toUpperCase() ?? 'U'}
                    </div>

                    {!collapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-text text-xs font-medium truncate">
                                {user?.nombre}
                            </p>

                            <p className="text-muted text-xs truncate font-mono">
                                {user?.rol}
                            </p>
                        </div>
                    )}
                </div>

                {/* Logout */}
                <button
                    onClick={logout}
                    className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl w-full',
                        'text-muted hover:text-red-400 hover:bg-red-400/5 transition-all duration-200',
                        collapsed && 'justify-center'
                    )}
                >
                    <i className="ti ti-logout text-[18px]" />

                    <span
                        className={cn(
                            'text-sm transition-all duration-200',
                            collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                        )}
                    >
                        Salir
                    </span>
                </button>

                {/* Toggle — solo desktop */}
                {isDesktop && (
                    <button
                        onClick={onToggle}
                        className={cn(
                            'flex items-center gap-3 px-3 py-2.5 rounded-xl w-full',
                            'text-muted hover:text-text hover:bg-white/5 transition-all duration-200',
                            collapsed && 'justify-center'
                        )}
                    >
                        {/* ICONO */}
                        <div className="w-[18px] h-[18px] flex items-center justify-center">
                            <svg
                                className="transition-all duration-200"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path
                                    d={collapsed ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6"}
                                />
                            </svg>
                        </div>

                        {/* TEXTO */}
                        <span
                            className={cn(
                                'text-sm transition-all duration-200',
                                collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                            )}
                        >
                            Colapsar
                        </span>
                    </button>
                )}
            </div>
        </aside>
    )
}