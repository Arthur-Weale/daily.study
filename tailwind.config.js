/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
extend: {
  colors: {
    // Brand Primaries
    primary: {
      400: "#60A5FA",
      500: "#3B82F6",
      600: "#2563EB",
    },
    cyanBrand: {
      400: "#22D3EE",
      500: "#06B6D4",
      600: "#0891B2",
    },
    indigoBrand: {
      500: "#6366F1",
      600: "#4F46E5",
      700: "#4338CA",
    },
    greenBrand: {
      400: "#4ADE80",
      500: "#22C55E",
      600: "#16A34A",
    },
    pinkBrand: {
      400: "#F472B6",
      500: "#EC4899",
    },
    purpleBrand: {
      400: "#C084FC",
      500: "#A855F7",
    },
    yellowBrand: {
      300: "#FDE047",
      400: "#FACC15",
    },
    redBrand: {
      500: "#EF4444",
      600: "#DC2626",
    },
    bg: {
      blue50: "#EFF6FF",
      purple50: "#F5F3FF",
      pink50: "#FDF2F8",
      yellow50: "#FFFBEB",
      green50: "#ECFDF5",
      white: "#FFFFFF",
    },
    text: {
      primary: "#111827",
      secondary: "#4B5563",
      tertiary: "#374151",
      muted: "#6B7280",
    },
  },

  borderRadius: {
    "3xl": "24px",
    "2xl": "16px",
    xl: "12px",
    full: "9999px",
  },

  boxShadow: {
    card: "0 4px 20px rgba(0,0,0,0.08)",
    "card-lg": "0 6px 32px rgba(0,0,0,0.12)",
    "card-xl": "0 8px 40px rgba(0,0,0,0.15)",
    flashcard: "0 10px 50px rgba(0,0,0,0.18)",
  },

  spacing: {
    4: "16px",
    5: "20px",
    6: "24px",
    8: "32px",
  },

  blur: {
    "3xl": "64px",
  },

  opacity: {
    20: "0.2",
    30: "0.3",
    40: "0.4",
    50: "0.5",
    60: "0.6",
    90: "0.9",
  },

  transitionDuration: {
    300: "300ms",
    600: "600ms",
  },

  scale: {
    "102": "1.02",
    "90": "0.90",
  },

  translate: {
    "1/3": "33.333%",
  },

  zIndex: {
    10: "10",
  },
},
  },
  plugins: [],
};
