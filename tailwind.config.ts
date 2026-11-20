import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FFF4EC',
          100: '#FFE4D1',
          200: '#FFC9A3',
          300: '#FFA770',
          400: '#FB8A3E',
          500: '#EF6B1A',
          600: '#D85811',
          700: '#B2440C',
          800: '#83320A',
          900: '#4F1E06',
        },
        ink: {
          50: '#F7F7F8',
          100: '#EEEEF1',
          200: '#DADCE2',
          300: '#B7BAC5',
          400: '#8A8F9F',
          500: '#636879',
          600: '#464A58',
          700: '#2F323C',
          800: '#1E2029',
          900: '#0F1116',
        },
        risk: {
          low: '#F8B978',
          moderate: '#EF6B1A',
          high: '#7A2E09',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,17,22,0.04), 0 1px 3px rgba(15,17,22,0.03)',
      },
      borderRadius: {
        xl: '14px',
        '2xl': '18px',
      },
    },
  },
  plugins: [],
} satisfies Config;
