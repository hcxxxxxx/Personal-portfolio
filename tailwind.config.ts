import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        background: "#111827",
        "content-background": "#1F2937",
        primary: "#38BDF8",
        secondary: "#818CF8",
        "text-primary": "#F9FAFB",
        "text-secondary": "#9CA3AF",
        border: "#374151",
      },
      fontSize: {
        'hero': 'clamp(2.5rem, 5vw, 4.5rem)',
        'section': 'clamp(2rem, 4vw, 3rem)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      animation: {
        'slow-spin': 'spin 20s linear infinite',
        'bounce-dots': 'bounce 1.4s ease-in-out infinite both',
      },
      keyframes: {
        'bounce-dots': {
          '0%, 80%, 100%': {
            transform: 'scale(0)',
          },
          '40%': {
            transform: 'scale(1)',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;