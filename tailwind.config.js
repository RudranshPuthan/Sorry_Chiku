/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blush-50': '#FFF5F7',
        'blush-100': '#FFE4EC',
        'pink-soft': '#FFB6C1',
        'pink-hot': '#FF69B4',
        'rose-gold': '#F8C8DC',
        'rose-gold-deep': '#FFD1DC',
        'magenta-deep': '#C2185B',
        'lavender-pink': '#F3D9FA',
        'ink': '#3A2C33',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        script: ['"Dancing Script"', 'cursive'],
        sans: ['Poppins', 'Quicksand', 'sans-serif'],
      },
      animation: {
        'heartbeat': 'heartbeat 1.2s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.16)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.12)' },
          '70%': { transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': {
            boxShadow: '0 0 15px rgba(255, 105, 180, 0.25), 0 0 30px rgba(255, 182, 193, 0.15)',
            borderColor: 'rgba(255, 182, 193, 0.4)'
          },
          '50%': {
            boxShadow: '0 0 25px rgba(255, 105, 180, 0.45), 0 0 45px rgba(255, 182, 193, 0.3)',
            borderColor: 'rgba(255, 105, 180, 0.7)'
          },
        },
      },
    },
  },
  plugins: [],
}
