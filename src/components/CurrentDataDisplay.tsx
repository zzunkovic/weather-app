import MainNav from "./MainNav";
import HourlyWeathercard from "../components/HourlyWeatherCard";

type CurrentDataDisplayProps = {
  locationName: string;
};

const CurrentDataDisplay: React.FC<CurrentDataDisplayProps> = ({
  locationName,
}) => {
  return (
    <div className="  bg-sunny bg-cover  pb-48 relative ">
      <MainNav></MainNav>
      <div className="flex justify-between mt-2 px-4 text-white">
        <div className="text-gray-100">Sligth Rain</div>
        <div className="text-gray-100">16:45</div>
      </div>
      <div className=" flex justify-center text-white text-8xl  ">
        <span style={{ textShadow: "5px 4px 20px rgba(0, 0, 0, 0.2)" }}>
          16
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
            stroke-width="1.5"
            stroke="white"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
        </div>
        <div className="text-white">{locationName}</div>
      </div>
      <div
        style={{ scrollbarWidth: "none" }}
        className="absolute bottom-0 left-0 right-0 overflow-x-auto "
      >
        <div className="flex gap-2  pl-4 -bottom-12 pb-4  ">
          <HourlyWeathercard />
          <HourlyWeathercard />
          <HourlyWeathercard />
          <HourlyWeathercard />
          <HourlyWeathercard />
          <HourlyWeathercard />
          <HourlyWeathercard />
          <HourlyWeathercard />
        </div>
      </div>
    </div>
  );
};

export default CurrentDataDisplay;
