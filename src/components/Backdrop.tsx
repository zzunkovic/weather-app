import { motion } from "framer-motion";

type BackdropProps = {
  children: React.ReactNode;
  onClick: () => void;
};

const Backdrop: React.FC<BackdropProps> = ({ children, onClick }) => {
  return (
    <motion.div
      className="absolute top-0 left-0 h-full w-full bg-black/70 flex items-center px-4  z-50 "
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
