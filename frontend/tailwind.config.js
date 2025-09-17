/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector", // use .dark on <html> to enable dark mode
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // refined primary (blue-600)
        dark: "#0f172a",
      },
      spacing: {
        // Denser spacing scale
        '0.5': '0.125rem',
        '1.5': '0.375rem',
        '2.5': '0.625rem',
        '3.5': '0.875rem',
        '18': '4.5rem',
        '22': '5.5rem',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          lg: '2rem',
          xl: '2rem',
          '2xl': '3rem',
        },
      },
    },
  },
  plugins: [],
};
