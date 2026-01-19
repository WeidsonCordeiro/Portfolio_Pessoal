import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loadingPhrase = "ESTÁ PREPARADO PARA ESSA IMERSÃO CÓSMICA?";

const CosmicLoader = ({ onLoadComplete }) => {
  const [isReadyToExit, setIsReadyToExit] = useState(false);
  const [showComponent, setShowComponent] = useState(true);

  const handleButtonClick = () => {
    setIsReadyToExit(true);
    onLoadComplete();

    setTimeout(() => setShowComponent(false), 1200);
  };

  if (!showComponent) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="cosmicLoader"
        className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-space-dark text-space-light"
        style={{ zIndex: 1000 }}
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{
          y: "-100vh",
          scaleY: 0.1,
          scaleX: 1.2,
          opacity: 0,
          transition: {
            duration: 1.2,
            ease: [0.7, 0.05, 0.3, 0.95],
          },
        }}
      >
        <motion.h1
          className="display-4 font-orbitron text-center mb-5 px-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5, type: "spring" }}
        >
          {loadingPhrase}
        </motion.h1>

        <motion.button
          className="btn btn-lg font-exo fw-semibold"
          style={{
            backgroundColor: "#1e1e3f",
            color: "#fff",
            borderRadius: "50px",
            boxShadow: "rgba(107, 33, 168, 0.4) 0px 0px 30px",
          }}
          onClick={handleButtonClick}
          disabled={isReadyToExit}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.8 }}
        >
          VAMOS!
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default CosmicLoader;
