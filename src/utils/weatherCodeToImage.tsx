const weatherCodeToImage = (code: number) => {
  switch (code) {
    case 0:
    case 1:
      return "sunny";
    case 2:
    case 3:
      return "overcast";

    case 45:
      return "fog";

    case 48:
      return "rime";

    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return "rain";

    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return "snow";

    case 95:
    case 96:
    case 99:
      return "thunderstorm";
  }
};

export default weatherCodeToImage;
