import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import fetchPlaceName from "../utils/fetchPlaceName";
import slugify from "slugify";

type citySuggestions = {
  lng: string;
  lat: string;
  name: string;
  countryCode: string;
};

// type data = {
//   lng: string;
//   geonameId: number;
//   countryCode: string;
//   name: string;
//   toponymName: string;
//   lat: string;
//   fcl: string;
//   fcode: string;
// };

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
  Allows the user to search for different cities

*/

type WelcomeFormProps = {
  onSearchError: (isSet: boolean, message: string) => void;
};

const SearchForm: React.FC<WelcomeFormProps> = ({ onSearchError }) => {
  const [userInput, setUserInput] = useState("");
  const [citySuggestions, setCitySuggestions] = useState<citySuggestions[]>([]);
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
    //navigate to the selected city
    if (selectedCity !== undefined && selectedCity.name === userInput) {
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
        //
      }
    }
    fetchData();

    return () => {
      controller.abort();
    };
  }, [userInput]);

  return (
    <div className=" rounded-xl py-12 px-4 max-w-4xl mx-auto">
      <div className="text-center  mb-4   text-white text-2xl lg:text-3xl">
        <label htmlFor="place">Enter a Location</label>
      </div>
      <div className="flex relative ">
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
