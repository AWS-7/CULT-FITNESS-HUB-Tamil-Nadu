/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#FF6A00',
        'primary-dark': '#E55A00',
        'bg-black': '#0A0A0A',
        'card-grey': '#1E1E1E',
        'secondary-text': '#A0A0A0',
      },
      fontFamily: {
        heading: ['Oswald', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-orange': '0 0 20px rgba(255,106,0,0.4)',
        'glow-orange-lg': '0 0 40px rgba(255,106,0,0.3)',
      },
    },
  },
  plugins: [],
};
