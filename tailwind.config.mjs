/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],

  // Safelist the exact rotate utility classes if you use arbitrary values in code
  safelist: ['rotate-[-1.5deg]', 'rotate-[1.5deg]'],

  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF4E6',
          100: '#FFE9D1',
          200: '#FFDDB8',
          300: '#FFD1A0',
          400: '#C85A3F',
          500: '#B5432F',
          600: '#A03A28',
          700: '#8B3120',
          800: '#762819',
          900: '#611F12',
        },
        secondary: {
          50: '#FDF3E7',
          100: '#F9E4D1',
          200: '#F5D5BB',
          300: '#F1C6A5',
          400: '#EDB78F',
          500: '#E9A879',
          600: '#E59963',
          700: '#E18A4D',
          800: '#DD7B37',
          900: '#D96C21',
        },
        accent: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
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
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        text: {
          primary: '#111827',
          secondary: '#6B7280',
          muted: '#9CA3AF',
        },
        border: {
          light: '#E5E7EB',
          medium: '#D1D5DB',
          dark: '#9CA3AF',
        }
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },

      animation: {
        // existing
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',

        // added for the review carousel
        'marquee-lr': 'marquee-lr var(--speed,28s) linear infinite', // left -> right
        'marquee-rl': 'marquee-rl var(--speed,28s) linear infinite', // right -> left
        float: 'float 6s ease-in-out infinite',
      },

      keyframes: {
        // existing
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

        // added for the review carousel
        'marquee-lr': {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'marquee-rl': {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-6px)' },
        },
      },
    },
  },

  plugins: [require('@tailwindcss/typography')],
};
