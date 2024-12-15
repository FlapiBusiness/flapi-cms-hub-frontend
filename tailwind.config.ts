import { _light } from '#tailwind-config/theme/fontWeight'
import type { Config } from 'tailwindcss'

/** @type {import('tailwindcss').Config} */
export default <Partial<Config>>{
  content: ['./src-nuxt/pages/**/*.vue', './src-nuxt/components/**/*.vue', './src-nuxt/layouts/**/*.vue', './app.vue'],
  theme: {
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px',
    },
    fontFamily: {
      sans: 'Poppins, Rubik',
      serif: 'Poppins, Rubik',
    },
    extend: {
      colors: {
        dark: '#131A20',
        'dark-red': '#C0172A',
        disabled: '#303A4B',
        grey: {
          200: '#222B39',
          300: '#454D5E',
          400: '#35424D',
          500: '#1B232D',
          600: '#3D4E5C',
          700: '#101623',
        },
        light: {
          100: '#F5F4FB',
          300: '#FFFFFF',
          700: '#FFFFFF',
        },
        primary: '#8472F3',
        'primary-dark': '#6B59D9',
        'primary-light': '#BDB3FF',
        red: '#EC364B',
        success: '#00F593',
        warn: '#FFD37A',
      },
      scale: {
        102: '1.02',
      },
      aspectRatio: {
        '3/4': '3 / 4',
      },
    },
  },
  plugins: [],
}
