/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  safelist: ['rotate-[-1.5deg]', 'rotate-[1.5deg]'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        accent: {
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        glow: {
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
        },
        dark: {
          800: '#0f0f23',
          850: '#0a0a1a',
          900: '#050510',
          950: '#020208',
        },
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },

      animation: {
        'fade-in':       'fadeIn 0.5s ease-in-out',
        'slide-up':      'slideUp 0.5s ease-out',
        'pulse-glow':    'pulseGlow 3s ease-in-out infinite',
        'float':         'float 6s ease-in-out infinite',
        'marquee-lr':    'marquee-lr var(--speed,28s) linear infinite',
        'marquee-rl':    'marquee-rl var(--speed,28s) linear infinite',
        'spin-slow':     'spin 20s linear infinite',
        'border-spin':   'borderSpin 4s linear infinite',
      },

      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%':      { opacity: '0.8', transform: 'scale(1.08)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-8px)' },
        },
        'marquee-lr': {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'marquee-rl': {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        borderSpin: {
          '0%':   { '--angle': '0deg' },
          '100%': { '--angle': '360deg' },
        },
      },
    },
  },

  plugins: [require('@tailwindcss/typography')],
};
