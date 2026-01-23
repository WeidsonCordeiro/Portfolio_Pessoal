import { useState, useEffect, useRef } from "react";

const cosmicSymbols = "✧✩⚹☄✜⚝+*$#%&";

const TextScramble = ({ text, startDelay = 0, scrambleSpeed = 30 }) => {
  const [displayText, setDisplayText] = useState("");
  const intervalRef = useRef(null);
  const targetText = text;

  // useEffect(() => {
  //   const decode = () => {
  //     let iteration = 0;
  //     clearInterval(intervalRef.current);

  //     intervalRef.current = setInterval(() => {
  //       const newText = targetText
  //         .split("")
  //         .map((char, index) => {
  //           if (index < iteration) {
  //             return targetText[index];
  //           }
  //           if (char === " ") return " ";
  //           return cosmicSymbols[
  //             Math.floor(Math.random() * cosmicSymbols.length)
  //           ];
  //         })
  //         .join("");

  //       setDisplayText(newText);
  //       if (iteration >= targetText.length) {
  //         clearInterval(intervalRef.current);
  //       }
  //       iteration += 1 / 3;
  //     }, scrambleSpeed);
  //   };
  //   const startTimeout = setTimeout(decode, startDelay);

  //   return () => {
  //     clearTimeout(startTimeout);
  //     clearInterval(intervalRef.current);
  //   };
  // }, [targetText, startDelay, scrambleSpeed]);

  return (
    <span
      style={{
        backgroundImage: "linear-gradient(to right, #6b21a8, #ec4899, #60a5fa)",
        backgroundSize: "200% auto",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        animation: "shimmer 5s linear infinite",
      }}
    >
      {text}
    </span>
  );
};

export default TextScramble;
