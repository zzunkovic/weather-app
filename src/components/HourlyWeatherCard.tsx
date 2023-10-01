import weatherCodeToIcon from "../utils/weatherCodeToIcon";

type HourlyWeatherCardProps = {
  time: string;
  weatherCode: number;
  precipation: number;
  temperature: number;
};

const HourlyWeathercard: React.FC<HourlyWeatherCardProps> = ({
  time,
  weatherCode,
  precipation,
  temperature,
}) => {
  const timeHours = new Date(time).toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="  py-2 px-2 mr-2 shadow-md rounded-lg bg-white/10  max-w-[135px]">
      <div className="text-center text-gray-300 mb-2 ">{timeHours}</div>
      <div className="mb-2 flex justify-center">
        {weatherCodeToIcon(weatherCode)}
      </div>
      <div className="flex justify-between  text-gray-300 ">
        <div className="flex items-center">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3"
              fill="lightblue"
              viewBox="0 0 384 512"
            >
              <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z" />
            </svg>
          </div>
          <div>{precipation}%</div>
        </div>

        <div>{Math.round(temperature)}°</div>
      </div>
    </div>
  );
};

export default HourlyWeathercard;
