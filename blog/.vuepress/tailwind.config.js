// const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: false,
  future: {
    purgeLayersByDefault: true,
  },
  purge: {
    content: [
      "./blog/.vuepress/theme/**/*.vue",
    ],
  },
}
