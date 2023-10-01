import MainNav from "./MainNav";
import HourlyWeathercard from "../components/HourlyWeatherCard";
import convertWeatherCode from "../utils/convertWeatherCode";
import weatherCodeToImage from "../utils/weatherCodeToImage";
import React from "react";
import SliderComponent from "./Slider";
import { useMediaQuery } from "usehooks-ts";

type CurrentDataDisplayProps = {
  locationName: string;
  currentTemp: number;
  currentTime: string;
  currentWeatherCode: number;
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
    weathercode: number[];
  };
};

const CurrentDataDisplay: React.FC<CurrentDataDisplayProps> = ({
  locationName,
  currentTemp,
  currentTime,
  currentWeatherCode,
  hourly,
}) => {
  const time = new Date(currentTime).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const weatherCodeString = convertWeatherCode(currentWeatherCode);
  const weatherImage = weatherCodeToImage(currentWeatherCode);

  const isMobileXL = useMediaQuery("(max-width:1200px)");
  const isMobileL = useMediaQuery("(max-width:1000px)");
  const isMobileM = useMediaQuery("(max-width:900px)");
  const isMobileXM = useMediaQuery("(max-width:750px)");
  const isMobileS = useMediaQuery("(max-width:600px)");
  const isMobileXS = useMediaQuery("(max-width:460px)");

  const slidesToShowHourly = () => {
    if (isMobileXS) return 3;
    if (isMobileS) return 4;
    if (isMobileXM) return 5;
    if (isMobileM) return 6;
    if (isMobileL) return 7;
    else return 8;
  };

  const slidesHourly = slidesToShowHourly();

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)),url('/img/${weatherImage}.jpg')`,
      }}
      className={` bg-cover  relative pb-4  z-50`}
    >
      <div className="  mx-auto">
        <MainNav></MainNav>
        <div className="flex justify-between mt-2 px-4 text-white mb-8">
          <div className="text-gray-100">{weatherCodeString}</div>
          <div className="text-gray-100">{time}</div>
        </div>
        <div className=" flex justify-center text-white text-8xl  ">
          <span style={{ textShadow: "5px 4px 20px rgba(0, 0, 0, 0.2)" }}>
            {currentTemp && Math.round(currentTemp)}
          </span>
          <span
            style={{ textShadow: "5px 4px 20px rgba(0, 0, 0, 0.2)" }}
            className="text-5xl translate-y-8"
          >
            °
          </span>
        </div>
        <div className="flex justify-center -mt-4 mb-16">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
          </div>
          <div className="text-white">{locationName}</div>
        </div>
        <div className="mt-4 pb-2 max-w-6xl mx-auto  px-4">
          <SliderComponent
            showArrows={isMobileXL ? false : true}
            slidesToShow={slidesHourly}
          >
            {hourly.time?.slice(0, 30).map((el, ind) => {
              return (
                <HourlyWeathercard
                  key={ind}
                  time={el}
                  precipation={hourly.precipitation_probability[ind]}
                  temperature={hourly.temperature_2m[ind]}
                  weatherCode={hourly.weathercode[ind]}
                />
              );
            })}
          </SliderComponent>
        </div>
      </div>
    </div>
  );
};

export default CurrentDataDisplay;
