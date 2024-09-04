/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./dashboard/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        marginGlobal: "100px",
        marginSection: "35px",
        container: "90%",
      },
      textShadow: {
        sm: "_0px_5px_5px_rgb(255_255_255/_90%)",
      },
    },
    colors: {
      mainColor: "#e74c3c",
      hoverColor: "#c0392b",
      grayColor: "#2d3436",
      secondaryGray: "#636e72",
    },
    fontFamily: {
      mainFont: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
  },
  plugins: [],
});
