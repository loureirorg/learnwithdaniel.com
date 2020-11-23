const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  future: {
    purgeLayersByDefault: true,
  },
  purge: {
    content: [
      "./theme/**/*.vue",
    ],
  }
}
