import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import fetchPlaceName from "../utils/fetchPlaceName";
import slugify from "slugify";

type citySuggestions = {
  lng: string;
  lat: string;
  name: string;
  countryCode: string;
};

type data = {
  lng: string;
  geonameId: number;
  countryCode: string;
  name: string;
  toponymName: string;
  lat: string;
  fcl: string;
  fcode: string;
};

const WelcomeForm: React.FC = () => {
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
  };

  const searchClickHandler = () => {
    const slug = slugify(
      `${selectedCity?.name} ${selectedCity?.lat} ${selectedCity?.lng} `,
      "_"
    );
    navigate(`/${slug.toLowerCase()}`);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        if (userInput === "") return;
        const data = await fetchPlaceName(userInput);
        setCitySuggestions(
          data.geonames.map((el: data) => {
            return {
              lng: el.lng,
              lat: el.lat,
              name: el.name,
              countryCode: el.countryCode,
            };
          })
        );
      } catch (err) {
        console.log("error");
      }
    }
    fetchData();
  }, [userInput]);

  return (
    <div className=" rounded-xl py-12 px-4 max-w-4xl mx-auto">
      <div className="text-center  mb-8 utracking-tight  text-white text-3xl">
        <label>Enter a Location</label>
      </div>
      <div className="flex relative ">
        {" "}
        <input
          className="w-full   px-2 mb-8 rounded-l-xl focus:outline-none text-slate-900"
          onChange={onChangeHandler}
          type="text"
          id="place"
          value={userInput}
          name="place"
        ></input>
        {citySuggestions?.length !== 0 && (
          <ul className="absolute top-0 translate-y-[50px] left-0 bg-white w-full px-4 rounded-lg py-2">
            {citySuggestions?.map((city) => {
              return (
                <li
                  key={city.lat}
                  onClick={() => suggestionClickHandler(city)}
                  className="py-2"
                >{`${city.name}, ${city.countryCode}`}</li>
              );
            })}
          </ul>
        )}
        {/* <datalist id="places">
          {citySuggestions?.map((sug) => {
            return (
              <option>{`${sug.name}${
                sug.countryCode === undefined ? "" : `, ${sug.countryCode}`
              }`}</option>
            );
          })}
        </datalist> */}
        <div className="text-center">
          {" "}
          <button
            onClick={searchClickHandler}
            className=" rounded-r-xl text-lg mb-8  tracking-wide bg-blue-900 text-white   font-bold px-8 py-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </div>

      <Link to="">
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-blue-300 mr-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-center text-blue-300 ">
            Setup your primary location
          </div>{" "}
        </div>
      </Link>
    </div>
  );
};

export default WelcomeForm;
