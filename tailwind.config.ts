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
        background: "#030712", // Deep navy/black
        "card-bg": "rgba(17, 24, 39, 0.7)",
        primary: {
          DEFAULT: "#0ea5e9", // Sky 500
          glow: "rgba(14, 165, 233, 0.5)",
        },
        secondary: {
          DEFAULT: "#8b5cf6", // Violet 500
          glow: "rgba(139, 92, 246, 0.5)",
        },
        accent: "#22d3ee", // Cyan 400
        text: {
          primary: "#f8fafc", // Slate 50
          secondary: "#94a3b8", // Slate 400
          muted: "#64748b", // Slate 500
        },
        border: "rgba(255, 255, 255, 0.08)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'tech-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'neon-blue': '0 0 5px theme("colors.primary.DEFAULT"), 0 0 20px theme("colors.primary.glow")',
        'neon-purple': '0 0 5px theme("colors.secondary.DEFAULT"), 0 0 20px theme("colors.secondary.glow")',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-hover': '0 8px 32px 0 rgba(0, 0, 0, 0.5), 0 0 20px rgba(14, 165, 233, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 5px theme("colors.primary.DEFAULT"), 0 0 20px theme("colors.primary.glow")' },
          '50%': { boxShadow: '0 0 10px theme("colors.primary.DEFAULT"), 0 0 30px theme("colors.primary.glow")' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
