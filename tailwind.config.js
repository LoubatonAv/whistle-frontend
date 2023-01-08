/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern':
          "linear-gradient(to right bottom, rgba('#7ed56f',0.8), rgba('#28b485',0.8)), url('../src/assets/Images/Tinwhistle.jpg')",
      },
      visibility: ['group-hover'],
      fontFamily: {
        cormorant: ['Cormorant', 'sans-serif'],
      },
      padding: {
        '1/3': '33.33333%',
        '2/3': '66.66667%',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
