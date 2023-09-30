import { useEffect, useState } from "react";
import HomeLogo from "../components/HomeLogo";
import WelcomeForm from "../components/WelcomeForm";
import Modal from "../components/Modal";
import { AnimatePresence } from "framer-motion";
import { usePrimaryLocation } from "../store/primaryLocationContext";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";

const WelcomePage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchError, setSearchError] = useState({
    isSet: false,
    message: "error",
  });
  const { primaryLocation, addPrimaryLocation } = usePrimaryLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const locationString = localStorage.getItem("LOCATION");

    if (locationString !== null) {
      addPrimaryLocation(JSON.parse(locationString));
    }
  }, [addPrimaryLocation]);

  if (primaryLocation !== undefined) {
    const citySlug = slugify(primaryLocation.name);

    const slug = slugify(
      `${citySlug} ${primaryLocation.lat} ${primaryLocation.lng} `,
      "_"
    );
    navigate(`/${slug}`);
  }

  const searchErrorHandler = (isSet: boolean, message: string) => {
    setSearchError({
      isSet: isSet,
      message: message,
    });
  };

  const setPrimaryLocationHandler = () => {
    setModalOpen(true);
  };

  const modalCloseHandler = () => {
    setModalOpen(false);
  };

  return (
    <div className=" bg-blue-950  h-screen bg-cover px-6 relative">
      <AnimatePresence>
        {modalOpen && <Modal handleClose={modalCloseHandler} />}
      </AnimatePresence>

      {searchError.isSet && (
        <div className="absolute top-0 left-0 px-4 py-2 bg-red-300 text-red-900 w-full flex justify-center ">
          <div className="mr-2">
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
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <div> {searchError.message}</div>
        </div>
      )}
      <HomeLogo />
      <WelcomeForm
        onSetPrimaryLocation={setPrimaryLocationHandler}
        onSearchError={searchErrorHandler}
      />
    </div>
  );
};

export default WelcomePage;
