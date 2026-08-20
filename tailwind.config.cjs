/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      /*
       * Kept inside `extend` so Tailwind's default breakpoints stay intact.
       * `screens` here would only cap the width at that one breakpoint, so the
       * cap is expressed as a plain max-width that applies at every size.
       */
      container: {
        center: true,
        padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      },
      maxWidth: {
        container: '1152px',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          red: '#E1251B',
          redDark: '#C01911',
          navy: '#123C7B',
          navyDark: '#0E2E5E',
          ink: '#101828',
          cream: '#FBF8F3',
          muted: '#5B6470',
          amber: '#F5C518',
          amberDark: '#DCAE0B',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,24,40,0.04), 0 8px 24px rgba(16,24,40,0.06)',
        lift: '0 12px 32px rgba(16,24,40,0.12)',
      },
    },
  },
  plugins: [],
}
