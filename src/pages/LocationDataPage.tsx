import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchPlaceDetails from "../utils/fetchPlaceDetails";

import CurrentDataDisplay from "../components/CurrentDataDisplay";
import SevenDayWeather from "../components/SevenDayWeather";

type currentPlace = {
  elevation: number;
  generationtime_ms: number;
  hourly: { time: number[]; temperature_2m: string[] };
  hourly_units: { time: string; temperature_2m: string };
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
};

const LocationDataPage: React.FC = () => {
  const { locationData } = useParams();

  // eslint-disable-next-line
  const [locationName, lat, lng] = locationData!.split("_");
  const [currentPlace, setCurrentPlace] = useState<currentPlace>();

  useEffect(() => {
    async function fetchData() {
      const data = await fetchPlaceDetails(+lat, +lng);
      setCurrentPlace({ ...data });
    }
    fetchData();
  }, [lat, lng]);

  return (
    <div className=" bg-blue-950 min-h-screen relative">
      <CurrentDataDisplay locationName={locationName} />
      <SevenDayWeather />
    </div>
  );
};

export default LocationDataPage;
