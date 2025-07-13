// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}", // only if using the app directory
  ],
  theme: {
    extend: {
      fontFamily: {
        // Add this line
        bricolage: ['var(--font-bricolage)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
