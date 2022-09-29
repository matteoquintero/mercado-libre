/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yellow-brand': '#FFE600',
        'black-brand': '#333333',
        'gray-brand': '#999999',
        'white-brand': '#EEEEEE',
        'blue-brand': '#3483FA; ' 
      }     
    },
  },
  plugins: [],
}
