/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'bg-light': 'rgb(var(--color-bg-light) / <alpha-value>)',
        'bg-dark': 'rgb(var(--color-bg-dark) / <alpha-value>)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      boxShadow: {
        'inner-light': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.05)',
        glass: '0 4px 30px rgba(0, 0, 0, 0.1)',
        'glass-hover': '0 8px 32px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: 'rgb(var(--color-primary))',
              '&:hover': {
                color: 'rgb(var(--color-primary) / 0.8)',
              },
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.primary'),
              '&:hover': {
                color: 'rgb(var(--color-primary) / 0.8)',
              },
            },
            h1: {
              color: theme('colors.gray.100'),
            },
            h2: {
              color: theme('colors.gray.100'),
            },
            h3: {
              color: theme('colors.gray.100'),
            },
            h4: {
              color: theme('colors.gray.100'),
            },
            strong: {
              color: theme('colors.gray.100'),
            },
            code: {
              color: theme('colors.gray.300'),
            },
            blockquote: {
              color: theme('colors.gray.300'),
              borderLeftColor: theme('colors.gray.700'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};