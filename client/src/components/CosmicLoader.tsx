
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 

const loadingPhrase = "ESTÁ PREPARADO PARA ESSA IMERSÃO CÓSMICA?";

interface CosmicLoaderProps {
  onLoadComplete: () => void;
}

const CosmicLoader: React.FC<CosmicLoaderProps> = ({ onLoadComplete }) => {
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
        className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-space-dark text-space-light"
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        
        exit={{ 
          y: '-100vh', 
          scaleY: 0.1, 
          scaleX: 1.2, 
          opacity: 0,
          transition: { 
            duration: 1.2, 
            ease: [0.7, 0.05, 0.3, 0.95], 
          }
        }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-orbitron text-center mb-12 px-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5, type: "spring" }}
        >
          {loadingPhrase}
        </motion.h1>

        <motion.button
          className="px-8 py-3 bg-space-blue text-white font-exo font-semibold rounded-full 
                     shadow-xl shadow-space-purple/40 hover:shadow-space-purple/80 transition-all 
                     duration-500 transform hover:scale-105"
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