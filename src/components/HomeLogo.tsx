import { Link } from "react-router-dom";

const HomeLogo: React.FC = () => {
  return (
    <Link to="/">
      <div className="flex justify-center pt-12 mb-32">
        <img className=" w-48" src="/img/weatherboard-logo-white.png"></img>
      </div>
    </Link>
  );
};

export default HomeLogo;
