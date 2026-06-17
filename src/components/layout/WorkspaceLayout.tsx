import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/features/workspace/components/Sidebar/Sidebar";
import { BottomNav } from "@/features/workspace/components/BottomNav";

type ScreenSize = "mobile" | "tablet" | "desktop";

function useScreenSize(): ScreenSize {
  const [size, setSize] = useState<ScreenSize>("desktop");

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 768) setSize("mobile");
      else if (w < 1024) setSize("tablet");
      else setSize("desktop");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

export function WorkspaceLayout() {
  const screen = useScreenSize();
  const [collapsed, setCollapsed] = useState(false);
  const [tabletOpen, setTabletOpen] = useState(false);

  useEffect(() => {
    if (screen !== "tablet") return;
    const handler = (e: MouseEvent) => {
      const sidebar = document.getElementById("tablet-sidebar");
      const menuBtn = document.getElementById("tablet-menu-btn");
      if (
        sidebar &&
        !sidebar.contains(e.target as Node) &&
        !menuBtn?.contains(e.target as Node)
      ) {
        setTabletOpen(false);
      }
    };
    if (tabletOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [tabletOpen, screen]);

  if (screen === "mobile") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="flex items-center px-4 h-14 flex-shrink-0 relative z-10">
          <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-black text-xs">
              P
            </span>
          </div>
          <span className="font-bold text-primary text-sm ml-2">Planoria</span>
        </header>

        <main className="flex-1 overflow-y-auto p-4 pb-28 relative">
          <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/[0.02]" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-indigo-500/[0.02]" />
            <div className="absolute top-1/3 right-1/4 h-32 w-32 rounded-full bg-purple-500/[0.015]" />
          </div>
          <Outlet />
        </main>

        <BottomNav />
      </div>
    );
  }

  if (screen === "tablet") {
    return (
      <div className="min-h-screen bg-gradient-to-tr from-[var(--gradient-1)] via-[var(--gradient-2)] to-[var(--gradient-3)] flex flex-col">
        <header className="flex items-center gap-3 px-4 h-14 flex-shrink-0">
          <button
            id="tablet-menu-btn"
            onClick={() => setTabletOpen((o) => !o)}
            className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-white/5"
          >
            <i className="ti ti-menu-2 text-[20px]" aria-hidden="true" />
          </button>
          <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-black text-xs">
              P
            </span>
          </div>
          <span className="font-bold text-primary text-sm">Planoria</span>
        </header>

        {tabletOpen && (
          <div className="fixed inset-0 z-40 flex" style={{ top: "56px" }}>
            <div id="tablet-sidebar" className="m-3">
              <Sidebar
                variant="tablet"
                collapsed={false}
                onToggle={() => setTabletOpen(false)}
                onNavClick={() => setTabletOpen(false)}
              />
            </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-5 relative">
          <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/[0.025]" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-indigo-500/[0.02]" />
          </div>
          <Outlet />
        </main>
      </div>
    );
  }

  // Desktop
  return (
    <div className="flex h-screen bg-gradient-to-tr from-[var(--gradient-1)] via-[var(--gradient-2)] to-[var(--gradient-3)] overflow-hidden">
      <Sidebar
        variant="desktop"
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />

      <div className="flex flex-col flex-1 min-w-0">
        <header className="flex items-center gap-4 px-6 h-16 flex-shrink-0">
          <div className="flex-1" />
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
            <i className="ti ti-bell text-[18px]" aria-hidden="true" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 relative">
          <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/[0.025]" />
            <div className="absolute top-1/2 left-1/4 h-48 w-48 rounded-full bg-indigo-500/[0.015]" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-purple-500/[0.02]" />
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
