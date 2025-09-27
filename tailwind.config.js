/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1d4ed8", // blue-700
          light: "#3b82f6",   // blue-500
          dark: "#1e40af",    // blue-800
        },
        secondary: "#64748b", // slate-500
      },
    },
  },
  plugins: [],
};
