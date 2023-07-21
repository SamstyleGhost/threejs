/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,tsx}",
    "./src/*.{html,js,jsx,tsx}"
    ],
  theme: {
    extend: {
      animation: {
        'bounce': 'bounce 2s cubic-bezier(0.8, 0, 1, 1)'
      },
      keyframes: {
        bounce: {
          '0%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-25%)',
          }, 
          '100%': {
            transform: 'translateY(0)',
          }         
        }
      } 
    },
  },
  plugins: [],
}