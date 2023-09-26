import ForecastCard from "./ForecastCard";

const SevenDayWeather: React.FC = () => {
  return (
    <div className=" pl-4 pt-12  border-blue-500 ">
      <div className="text-2xl mb-4 text-blue-50 font-bold">7 Day Weather</div>
      <div className="flex gap-4 overflow-x-auto">
        <ForecastCard />
        <ForecastCard />
        <ForecastCard />
        <ForecastCard />
      </div>
    </div>
  );
};

export default SevenDayWeather;
