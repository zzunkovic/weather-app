import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchPlaceDetails from "../utils/fetchPlaceDetails";

import CurrentDataDisplay from "../components/CurrentDataDisplay";
import SevenDayWeather from "../components/SevenDayWeather";

type currentPlace = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    is_day: number;
    time: string;
  };
  hourly_units: {
    time: string;
    temperature_2m: string;
    precipitation_probability: string;
    weathercode: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
    weathercode: number[];
  };
  daily_units: {
    time: string;
    weathercode: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    precipitation_probability_max: string;
  };
  daily: {
    time: string[];
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
};

const LocationDataPage: React.FC = () => {
  const { locationData } = useParams();

  // eslint-disable-next-line
  const [locationName, lat, lng] = locationData!.split("_");
  const [currentPlace, setCurrentPlace] = useState<currentPlace>({
    latitude: 0,
    longitude: 0,
    generationtime_ms: 0,
    utc_offset_seconds: 0,
    timezone: "",
    timezone_abbreviation: "",
    elevation: 0,
    current_weather: {
      temperature: 0,
      windspeed: 0,
      winddirection: 0,
      weathercode: 0,
      is_day: 0,
      time: "",
    },
    hourly_units: {
      time: "",
      temperature_2m: "",
      precipitation_probability: "",
      weathercode: "",
    },
    hourly: {
      time: [],
      temperature_2m: [],
      precipitation_probability: [],
      weathercode: [],
    },
    daily_units: {
      time: "",
      weathercode: "",
      temperature_2m_max: "",
      temperature_2m_min: "",
      precipitation_probability_max: "",
    },
    daily: {
      time: [],
      weathercode: [],
      temperature_2m_max: [],
      temperature_2m_min: [],
      precipitation_probability_max: [],
    },
  });

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      const data = await fetchPlaceDetails(+lat, +lng);

      setCurrentPlace({ ...data });
    }
    fetchData();

    return () => {
      controller.abort();
    };
  }, [lat, lng]);

  return (
    <div className=" bg-blue-950 min-h-screen relative mx-auto">
      <CurrentDataDisplay
        locationName={locationName}
        currentTemp={currentPlace.current_weather.temperature}
        currentTime={currentPlace.current_weather.time}
        currentWeatherCode={currentPlace.current_weather.weathercode}
        hourly={{ ...currentPlace.hourly }}
      />
      <div className=" mx-auto">
        <SevenDayWeather daily={{ ...currentPlace.daily }} />
      </div>
    </div>
  );
};

export default LocationDataPage;
