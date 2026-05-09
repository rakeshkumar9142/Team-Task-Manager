/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#0B0F19",
        bgSecondary: "#111827",
        accentPurple: "#7C3AED",
        accentViolet: "#8B5CF6",
        accentCyan: "#06B6D4",
      },
      boxShadow: {
        glow: "0 20px 80px rgba(124, 58, 237, 0.35)",
      },
    },
  },
  plugins: [],
};

