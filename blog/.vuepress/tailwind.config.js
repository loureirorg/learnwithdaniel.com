// const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'media',
  future: {
    purgeLayersByDefault: true,
  },
  purge: {
    content: [
      "./blog/.vuepress/theme/**/*.vue",
    ],
  },
  theme: {
    extend: {
      colors: {
        'primary': '#c41d47',
        'secondary': '#308013',
      },
    },
  }
}
