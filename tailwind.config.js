/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '3xl': '1600px',
      },
      colors: {
        bg: 'var(--color-bg)',
        
        'gradient-1': 'var(--color-gradient-1)',
        'gradient-2': 'var(--color-gradient-2)',
        'gradient-3': 'var(--color-gradient-3)',

        black:          'var(--color-black)',
        'grey-200':     'var(--color-grey-200)',
        white:          'var(--color-white)',
        'white-1':      'var(--color-white-1)',
        'green-1':      'var(--color-green-1)',
        'red-1':        'var(--color-red-1)',
        surface:        'var(--color-surface)',
        border:         'var(--color-border)',
        accent:         'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
        'accent-2': 'var(--color-accent-2)',
        text:           'var(--color-text)',
        muted:          'var(--color-muted)',
      },
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-left': {
          '0%':   { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99,102,241,0.3)' },
          '50%':      { boxShadow: '0 0 40px rgba(99,102,241,0.6)' },
        },
        'swipe-up': {
          '0%':   { opacity: '1', transform: 'translateY(0) rotate(0deg)' },
          '100%': { opacity: '0', transform: 'translateY(-80px) rotate(-5deg)' },
        },
        'swipe-down': {
          '0%':   { opacity: '1', transform: 'translateY(0) rotate(0deg)' },
          '100%': { opacity: '0', transform: 'translateY(80px) rotate(5deg)' },
        },
      },
      animation: {
        'fade-up':    'fade-up 0.6s ease forwards',
        'fade-in':    'fade-in 0.4s ease forwards',
        'slide-left': 'slide-left 0.5s ease forwards',
        'float':      'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'swipe-up':   'swipe-up 0.38s ease forwards',
        'swipe-down': 'swipe-down 0.38s ease forwards',
      },
    },
  },
  plugins: [],
}