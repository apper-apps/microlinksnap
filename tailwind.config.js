/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066FF',
          50: '#E6F0FF',
          100: '#CCE0FF',
          200: '#99C2FF',
          300: '#66A3FF',
          400: '#3385FF',
          500: '#0066FF',
          600: '#0052CC',
          700: '#003D99',
          800: '#002966',
          900: '#001433'
        },
        secondary: {
          DEFAULT: '#00D4FF',
          50: '#E6FAFF',
          100: '#CCF5FF',
          200: '#99EAFF',
          300: '#66E0FF',
          400: '#33D7FF',
          500: '#00D4FF',
          600: '#00A3CC',
          700: '#007A99',
          800: '#005266',
          900: '#002933'
        },
        accent: {
          DEFAULT: '#FF3366',
          50: '#FFE6EB',
          100: '#FFCCD6',
          200: '#FF99AD',
          300: '#FF6684',
          400: '#FF335B',
          500: '#FF3366',
          600: '#CC0033',
          700: '#990026',
          800: '#66001A',
          900: '#33000D'
        },
        surface: '#F8FAFC',
        background: '#FFFFFF',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6'
      },
      fontFamily: {
        'display': ['Space Grotesk', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        'success-bounce': 'successBounce 0.6s ease-out',
        'copy-flash': 'copyFlash 0.3s ease-in-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite'
      },
      keyframes: {
        successBounce: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.2)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        copyFlash: {
          '0%': { backgroundColor: 'rgb(255, 51, 102)' },
          '50%': { backgroundColor: 'rgb(16, 185, 129)' },
          '100%': { backgroundColor: 'rgb(255, 51, 102)' }
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 102, 255, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 102, 255, 0.5)' }
        }
      }
    },
  },
  plugins: [],
}