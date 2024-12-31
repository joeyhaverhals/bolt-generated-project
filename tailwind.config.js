/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: 'var(--color-brand-orange)',
          amber: 'var(--color-brand-amber)',
        }
      },
      fontSize: {
        'base': 'var(--font-size-base)',
      },
      spacing: {
        'touch': 'var(--touch-target-size)',
      },
      screens: {
        'xs': '320px',
        'sm': '480px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      maxWidth: {
        'content': '1280px',
      },
      minHeight: {
        'touch': 'var(--touch-target-size)',
      },
    },
  },
  plugins: [],
}
