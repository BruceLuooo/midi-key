/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        'white': '#ffffff',
        "dark": '#a53838',
        'shadeGray': '#939393',
        'midnight': '#121063',
        'bermuda': '#78dcca',
        'dark-mode': '#1a1a1a',
        'new':'#ffffff'
      },
    },
  },
  plugins: [],
}
