/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0a192f',
        accent: '#00f0ff',
        accent2: '#a259ff',
        light: '#f8fafc',
        grayText: '#b0b8c1',
      },
      boxShadow: {
        neon: '0 0 20px #00f0ff, 0 0 40px #a259ff',
      },
    },
  },
  plugins: [],
} 