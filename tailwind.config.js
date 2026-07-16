/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand
        brand: { DEFAULT: "#1B3A8F", dark: "#142C6E" },
        coral: "#FF6B5E",
        // Provenance states
        verified: "#0E7C5A",
        verifiedsoft: "#E4F4EE",
        selfr: "#B07A00",
        selfsoft: "#FBF1DC",
        pulledsoft: "#E8EEFB",
        // Emergency theme
        emergency: "#0E1A38",
        "emergency-card": "#16244C",
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,0.04), 0 6px 20px -8px rgba(16,24,40,0.12)",
        frame: "0 30px 60px -20px rgba(20,44,110,0.45)",
      },
      keyframes: {
        pulsering: {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%, 100%": { transform: "scale(2.2)", opacity: "0" },
        },
        ecg: {
          "0%": { strokeDashoffset: "240" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        pulsering: "pulsering 1.8s ease-out infinite",
      },
    },
  },
  plugins: [],
};
