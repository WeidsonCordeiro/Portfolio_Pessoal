import React, { useState, useEffect, useRef } from 'react';

const cosmicSymbols = "✧✩⚹☄✜⚝+*$#%&";

interface TextScrambleProps {
  text: string;
  startDelay?: number;
  scrambleSpeed?: number;
}

const TextScramble: React.FC<TextScrambleProps> = ({ 
  text, 
  startDelay = 0, 
  scrambleSpeed = 30 
}) => {
  const [displayText, setDisplayText] = useState("");
  const intervalRef = useRef<any>(null);
  const targetText = text;

  useEffect(() => {
    const decode = () => {
      let iteration = 0;
      clearInterval(intervalRef.current);
      
      intervalRef.current = setInterval(() => {
        const newText = targetText.split("")
          .map((char, index) => {
            if (index < iteration) {
              return targetText[index];
            }
            if (char === " ") return " ";
            return cosmicSymbols[Math.floor(Math.random() * cosmicSymbols.length)];
          })
          .join("");
          
        setDisplayText(newText);
        if (iteration >= targetText.length) {
          clearInterval(intervalRef.current);
        }
        iteration += 1 / 3; 
      }, scrambleSpeed); 
    };
    const startTimeout = setTimeout(decode, startDelay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(intervalRef.current);
    };
  }, [targetText, startDelay, scrambleSpeed]);

  return (
    <span 
      className="bg-clip-text text-transparent bg-gradient-to-r from-space-purple via-pink-500 to-blue-400"
      style={{
        backgroundSize: '200% auto',
        animation: 'shimmer 5s linear infinite',
      }}
    >
      {displayText}
    </span>
  );
};

export default TextScramble;