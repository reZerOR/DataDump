/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      "project": {
        100:"#ede8ff",
        200:"#ddd4ff",
        300:"#c4b2ff",
        400:"#a986ff",
        500:"#8e56fc",
        600:"#7b2af4",
        700:"#7121e0",
        800:"#5f1bbc",
        900:"#4f189a",
      }
    }
    },

  },
    daisyui: {
     themes: [],
  },

  plugins: [require("daisyui")],

}

