import ForecastCard from "./ForecastCard";

type SevenDayWeatherProps = {
  daily: {
    time: string[];
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
};

const SevenDayWeather: React.FC<SevenDayWeatherProps> = ({ daily }) => {
  return (
    <div className="  pt-12  border-blue-500 ">
      <div className="text-2xl mb-4 text-blue-50 font-bold pl-4">
        7 Day Weather
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar pl-4">
        {daily.time.map((el, ind) => {
          return (
            <ForecastCard
              weathercode={daily.weathercode[ind]}
              time={el}
              temperatureMax={daily.temperature_2m_max[ind]}
              temperatureMin={daily.temperature_2m_min[ind]}
              precipitation={daily.precipitation_probability_max[ind]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SevenDayWeather;
