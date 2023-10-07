import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import fetchPlaceName from "../utils/fetchPlaceName";
import slugify from "slugify";
import { usePrimaryLocation } from "../store/primaryLocationContext";

type citySuggestions = {
  lng: string;
  lat: string;
  name: string;
  countryCode: string;
};

type data = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  timezone: string;
  population: number;
  postcodes: string[];
  country_id: number;
  country: string;
};

/*
  Appears once the setup primary location button is pressed on the home page. User can then search for locations and add them as a primary location. 

*/

type ModalSearchProps = {
  onSearchError: (isSet: boolean, message: string) => void;
};

const ModalSearch: React.FC<ModalSearchProps> = ({ onSearchError }) => {
  const [userInput, setUserInput] = useState("");

  //suggestions that display in the dropdown menu
  const [citySuggestions, setCitySuggestions] = useState<citySuggestions[]>([]);

  const { addPrimaryLocation } = usePrimaryLocation();

  //city that the user selects from the list
  const [selectedCity, setSelectedCity] = useState<citySuggestions>();

  const navigate = useNavigate();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const suggestionClickHandler = (city: citySuggestions) => {
    setSelectedCity(city);
    setUserInput(city.name);
    onSearchError(false, "");
  };

  const searchClickHandler = () => {
    //add city as the primary location inside local storage
    if (selectedCity !== undefined && selectedCity.name === userInput) {
      addPrimaryLocation({
        name: selectedCity.name,
        lat: selectedCity.lat,
        lng: selectedCity.lng,
      });

      //navigate to the city data display
      const citySlug = slugify(selectedCity.name);
      const lat = selectedCity.lat.toString();
      const lng = selectedCity.lng.toString();
      const latSlug = slugify(lat.replace(".", "+"));
      const lngSlug = slugify(lng.replace(".", "+"));
      const slug = slugify(`${citySlug} ${latSlug} ${lngSlug} `, "_");
      navigate(`/${slug}`);
    } else {
      onSearchError(true, "Please select a location from the suggestions");
    }
  };

  useEffect(() => {
    //fetches data for suggestion display based on search query
    const controller = new AbortController();
    async function fetchData() {
      try {
        if (userInput === "") return;
        const data = await fetchPlaceName(userInput);

        setCitySuggestions(
          data.results.map((el: data) => {
            return {
              lng: el.longitude,
              lat: el.latitude,
              name: el.name,
              countryCode: el.country_code,
            };
          })
        );
      } catch (err) {
        console.log("error");
      }
    }
    fetchData();

    return () => {
      controller.abort();
    };
  }, [userInput]);

  return (
    <div className="flex relative z-10 w-full ">
      {" "}
      <input
        className={`w-full   px-2 mb-8 rounded-l-xl focus:outline-none text-slate-900 ${
          selectedCity !== undefined && selectedCity.name === userInput
            ? "bg-green-200"
            : ""
        } `}
        onChange={onChangeHandler}
        type="text"
        id="place"
        value={userInput}
        name="place"
        autoComplete="off"
      ></input>
      {citySuggestions?.length !== 0 && (
        <ul className="absolute top-0 translate-y-[50px] left-0 bg-white w-full  rounded-lg py-2">
          {citySuggestions?.map((city) => {
            return (
              <li
                key={city.lat}
                onClick={() => suggestionClickHandler(city)}
                className="py-2 px-4 hover:cursor-pointer hover:bg-blue-200 transition-all duration-200"
              >{`${city.name}, ${city.countryCode}`}</li>
            );
          })}
        </ul>
      )}
      <div className="text-center">
        {" "}
        <button
          onClick={searchClickHandler}
          className=" rounded-r-xl text-lg mb-8  tracking-wide bg-blue-900 text-white   font-bold px-8 py-2 hover:bg-blue-500 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ModalSearch;
