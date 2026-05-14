// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['var(--font-arabic)', 'IBM Plex Sans Arabic', 'sans-serif'],
      },
      colors: {
        cream: '#FFF8F5',
        dark: '#1A0A10',
        rose: {
          50: '#fff1f5',
          100: '#ffe4ed',
          200: '#fecdd9',
          300: '#fda4bd',
          400: '#fb7193',
          500: '#f43f6a',
          600: '#E91E8C',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
      },
    },
  },
  plugins: [],
}
export default config
