import { useState, useEffect } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

const TypingText = ({ text, speed = 25, delay = 600, className = "" }: TypingTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return (
    <p className={`${className} ${isTyping ? "typing-cursor" : ""}`}>
      {displayedText}
    </p>
  );
};

export default TypingText;
