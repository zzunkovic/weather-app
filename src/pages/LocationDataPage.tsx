import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import fetchPlaceDetails from "../utils/fetchPlaceDetails";

import CurrentDataDisplay from "../components/CurrentDataDisplay";
import SevenDayWeather from "../components/SevenDayWeather";
import { usePrimaryLocation } from "../store/primaryLocationContext";
import LoadingScreen from "../components/LoadingScreen";

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

type hourly = {
  time: string[];
  temperature_2m: number[];
  precipitation_probability: number[];
  weathercode: number[];
};

type daily = {
  time: string[];
  weathercode: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
};

/*
  Renders all the data related to the weather of the city

*/

const LocationDataPage: React.FC = () => {
  const { locationData } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line
  let [locationName, lat, lng] = locationData!.split("_");
  lat = lat.replace("+", ".");
  lng = lng.replace("+", ".");
  const navigate = useNavigate();

  useEffect(() => {
    //takes care of invalid urls
    if (locationName === undefined || lat === undefined || lng === undefined) {
      navigate("/error");
    }
  }, [locationName, lat, lng, navigate]);

  const [currentPlace, setCurrentPlace] = useState<currentPlace>();
  const { primaryLocation, addPrimaryLocation } = usePrimaryLocation();
  const setPrimaryLocationHandler = () => {
    addPrimaryLocation({ name: locationName, lat, lng });
  };

  useEffect(() => {
    //getting primary location from local storage in order to check whether the location is primary or not
    const locationString = localStorage.getItem("LOCATION");

    if (locationString !== null) {
      addPrimaryLocation(JSON.parse(locationString));
    }
  }, []);

  useEffect(() => {
    //fetches the data of the city
    const controller = new AbortController();
    async function fetchData() {
      try {
        const data = await fetchPlaceDetails(lat, lng);

        setCurrentPlace({ ...data });
        setIsLoading(false);
      } catch (err) {
        navigate("/error");
      }
    }
    fetchData();

    return () => {
      controller.abort();
    };
  }, [lat, lng]);

  return (
    <Fragment>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className=" bg-blue-950 min-h-screen relative mx-auto z-30">
          <CurrentDataDisplay
            locationName={locationName.replaceAll("-", " ")}
            currentTemp={currentPlace?.current_weather?.temperature as number}
            currentTime={currentPlace?.current_weather?.time as string}
            currentWeatherCode={
              currentPlace?.current_weather?.weathercode as number
            }
            hourly={{ ...(currentPlace?.hourly as hourly) }}
          />
          <div className="mb-20 mx-auto max-w-6xl ">
            <SevenDayWeather daily={{ ...(currentPlace?.daily as daily) }} />
          </div>
          {primaryLocation?.lat == lat && primaryLocation.lng == lng ? (
            <div className="text-center text-blue-300 mb-16 ">
              This is your primary location
            </div>
          ) : (
            <div className="text-center mb-16 ">
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
      )}
    </Fragment>
  );
};

export default LocationDataPage;
