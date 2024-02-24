import React, { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import Logo from "./Logo";
import { app } from "../firebase.config";
import {
  getIdToken,
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";

function Header() {
  const [isTop, setIsTop] = useState(false); // Use clear and descriptive variable names

  // Event handler for handling window scroll events
  const handleScroll = () => {
    const scrolled = window.pageYOffset > 10; // Use a variable for clarity
    setIsTop(!scrolled); // Invert logic for better readability
  };
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const loginwihGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedInUser = result.user;
        // console.log(loggedInUser);
        setToken(loggedInUser);
        window.localStorage.setItem("user", loggedInUser.email);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };
  const signout = () => {
    signOut(auth)
      .then((user) => {
        window.localStorage.removeItem("ACCESS_TOKEN");
        window.localStorage.removeItem("user");
        setToken(null);
      })
      .catch((err) => console.log(err.message));
  };

  React.useEffect(() => {
    auth.onAuthStateChanged((loggedInUser) => {
      if (loggedInUser) {
        loggedInUser
          .getIdToken()
          .then((token) => {
            console.log(token);
            window.localStorage.setItem("user", loggedInUser.email);
            setToken(token);
            setImageGoogle(loggedInUser.photoURL);
            navigate("/dashboard");
          })
          .catch((err) => console.log(err.message));
      }
    });
  }, []);
  // Only run effect once on component mount

  return (
    <div>
      {" "}
      <header
        style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
        className="  w-full flex justify-between items-center px-36 p-5 pt-5   duration-300 ease-in-out"
      >
        <div className="shrink-0 mr-4">
          <Logo />
        </div>
        <div className="flex gap-7 items-center">
          <a href="">
            <button className=" btn btn-blue font-semibold">Reach Out</button>
          </a>
          <a href="">
            <button className=" btn btn-blue font-semibold">My Services </button>
          </a>

          <button
            onClick={loginwihGoogle}
            className="btn-sm p-4 text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
          >
            Signin
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
