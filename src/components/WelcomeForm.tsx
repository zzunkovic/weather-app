import { Link } from "react-router-dom";

const WelcomeForm: React.FC = () => {
  return (
    <div className=" rounded-xl py-12 px-4 max-w-4xl mx-auto">
      <div className="text-center  mb-8 utracking-tight  text-white text-3xl font-bold">
        <label>Enter a Location</label>
      </div>
      <div className="flex">
        {" "}
        <input className="w-full  px-2 mb-8 rounded-l-xl focus:outline-none text-slate-900"></input>
        <div className="text-center">
          {" "}
          <button className=" rounded-r-xl text-lg mb-8  tracking-wide bg-blue-900 text-white   font-bold px-8 py-2">
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
        <div className="text-center text-blue-300 ">Search with map</div>
      </Link>
    </div>
  );
};

export default WelcomeForm;
