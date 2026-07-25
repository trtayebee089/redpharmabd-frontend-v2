/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        display: [
          'Plus Jakarta Sans',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'sans-serif',
        ],
      },
      colors: {
        /* RedPharma brand red: identity, primary CTAs, offers, cart badge. */
        primary: {
          50: '#fef2f3',
          100: '#fee2e4',
          200: '#fecacd',
          300: '#fca5ab',
          400: '#f87179',
          500: '#ef444e',
          600: '#dc2632',
          700: '#b91c26',
          800: '#991b23',
          900: '#7f1d24',
          950: '#450a0e',
        },
        /* Health green: add-to-cart, trust, stock and wellbeing accents. */
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        tealbrand: '#0f766e',
        ink: '#151719',
        'ink-soft': '#24272b',
        canvas: '#f7f7f8',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      boxShadow: {
        soft: '0 14px 38px rgba(21, 23, 25, 0.08)',
        lift: '0 20px 50px rgba(21, 23, 25, 0.14)',
        card: '0 1px 2px rgba(21, 23, 25, 0.04), 0 10px 28px -14px rgba(21, 23, 25, 0.18)',
        hover: '0 26px 60px -26px rgba(220, 38, 50, 0.30)',
        glow: '0 30px 90px -32px rgba(21, 23, 25, 0.7)',
        rail: '0 18px 44px -28px rgba(21, 23, 25, 0.4)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translate3d(0, 18px, 0)' },
          to: { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -10px, 0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        float: 'float 7s ease-in-out infinite',
        marquee: 'marquee 34s linear infinite',
      },
    },
  },
  plugins: [],
}
