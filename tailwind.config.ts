
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#1e293b',
          300: '#0f172a',
          400: '#0c1220',
          500: '#020617',
        },
        // Neural network inspired colors
        neural: {
          100: '#6366f1',
          200: '#8b5cf6',
          300: '#a855f7',
          400: '#c084fc',
        },
        // Accent colors
        accent: {
          100: '#3b82f6',
          200: '#10b981',
          300: '#f59e0b',
          400: '#ef4444',
        }
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #0a0a0a 0%, #1f1f1f 15%, #2a2a2a 30%, #000000 45%, #1a1a1a 60%, #2d2d2d 75%, #0f0f0f 90%, #000000 100%)',
        'gradient-dark': 'linear-gradient(135deg, #000000 0%, #1a1a1a 25%, #2d2d2d 50%, #0c0c0c 75%, #1f1f1f 100%)',
        'gradient-darker': 'linear-gradient(135deg, #000000 0%, #0a0a0a 20%, #1a1a1a 40%, #2a2a2a 60%, #0f0f0f 80%, #000000 100%)',
        'gradient-text-primary': 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899, #f59e0b)',
        'gradient-text-secondary': 'linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6, #ec4899)',
        'gradient-text-accent': 'linear-gradient(135deg, #f59e0b, #ef4444, #ec4899, #8b5cf6)',
        'gradient-text-neural': 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899, #06b6d4, #10b981)',
      },
      animation: {
        'gradient-shift': 'gradientShift 15s ease infinite',
        'gradient-text-shift': 'gradientTextShift 8s ease infinite',
      },
      keyframes: {
        gradientShift: {
          '0%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          },
          '100%': {
            'background-position': '0% 50%'
          }
        },
        gradientTextShift: {
          '0%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          },
          '100%': {
            'background-position': '0% 50%'
          }
        }
      }
    },
  },
  plugins: [],
}

export default config