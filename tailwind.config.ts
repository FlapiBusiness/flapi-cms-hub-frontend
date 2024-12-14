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
      sans: 'Poppins',
      serif: 'Poppins',
    },
    extend: {
      colors: {
        primary: '#8472F3',
        'dark-primary': '#',
        'primary-light': '#',
        red: '#EC364B',
        'dark-red': '#C0172A',
        success: '#00F593',
        disabled: '#',
        light: {
          300: 'rgba(255, 255, 255, 0.3)',
          700: 'rgba(255, 255, 255, 0.7)',
        },
        gray: {
          200: '#',
          300: '#',
          400: '#',
          500: '#',
          600: '#',
          700: '#101623',
        },
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
