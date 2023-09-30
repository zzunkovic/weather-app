import MainNav from "./MainNav";
import HourlyWeathercard from "../components/HourlyWeatherCard";
import convertWeatherCode from "../utils/convertWeatherCode";
import weatherCodeToImage from "../utils/weatherCodeToImage";
import React from "react";

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
  console.log(weatherImage);

  return (
    <div className={` bg-${weatherImage} bg-cover  pb-48 relative  z-50`}>
      <div className="  mx-auto">
        <MainNav></MainNav>
        <div className="flex justify-between mt-2 px-4 text-white">
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
        <div className="flex justify-center -mt-4">
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
        <div className="absolute bottom-0 left-0 right-0 overflow-x-auto  mx-auto custom-scrollbar ">
          <div className="flex gap-2  pl-4 -bottom-12 pb-4 ">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentDataDisplay;
