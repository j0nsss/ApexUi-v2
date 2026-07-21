import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-base':     '#09090B',
        'bg-surface':  '#18181B',
        'bg-elevated': '#1C1C1F',
        'bg-overlay':  'rgba(24, 24, 27, 0.7)',
        'border-default': '#27272A',
        'border-subtle':  '#1F1F23',
        'border-focus':   '#8B5CF6',
        'text-primary':   '#FAFAFA',
        'text-secondary': '#A1A1AA',
        'text-muted':     '#71717A',
        'text-disabled':  '#3F3F46',
        'accent-violet':       '#8B5CF6',
        'accent-violet-hover': '#7C3AED',
        'accent-emerald':      '#10B981',
        'accent-amber':        '#F59E0B',
        'accent-red':          '#EF4444',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(2.25rem, 5vw, 4.5rem)', { lineHeight: '1.1', fontWeight: '800' }],
        'h1':      ['clamp(1.75rem, 3vw, 2.5rem)',  { lineHeight: '1.2', fontWeight: '700' }],
        'h2':      ['clamp(1.375rem, 2vw, 1.75rem)', { lineHeight: '1.3', fontWeight: '600' }],
        'h3':      ['1rem',  { lineHeight: '1.4', fontWeight: '600' }],
        'body':    ['0.9375rem', { lineHeight: '1.6', fontWeight: '400' }],
        'small':   ['0.8125rem', { lineHeight: '1.5', fontWeight: '400' }],
        'code':    ['0.8125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'label':   ['0.875rem',  { lineHeight: '1.0', fontWeight: '500' }],
      },
      borderRadius: {
        'card':   '12px',
        'inner':  '8px',
        'pill':   '9999px',
        'glass':  '16px',
      },
      boxShadow: {
        'card-hover': `
          0 4px 6px rgba(0, 0, 0, 0.4),
          0 10px 40px rgba(139, 92, 246, 0.12),
          0 0 0 1px rgba(139, 92, 246, 0.15)
        `,
        'glow-violet':  '0 0 20px rgba(139, 92, 246, 0.4)',
        'glow-violet-lg': '0 0 30px rgba(124, 58, 237, 0.5)',
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.4)',
        'glow-amber':   '0 0 20px rgba(245, 158, 11, 0.35)',
        'glow-red':     '0 0 20px rgba(239, 68, 68, 0.35)',
        'glass':        '0 25px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to:   { opacity: '0' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)' },
          '50%':       { boxShadow: '0 0 30px rgba(139, 92, 246, 0.7)' },
        },
      },
      animation: {
        'fade-in':    'fade-in 0.2s ease forwards',
        'scale-in':   'scale-in 0.15s ease forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
