/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF4E6',   // soft cream
          100: '#FFE9D1',  // lighter cream
          200: '#FFDDB8',  // even lighter cream
          300: '#FFD1A0',  // light cream
          400: '#C85A3F',  // lighter clay red
          500: '#B5432F',  // primary clay red
          600: '#A03A28',  // darker clay red
          700: '#8B3120',  // even darker clay red
          800: '#762819',  // dark clay red
          900: '#611F12',  // darkest clay red
        },
        secondary: {
          50: '#FDF3E7',   // very light cream
          100: '#F9E4D1',  // light cream
          200: '#F5D5BB',  // medium cream
          300: '#F1C6A5',  // cream
          400: '#EDB78F',  // darker cream
          500: '#E9A879',  // medium cream
          600: '#E59963',  // darker cream
          700: '#E18A4D',  // dark cream
          800: '#DD7B37',  // darker cream
          900: '#D96C21',  // darkest cream
        },
        accent: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',  // amber accent
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',  // success green
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        text: {
          primary: '#111827',   // charcoal
          secondary: '#6B7280', // slate
          muted: '#9CA3AF',     // lighter slate
        },
        border: {
          light: '#E5E7EB',     // light gray
          medium: '#D1D5DB',    // medium gray
          dark: '#9CA3AF',      // dark gray
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}; 