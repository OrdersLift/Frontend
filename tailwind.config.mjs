/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── OrdersLift 2.0 semantic tokens ─────────────────────────────
        // Ink on warm paper, with burnished gold as the one accent — the
        // colour of the review star, which is what this agency sells.
        // Values live as CSS vars in global.css so dark mode is one flip.
        paper: 'rgb(var(--paper) / <alpha-value>)',   // page background
        band:  'rgb(var(--band) / <alpha-value>)',    // alternating section
        raise: 'rgb(var(--raise) / <alpha-value>)',   // cards sitting on paper
        ink:   'rgb(var(--ink) / <alpha-value>)',     // headings
        body:  'rgb(var(--body) / <alpha-value>)',    // paragraphs
        muted: 'rgb(var(--muted) / <alpha-value>)',   // captions, labels
        rule:  'rgb(var(--rule) / <alpha-value>)',    // hairlines
        gold:  'rgb(var(--gold) / <alpha-value>)',    // brand accent
        // Semantic only — never decorative. Borrowed from Google's own
        // listing UI so the profile mockups read as authentic.
        gain:  'rgb(var(--gain) / <alpha-value>)',    // "Open", after, up
        loss:  'rgb(var(--loss) / <alpha-value>)',    // "Closed", before, down
        star:  '#fbbc04',                             // Google review star
        gblue: '#1a73e8',                             // Google action blue

        // Brand orange — the primary voice of the site.
        primary: {
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        // Yellow — the secondary voice. `secondary` is an alias kept for
        // markup that already referenced it.
        accent: {
          50:  '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        secondary: {
          50:  '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        // Amber — the warm mid-tone that bridges orange and yellow.
        glow: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Warm off-whites used for alternating light-mode sections.
        cream: {
          50:  '#fffdfa',
          100: '#fff8f0',
          200: '#fff1e2',
          300: '#ffe7cd',
        },
        // Dark mode surfaces — true blacks, not navy.
        dark: {
          800: '#141414',
          850: '#0a0a0a',
          900: '#000000',
          950: '#000000',
        },
      },

      fontFamily: {
        // Archivo carries a width axis — `font-display` is set narrow and
        // heavy in global.css, which is how restaurant signage and menu
        // boards are actually lettered.
        display: ['Archivo', 'system-ui', 'sans-serif'],
        sans:    ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        // Mono is for data — ratings, counts, deltas, section markers.
        // These are numbers off a dashboard, so they get typed like it.
        mono:    ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
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
        'rise':          'rise 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
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
        rise: {
          '0%':   { transform: 'translateY(14px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
      },
    },
  },

  plugins: [require('@tailwindcss/typography')],
};
