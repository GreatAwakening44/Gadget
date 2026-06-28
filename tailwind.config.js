import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  plugins: [
  function ({ addUtilities }) {
    addUtilities({
      '.scrollbar-hide': {
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      },
    });
  },
],

}


