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
        'text': '#f2f2f0',
        'background': '#0a0a09',
        'primary': '#b7bbab',
        'secondary': '#4e5a4a',
        'accent': '#81957e',
       },
       
    },
  },
  plugins: [],
} satisfies Config;
