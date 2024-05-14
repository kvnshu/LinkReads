// tailwind.config.js
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */

const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    },
  },
  darkMode: "class",
  plugins: [nextui({
    prefix: "nextui", // prefix for themes variables
    addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
    defaultTheme: "light", // default theme from the themes object
    defaultExtendTheme: "light", // default theme to extend on custom themes
    layout: {}, // common layout tokens (applied to all themes)
    themes: {
      dark: {
        layout: {}, // dark theme layout tokens
        colors: {
          'background': '#0a100f',
          'foreground': '#e2eeed',
          'primary': {
            100: '#9fc6c6',
            DEFAULT: '#9fc6c6',
          },
          'secondary': '#41556c',
          'accent': '#7080a9',
          'content1': "#121717",
          'content2': "#1b252b",
        }, // dark theme colors
      },
      // ... custom themes
    },
  }),]
}

export default config