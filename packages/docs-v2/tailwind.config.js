// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
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
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
