import React, { useState } from "react";
import { Link } from "react-router-dom";

function Nav(props) {
  const [isopen, setIsOpen] = useState(false);
  return (
    <>
      <nav className="hidden lg:flex w-full  bg-red-200  justify-between items-center  fixed top-0 left-0 h-20px z-50 p-2">
        <Link className="cursor-pointer" to="/">
          Kezdőlap
        </Link>
        <Link className="cursor-pointer" to="/receptek">
          Receptek
        </Link>
        <div className="  flex justify-center  ">
          <Link className="cursor-pointer" to="/">
            <h1 className="font-sans font-semibold italic text-3xl text-red-400 m-0 font-montserrat">
              JUSTSALT
            </h1>
          </Link>
        </div>

        <Link className="cursor-pointer" to="/myprofile">
          Profilom
        </Link>
        {props.isAuthenticated === true ? (
          <button
            onClick={() => {
              props.setIsAuthenticated(false);
              localStorage.removeItem("token");
            }}
          >
            Kijelentkezés
          </button>
        ) : (
          <Link className="cursor-pointer" to="/login/home">
            Bejelentkezés
          </Link>
        )}
      </nav>
      <nav className="w-full lg:hidden bg-red-200  justify-between items-center  fixed top-0 left-0 h-20px z-50 p-2">
        <div className="w-full flex-nowrap flex justify-center   items-center">
          <div className="w-1/6"></div>
          <Link className="cursor-pointer ml-auto mr-auto" to="/">
            <h1 className="ml-auto mr-auto font-sans font-semibold italic text-3xl text-red-400 m-0 font-montserrat">
              JUSTSALT
            </h1>
          </Link>
          <button
            className=" w-1/6 flex items-center justify-center"
            onClick={() => setIsOpen(!isopen)}
          >
            <svg
              viewBox="0 0 100 80"
              width="40"
              fill="rgb(245, 113, 113)"
              height="40"
            >
              <rect rx="10" width="100" height="20"></rect>
              <rect rx="10" y="30" width="100" height="20"></rect>
              <rect rx="10" y="60" width="100" height="20"></rect>
            </svg>
          </button>
        </div>
        {isopen && (
          <div className="w-full text-center text-xl font-montserrat">
            <div>
              <Link className="cursor-pointer" to="/">
                Kezdőlap
              </Link>
            </div>
            <div>
              <Link className="cursor-pointer" to="/receptek">
                Receptek
              </Link>
            </div>
            <div>
              <Link className="cursor-pointer" to="/myprofile">
                Profilom
              </Link>
            </div>
            <div>
              {props.isAuthenticated === true ? (
                <button
                  onClick={() => {
                    props.setIsAuthenticated(false);
                    localStorage.removeItem("token");
                  }}
                >
                  Kijelentkezés
                </button>
              ) : (
                <Link className="cursor-pointer" to="/login/home">
                  Bejelentkezés
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Nav;
