import type { Config } from 'tailwindcss'

// Class-based dark mode. The app is dark-by-default for vibes; the toggle
// adds the `light` class to <html> when the user opts in.
const config: Config = {
  darkMode: ['class', 'html:not(.light)'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'toosoon-red': '#FF3B3B',
        'toosoon-green': '#00C853',
        'toosoon-dark': 'rgb(var(--tt-bg) / <alpha-value>)',
        'toosoon-gray': 'rgb(var(--tt-card) / <alpha-value>)',
        'toosoon-purple': '#7B2FF7',
        'tt-fg': 'rgb(var(--tt-fg) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
