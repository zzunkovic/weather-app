import { Link } from "react-router-dom";

type ErrorPageProps = {
  message: string;
};

const ErrorPage: React.FC<ErrorPageProps> = ({
  message = "Something went wrong",
}) => {
  return (
    <div className="h-screen w-full bg-blue-950 text-white text-2xl flex flex-col justify-center items-center">
      <div className="font-bold mb-2">{message}</div>
      <div className="text-lg text-blue-300 mb-8">Please try again</div>
      <Link to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </Link>
    </div>
  );
};

export default ErrorPage;
