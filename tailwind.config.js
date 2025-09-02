/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'matrix': 'matrix 8s linear infinite',
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(34, 211, 238, 0.5)',
        'neon-purple': '0 0 20px rgba(168, 85, 247, 0.5)',
      }
    },
  },
  plugins: [],
}
