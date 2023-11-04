/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'blue-primary': '#032b91',
        'blue-secondary': '#1488db',
        'blue-selection': '#8ac4ed',
        'card-background': '#e8f3fb',
        'page-background': '#f7f9fc',
      },
      fontFamily: {
        'sans': ['Inter', defaultTheme.fontFamily.sans],
      },
      boxShadow: {
          sm1: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
          md1: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.2)",
          lg1: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.4)",
          xl1: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.2)",
          "2xl1": "0 25px 50px -12px rgb(0 0 0 / 0.3)",
          inner1: "inset 0 2px 4px 0 rgb(0 0 0 / 0.1)",
          none1: "0 0 rgb(0, 0 / 0, 0)",
          "0": "0 0 0 0 rgba(0, 0, 0, 0",
          "1": "0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
          "2": "0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)",
          "3": "0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)",
          "4": "0px 2px 3px 0px rgba(0, 0, 0, 0.3), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)",
          "5": "0px 4px 4px 0px rgba(0, 0, 0, 0.3), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)",
      }
    },
  },
  plugins: [],
}

