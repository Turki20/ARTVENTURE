import { useState, useEffect } from "react";
import { Link } from "react-router";
import Button from "./Button";
const ButtonsSection = () => {
    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 500) {
          setShowButtons(true);
        } else {
          setShowButtons(false);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

  return (
    <div className="buttonSection" style={{ opacity: showButtons ? 1 : 0, transform: showButtons ? "translateY(0)" : "translateY(50px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
      <Button label="Explore" route="/home" />
    </div>
  );
};

export default ButtonsSection;
