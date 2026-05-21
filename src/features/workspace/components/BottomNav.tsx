import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { navItems } from './Sidebar/navItems'

export function BottomNav() {
    return (
        <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-3 py-2 bg-surface border border-border rounded-2xl shadow-2xl shadow-black/40 flex items-center gap-1">
            {navItems.map((item) => (
                <NavLink
                    key={item.key}
                    to={item.path}
                    end={item.key === 'home'}
                    className={({ isActive }) => cn(
                        'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[48px]',
                        isActive
                            ? 'bg-accent/15 text-accent'
                            : 'text-muted hover:text-text hover:bg-white/5'
                    )}
                >
                    {({ isActive }) => (
                        <>
                            <i
                                className={cn('ti', item.icon, 'text-[20px]', isActive && 'scale-110')}
                                style={{ transition: 'transform 0.2s' }}
                                aria-hidden="true"
                            />
                            <span className="text-[10px] font-medium leading-none">{item.shortLabel}</span>
                        </>
                    )}
                </NavLink>
            ))}
        </nav>
    )
}