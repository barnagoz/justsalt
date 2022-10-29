import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import RecipeCard from "../components/RecipeCard";

function home(props) {
  return (
    <>
      <Helmet>
        <title>Kezdőlap | justsalt</title>
      </Helmet>
      <div className="header bg-cover  w-full  mt-8 h-96 inline-block">
        <h1 className="mb-4  font-bold text-6xl lg:text-8xl text-center mt-20  text-white">
          Főzz velünk!
        </h1>
        <div className=" m-0  flex items-center relative  w-full  justify-center">
        <Link
            to="/register"
            className="  mr-2  bg-white  rounded-xl py-2 px-3 inline-block"
          >
            Regisztráció
          </Link>
          <Link
            to="/receptek"
            className="  ml-2 bg-white  rounded-xl py-2 px-3 inline-block text-center"
          >
            Receptek
           
          </Link>
        </div>
      </div>
      <div className="w-full  h-auto pt-2 pb-2 bg-red-400 mt-0 text-center">
        <h2 className="m-0  text-white text-2xl">
          Nézz meg pár olyan receptet amelyet mi is kipróbáltunk:
        </h2>
      </div>
      <div className="w-full h-auto bg-red-200  flex  justify-evenly flex-wrap">
        {
          // eslint-disable-next-line array-callback-return
          props.Receptek.map((item, index) => {
            if (index < 4) {
              return (
                <RecipeCard URL={props.URL} item={item}></RecipeCard>
              );
            }
          })
        }
      </div>
    </>
  );
}

export default home;
