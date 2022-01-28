// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    '../lxr-ui/src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['inter', ...defaultTheme.fontFamily.sans]
      },
      borderRadius: {
        DEFAULT: '3px'
      },
      colors: {
        leanix: {
          blue: {
            DEFAULT: '#1666ee',
            dark: '#1259d4'
          }
        }
      },
      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
        }
      },
      animation: {
        shake: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
