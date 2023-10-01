import ForecastCard from "./ForecastCard";
import SliderComponent from "./Slider";
import { useMediaQuery } from "usehooks-ts";

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
  const isMobileL = useMediaQuery("(max-width:1200px)");

  const isMobileXM = useMediaQuery("(max-width:750px)");
  const isMobileS = useMediaQuery("(max-width:600px)");
  const isMobileXS = useMediaQuery("(max-width:350px)");

  const slidesToShowDaily = () => {
    if (isMobileXS) return 1;
    if (isMobileS) return 2;
    if (isMobileXM) return 3;
    else return 4;
  };
  const slidesDaily = slidesToShowDaily();

  return (
    <div className="  pt-12  border-blue-500 px-4 ">
      <div className="text-2xl mb-8 text-blue-50 font-bold ">7 Day Weather</div>
      <SliderComponent
        showArrows={isMobileL ? false : true}
        slidesToShow={slidesDaily}
      >
        {daily.time?.map((el, ind) => {
          return (
            <ForecastCard
              key={ind}
              weathercode={daily.weathercode[ind]}
              time={el}
              temperatureMax={daily.temperature_2m_max[ind]}
              temperatureMin={daily.temperature_2m_min[ind]}
              precipitation={daily.precipitation_probability_max[ind]}
            />
          );
        })}
      </SliderComponent>
    </div>
  );
};

export default SevenDayWeather;
