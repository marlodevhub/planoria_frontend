import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { NavItem } from "./navItems";

interface SidebarItemProps {
  item: NavItem;
  collapsed: boolean;
  onClick?: () => void;
}

export function SidebarItem({ item, collapsed, onClick }: SidebarItemProps) {
  return (
    <NavLink
      to={item.path}
      end={item.key === "home"}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
          isActive
            ? "bg-primary/15 text-primary"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
          collapsed && "justify-center px-2",
        )
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r-full" />
          )}
          <i
            className={`ti ${item.icon} text-[18px] flex-shrink-0`}
            aria-hidden="true"
          />
          {!collapsed && (
            <span className="text-sm font-medium truncate">{item.label}</span>
          )}
          {collapsed && (
            <div className="absolute left-full ml-3 px-2 py-1 bg-card border border-border rounded-lg text-xs text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50 shadow-lg">
              {item.label}
            </div>
          )}
        </>
      )}
    </NavLink>
  );
}

