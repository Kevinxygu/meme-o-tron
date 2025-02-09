import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "custom-blue": "#0B3E9F"
      },
      fontFamily: {
        'fredoka': ['"Fredoka One"', 'monospace'],
      },
      fontSize: {
        '95': '95px',
      }
    },
  },
  plugins: [],
} satisfies Config;
