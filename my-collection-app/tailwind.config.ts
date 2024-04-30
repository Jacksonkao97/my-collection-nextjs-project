import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        'beaver': {
          'base-100': '#f6f4f0',
          'base-200': '#e8e3d9',
          'base-300': '#d2c9b6',
          'neutral': '#b8a78c',
          'info': '#a38c6c',
          'success': '#947b5e',
          'primary': '#886c55',
          'warning': '#664f42',
          'secondary': '#58433b',
          'error': '#4d3c36',
          'accent': '#2b201d',
        },
      },
      "dark"
    ],
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
export default config;
