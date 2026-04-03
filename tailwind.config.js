/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0d1117',
          'navy-light': '#161b22',
          'navy-card': '#1c2333',
          'navy-surface': '#232b3e',
          amber: '#f5a623',
          'amber-light': '#ffc857',
          'amber-dark': '#d4891a',
          teal: '#2ed8a3',
          'teal-dark': '#1a9e78',
          orange: '#e8593c',
          white: '#ffffff',
          'gray-100': '#f0f2f5',
          'gray-200': '#d1d5db',
          'gray-300': '#b0b8c9',
          'gray-400': '#8b95a8',
          'gray-500': '#6b7280',
          'gray-600': '#4b5563',
          'gray-700': '#374151',
          border: '#2a3250',
          'border-light': '#3a4568',
        },
        sa: {
          engageos: '#2ed8a3',
          insightlens: '#4a90d9',
          resolveiq: '#f5a623',
          searchcore: '#e8593c',
          visualforge: '#a78bfa',
          propeledge: '#e8593c',
        },
      },
      fontFamily: {
        display: ['"Instrument Sans"', '"DM Sans"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', '"Instrument Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      fontSize: {
        'hero-xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'hero-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'hero-md': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'section-title': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        'card-title': ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
      },
      spacing: {
        'section': '6rem',
        'section-sm': '4rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-brand': 'linear-gradient(135deg, #0d1117 0%, #1c2333 50%, #0d1117 100%)',
        'gradient-amber': 'linear-gradient(135deg, #f5a623 0%, #e8593c 100%)',
        'gradient-teal': 'linear-gradient(135deg, #2ed8a3 0%, #4a90d9 100%)',
        'glow-amber': 'radial-gradient(ellipse at center, rgba(245,166,35,0.15) 0%, transparent 70%)',
        'glow-teal': 'radial-gradient(ellipse at center, rgba(46,216,163,0.1) 0%, transparent 70%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
      },
    },
  },
  plugins: [],
};
