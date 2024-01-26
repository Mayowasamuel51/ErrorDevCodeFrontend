import { Link, Outlet } from "react-router-dom";
import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <div className="flex flex-wrap place-items-center">
        <section className="relative mx-auto">
          <nav className="flex justify-between bg-gray-900 text-white w-screen">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center">
              <Link className="text-3xl font-bold font-heading" to="/">
                <h1>Error-Dev</h1>
              </Link>

              <div className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                <Link className="hover:text-gray-200" to="/api">
                  Api
                </Link>
                <Link className="hover:text-gray-200" to="/error">
                  Store-Error
                </Link>
                <Link className="hover:text-gray-200" href="#">
                  Store-Solution
                </Link>
                <Link className="hover:text-gray-200" to="/url">
                  Store-Url's
                </Link>
              </div>
              <div className="hidden xl:flex items-center space-x-5 items-center">
                <a className="hover:text-gray-200" href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={handleMenuClick}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </nav>
          {/* <Menu isOpen={menuOpen}>
            <a className="menu-item" href="#">
              Homes
            </a>
            <a className="menu-item" href="#">
              Catagory
            </a>
            <a className="menu-item" href="#">
              Collections
            </a>
            <a className="menu-item" href="#">
              Contact Us
            </a>
          </Menu> */}
        </section>
      </div>

      <Outlet />
    </>
  );
};

export default Navbar;
