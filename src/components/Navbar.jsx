import * as React from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { Link, Navigate, useNavigate, NavLink } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import GOOGLE from "../assets/images/google.png";
const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
import { useStateContext } from "../context/ContextProvider";
import { app } from "../firebase.config";
import {
  getIdToken,
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import Header from "./Header";
function Navbar() {
  // const notifyfail = () => toast("Kindly refresh your browser ");
  const navigate = useNavigate();
  const [imageGoogle, setImageGoogle] = React.useState("");
  const { setToken, token } = useStateContext();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
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
    <>
      <Header />
    </>
  );
}
export default Navbar;
// www.linkedin.com/in/mayowa-odukoya-012439215
