/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#8323FF",
        yellow: "#FEEA35",
        darkGray: "#1E1F28",
        gray: "#2B2B37",
        mediumGray: "#373745",
        lightGray: "#8B8D9B",
      },
      fontFamily: {
        lato: "Lato",
        roboto: "Roboto",
      },
      fontSize: {
        extraLg: "0.6rem",
      },
    },
    screens: {
      "big-screen": { max: "1200px" },
      "big-tablet": { max: "900px" },
      tablet: { max: "600px" },
      cel: { max: "400px" },
    },
  },
  plugins: [],
};
