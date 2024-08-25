module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
      },
      colors: {
        red: "#E40018",
        blue: "#59ADD0",
        dark: "#202126",
        "light-dark": " #393F49",
        "bold-blue": "#537BA7",
        grey: "#5E5E7B",
        "light-grey": "#eeefef",
        "light-white": "#f1f1f1",
        "light-blue": "#D5DCED",
        "light-black": "#747474",
        "blue-l": "#E7F1F5",
        bor: "#B2DDEF",
        bor2: "#B0BECF",
        "grey-b": "#8D9EB2",
      },
      fontFamily: {
        "sf-pro": ["Sf Pro", "sans-serif"],
        intro: ["Intro", "sans-serif"],
      },
      fontSize: {
        min: "8px",
        ms: "10px",
      },
      spacing: {
        18: "72px",
        19: "76px",
        50:'200px',
        58: "232px",
      },
      width: {},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
