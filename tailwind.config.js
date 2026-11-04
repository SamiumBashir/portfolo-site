/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dossier: {
          bg: "#F5F4F1",
          card: "#ECECE6",
          cardHover: "#E4E4DC",
          dark: "#111111",
          charcoal: "#1D1D1D",
          red: "#8F1D25",
          crimson: "#B52A32",
          line: "#D8D8D5",
          lineDark: "#2A2A2A",
          muted: "#747474",
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

