import React, { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import Logo from "./Logo";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { app } from "../firebase.config";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import IconButton from "@mui/material/IconButton";
import {
  getIdToken,
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useStateContext } from "../context/ContextProvider";
import { Box, Menu } from "@mui/material";

function Header() {
  const navigate = useNavigate();
  const { token, setToken } = useStateContext();
  const [imageGoogle, setImageGoogle] = useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isTop, setIsTop] = useState(false); // Use clear and descriptive variable names
  // Event handler for handling window scroll events
  const handleScroll = () => {
    const scrolled = window.pageYOffset > 10; // Use a variable for clarity
    setIsTop(!scrolled); // Invert logic for better readability
  };
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
            // console.log(token);
            window.localStorage.setItem("user", loggedInUser.email);
            setToken(token);
            setImageGoogle(loggedInUser.photoURL);
            navigate("/dashboard");
          })
          .catch((err) => console.log(err.message));
      }
    });
  }, []);

  return (
    <div>
      {" "}
      {token ? (
        <header
          style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
          className="fixed bg-white  w-full flex justify-between items-center md:px-36 p-5 pt-5 duration-300 ease-in-out"
        >
          <div className="shrink-0 mr-4">
            <Logo />
          </div>
          <div className="flex gap-20 items-center">
            <ul className="font-semibold p-1 relative hidden md:flex">
              <motion.li transition={{ stiffness: 250 }}>
                <NavLink
                  style={{ paddingLeft: "20px" }}
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-black"
                      : "scale-100 hover:text-BLUE"
                  }
                  to="/dashboard/websiteurl"
                >
                  Website Url
                </NavLink>
              </motion.li>
              <motion.li transition={{ stiffness: 250 }}>
                <NavLink
                  style={{ paddingLeft: "20px" }}
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-black"
                      : "scale-100 hover:text-BLUE"
                  }
                  to="/dashboard/apikeys"
                >
                  Store Api Key's
                </NavLink>
              </motion.li>

              <motion.li transition={{ stiffness: 250 }}>
                <NavLink
                  style={{ paddingLeft: "20px" }}
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-black"
                      : "scale-100 hover:text-BLUE"
                  }
                  to="/dashboard/portfoilo"
                >
                  Add Portfoilo
                </NavLink>
              </motion.li>

              {/* <motion.li transition={{ stiffness: 250 }}>
                <NavLink
                  style={{ paddingLeft: "20px" }}
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-black"
                      : "scale-100 hover:text-BLUE"
                  }
                  to="/dashboard/errorcode"
                >
                  Store Code Error
                </NavLink>
              </motion.li> */}
              {/* <motion.li transition={{ stiffness: 250 }}>
                <NavLink
                  style={{ paddingLeft: "20px" }}
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-black"
                      : "scale-100 hover:text-BLUE"
                  }
                  to="/dashboard/seeportfoilo"
                >
                  see portfoilo's
                </NavLink>
              </motion.li> */}
            </ul>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={`${imageGoogle}`} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <div>
                  {" "}
                  <ul className="font-semibold p-3 leading-[30px]">
                    <motion.li transition={{ stiffness: 250 }}>
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? "text-black font-black"
                            : "scale-100 hover:text-BLUE"
                        }
                        to="/dashboard/websiteurl"
                      >
                        Website Url
                      </NavLink>
                    </motion.li>
                    <motion.li transition={{ stiffness: 250 }}>
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? "text-black font-black"
                            : "scale-100 hover:text-BLUE"
                        }
                        to="/dashboard/apikeys"
                      >
                        Store Api Key's
                      </NavLink>
                    </motion.li>
                    {/* <motion.li transition={{ stiffness: 250 }}>
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? "text-black font-black"
                            : "scale-100 hover:text-BLUE"
                        }
                        to="/dashboard/apikeys"
                      >
                        Store images
                      </NavLink>
                    </motion.li> */}
                    <motion.li transition={{ stiffness: 250 }}>
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? "text-black font-black"
                            : "scale-100 hover:text-BLUE"
                        }
                        to="/mentorship"
                      >
                        Add Portfolio
                      </NavLink>
                    </motion.li>

                    {/* <motion.li transition={{ stiffness: 250 }}>
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? "text-black font-black"
                            : "scale-100 hover:text-BLUE"
                        }
                        to="/mentorship"
                      >
                        Store Simple Text
                      </NavLink>
                    </motion.li>
                    <motion.li transition={{ stiffness: 250 }}> */}
                      {/* <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? "text-black font-black"
                            : "scale-100 hover:text-BLUE"
                        }
                        to="/dashboard/links"
                      >
                        Links
                      </NavLink> */}
                    {/* </motion.li> */}
                    <li
                      onClick={signout}
                      className="hover:bg-transparent hover:text-BLUE duration-300 text-red-500 rounded-md md:rounded-xl font-semibold cursor-pointer"
                    >
                      Sign Out
                    </li>
                  </ul>
                </div>
              </Menu>
            </Box>
            <button
              onClick={signout}
              className="btn-sm p-4 text-white-200 bg-red-900 text-white "
            >
              SignOut
            </button>
          </div>
        </header>
      ) : (
        <header
          style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
          className="w-full flex justify-between items-center md:px-36 p-5 pt-5 duration-300 ease-in-out"
        >
          <div className="shrink-0 mr-4">
            <Logo />
          </div>
          <div className="flex gap-7 items-center">
            <a href="">
              {/* <button className=" btn btn-blue font-semibold">Blogs</button> */}
            </a>
            <a href="https://main-port.vercel.app/">
              <button className=" btn btn-blue font-semibold">
                My Services{" "}
              </button>
            </a>

            <button
              onClick={loginwihGoogle}
              className="btn-sm p-4 text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
            >
              Signin
            </button>
          </div>
        </header>
      )}
    </div>
  );
}

export default Header;
