import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import Logo from "./Logo";

function Header() {
  const [isTop, setIsTop] = useState(true); // Use clear and descriptive variable names

  // Event handler for handling window scroll events
  const handleScroll = () => {
    const scrolled = window.pageYOffset > 10; // Use a variable for clarity
    setIsTop(!scrolled); // Invert logic for better readability
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // Cleanup function to remove event listener when component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Only run effect once on component mount

  return (
      <header
        className={`fixed w-full flex justify-between items-center px-36 pt-5 md:bg-opacity-90 transition duration-300 ease-in-out ${
          !isTop ? "bg-white backdrop-blur-sm shadow-lg" : ""
        }`}
      >
        <div className="shrink-0 mr-4">
          <Logo />
        </div>
        <div className="buttons flex gap-7 items-center">
          <a href="">
            <button className=" font-semibold">Sign in</button>
          </a>
          <a href="">
            <button className=" bg-black font-semibold rounded-md py-2 px-5 text-white flex items-center gap-1">Sign up <FaArrowRight className=" text-gray-500 font-bold" /></button>
          </a>
        </div>
      </header>
  );
}

export default Header;
