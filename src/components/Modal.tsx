import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import ModalSearch from "./ModalSearch";
import { useState } from "react";
type ModalProps = {
  handleClose: () => void;
};

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "-100vh",
    opacity: 0,
  },
};

const Modal: React.FC<ModalProps> = ({ handleClose }) => {
  const [searchError, setSearchError] = useState({
    isSet: false,
    message: "error",
  });

  const searchErrorHandler = (isSet: boolean, message: string) => {
    setSearchError({
      isSet: isSet,
      message: message,
    });
  };

  return (
    <Backdrop onClick={handleClose}>
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
      <motion.div
        className=" rounded-lg flex flex-col items-center px-8 py-4 bg-blue-950  w-full max-w-3xl mx-auto   "
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="text-white mb-6 text-xl">
          Choose your primary location
        </div>
        <ModalSearch onSearchError={searchErrorHandler} />
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
