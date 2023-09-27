/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "home-bg": "url('/img/home-bg.jpg')",
        rain: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)),url('/img/rain.jpg') ",
        sunny:
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)),url('/img/sunny.jpg') ",

        overcast:
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)),url('/img/overcast.jpg') ",
        fog: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)),url('/img/fog.jpg') ",
        rime: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)),url('/img/rime.jpg') ",
        snow: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)),url('/img/snow.jpg') ",
        thunderstorm:
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)),url('/img/thunderstorm.jpg') ",
      },
      fontFamily: {
        "open-sans": ["Open Sans", "sans-serif"],
      },
      fontSize: {
        "8xl": "7rem",
      },
    },
  },
  plugins: [],
};
