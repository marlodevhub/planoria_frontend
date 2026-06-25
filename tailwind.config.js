/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // ─── Colores ────────────────────────────────────
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
        // ─── Colores de estado (adicionales) ────────
        success: {
          DEFAULT: "var(--color-success)",
          foreground: "var(--color-success-foreground)",
        },
        error: {
          DEFAULT: "var(--color-error)",
          foreground: "var(--color-error-foreground)",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          foreground: "var(--color-warning-foreground)",
        },
        info: {
          DEFAULT: "var(--color-info)",
          foreground: "var(--color-info-foreground)",
        },
      },

      // ─── Bordes ────────────────────────────────────
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      // ─── Fuentes ──────────────────────────────────
      fontFamily: {
        sans: ["Sora", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },

      // ─── Animaciones ──────────────────────────────
      keyframes: {
        // Shadcn/ui
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Personalizadas
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-left": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },

      animation: {
        // Shadcn/ui
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Personalizadas
        "fade-up": "fade-up 0.4s ease-out forwards",
        "fade-in": "fade-in 0.3s ease-out forwards",
        "slide-left": "slide-left 0.3s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        "scale-in": "scale-in 0.3s ease-out forwards",
        "slide-down": "slide-down 0.3s ease-out forwards",
      },

      // ─── Breakpoints (responsive) ──────────────────
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },

      // ─── Espaciado adicional ──────────────────────
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },

      // ─── Opacidades ──────────────────────────────
      opacity: {
        15: "0.15",
        85: "0.85",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
