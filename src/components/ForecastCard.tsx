import getForecastCardDate from "../utils/getForecastCardDay";
import weatherCodeToIcon from "../utils/weatherCodeToIcon";

type ForecastCardProps = {
  time: string;
  weathercode: number;
  temperatureMax: number;
  temperatureMin: number;
  precipitation: number;
};

const ForecastCard: React.FC<ForecastCardProps> = ({
  time,
  weathercode,
  temperatureMax,
  temperatureMin,
  precipitation,
}) => {
  return (
    <div className="bg-blue-900 rounded-lg px-4 py-2 border-b-4  border-blue-500 shadow-lg">
      <div className="text-md mb-4  text-blue-100 text-center  ">
        {getForecastCardDate(time)}
      </div>
      <div className="flex justify-center mb-4">
        {weatherCodeToIcon(weathercode)}
      </div>
      <div className="flex justify-between gap-10">
        <div className="flex items-center ">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="lightblue"
              viewBox="0 0 384 512"
            >
              <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z" />
            </svg>
          </div>
          <div className="text-lg text-blue-50">{precipitation}%</div>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-4 h-4 text-blue-100"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                />
              </svg>
            </div>
            <div className="text-lg text-blue-50">
              {Math.round(temperatureMax)}°
            </div>
          </div>{" "}
          <div className="flex items-center">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-4 h-4 text-blue-300"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                />
              </svg>
            </div>
            <div className="text-lg text-blue-50 ">
              {Math.round(temperatureMin)}°
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
