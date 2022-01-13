const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
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
  plugins: []
}
