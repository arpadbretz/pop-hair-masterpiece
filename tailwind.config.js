/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gold-champagne': '#E5D3B3',
        'soft-black': '#1A1A1A',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        'vogue': '0.5em',
        'vogue-tight': '0.2em',
      },
    },
  },
  plugins: [],
}
