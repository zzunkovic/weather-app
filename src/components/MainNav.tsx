import { Link } from "react-router-dom";

const MainNav: React.FC = () => {
  return (
    <div className="flex justify-between py-2 px-4 items-center">
      <Link to="/">
        <div className="  w-40 lg:w-48">
          <img src="/img/weatherboard-logo-white.png"></img>
        </div>
      </Link>

      <div>
        <Link to="/search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default MainNav;
