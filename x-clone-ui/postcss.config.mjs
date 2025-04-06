const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
config.theme = {
  extend: {
    screens: {
      xsm: "500px",
      sm: "600px",
      md: "690px",
      lg: "988px",
      xl: "1078px",
      xxl: "1265px",
    },
    colors: {
      textGray: "#71767b",
      textGrayLight: "#e7e9ea",
      borderGray: "#2f3336",
      inputGray: "#202327",
      iconBlue: "#1d9bf0",
      iconGreen: "#00ba7c",
      iconPink: "#f91880",
    },
  },
};