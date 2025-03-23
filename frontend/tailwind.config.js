export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Certifique-se de que as extensões estão corretas
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366f1",
          dark: "#4f46e5",
          darker: "#3730a3",
        },
        secondary: {
          DEFAULT: "#eef2ff",
          light: "#e0e7ff",
          border: "#818cf8",
        },
      },
    },
  },
  plugins: [import("tailwindcss-animate")],
};
