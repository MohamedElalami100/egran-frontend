import React, { useState, useEffect } from "react";

// Function to convert custom markers to HTML
const formatText = (text) => {
  if (!text) {
    return "";
  }
  return text
    ?.replace(/--bold--(.*?)--bold--/g, "<strong>$1</strong>")
    ?.replace(/--italic--(.*?)--italic--/g, "<em>$1</em>")
    ?.replace(/<br>/g, "<br>"); // Ensure line breaks are correctly formatted
};

const AiTextAnimation = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const formattedText = formatText(text);

  useEffect(() => {
    setDisplayText("");
    let currentIndex = -1;
    const intervalId = setInterval(() => {
      if (currentIndex < formattedText.length - 1) {
        setDisplayText((prev) => prev + formattedText[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 10); // Speed of typing effect (lower for faster)

    return () => clearInterval(intervalId);
  }, [formattedText]);

  return (
    <p
      className="mt-[20px] font-sans text-lg text-gray-800 dark:text-gray-200 leading-relaxed tracking-wide"
      dangerouslySetInnerHTML={{ __html: displayText }}
    />
  );
};

export default AiTextAnimation;
