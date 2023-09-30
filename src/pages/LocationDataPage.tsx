import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchPlaceDetails from "../utils/fetchPlaceDetails";

import CurrentDataDisplay from "../components/CurrentDataDisplay";
import SevenDayWeather from "../components/SevenDayWeather";
import { usePrimaryLocation } from "../store/primaryLocationContext";

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
  let [locationName, lat, lng] = locationData!.split("_");

  const navigate = useNavigate();

  useEffect(() => {
    if (locationName === undefined || lat === undefined || lng === undefined) {
      navigate("/error");
    }
  }, [locationName, lat, lng, navigate]);

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
  const { primaryLocation, addPrimaryLocation } = usePrimaryLocation();
  const setPrimaryLocationHandler = () => {
    addPrimaryLocation({ name: locationName, lat, lng });
  };

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        const data = await fetchPlaceDetails(+lat, +lng);

        setCurrentPlace({ ...data });
      } catch (err) {
        navigate("/error");
      }
    }
    fetchData();

    return () => {
      controller.abort();
    };
  }, [lat, lng]);

  // useEffect(() => {
  //   setInitialRender(false);
  // }, []);

  return (
    <div className=" bg-blue-950 min-h-screen relative mx-auto z-30">
      <CurrentDataDisplay
        locationName={locationName.replaceAll("-", " ")}
        currentTemp={currentPlace?.current_weather?.temperature}
        currentTime={currentPlace?.current_weather?.time}
        currentWeatherCode={currentPlace?.current_weather?.weathercode}
        hourly={{ ...currentPlace.hourly }}
      />
      <div className=" mx-auto mb-8">
        <SevenDayWeather daily={{ ...currentPlace.daily }} />
      </div>
      {primaryLocation?.name === locationName ? (
        <div className="text-center text-blue-300 ">
          This is your primary location
        </div>
      ) : (
        <div className="text-center mb-4 ">
          {" "}
          <button className="" onClick={setPrimaryLocationHandler}>
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-blue-300 mr-2 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="text-center text-blue-300 ">
                Set as your primary location
              </div>{" "}
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationDataPage;
