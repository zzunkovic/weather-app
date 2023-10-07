/*
  Converts the weather code received from the API to a text a user can understand

*/

const convertWeatherCode = (code: number) => {
  switch (code) {
    case 0:
      return "Clear Sky";

    case 1:
      return "Mainly Clear";

    case 2:
      return "Partly Cloudy";

    case 3:
      return "Overcast";

    case 45:
      return "Fog";

    case 48:
      return "Rime";

    case 51:
      return "Light Drizzle";

    case 53:
      return "Moderate Drizzle";

    case 55:
      return "Dense Drizzle";

    case 56:
    case 57:
      return "Frezing Drizzle";

    case 61:
      return "Slight Rain";
    case 63:
      return "Moderate Rain";
    case 65:
      return "Heavy Rain";

    case 66:
    case 67:
      return "Freezing Rain";

    case 71:
      return "Light Snow";

    case 73:
      return "Moderate Snow";

    case 75:
      return "Heavy Snow";

    case 77:
      return "Snow Grains";

    case 80:
      return "Slight Rain showers";

    case 81:
      return "Moderate Rain showers";

    case 82:
      return "Violent Rain Showers";

    case 85:
      return "Slight Snow Showers";
    case 86:
      return "Heavy Snow Showers";

    case 95:
      return "Thunderstorm";

    case 96:
    case 99:
      return "Hail";
  }
};

export default convertWeatherCode;
