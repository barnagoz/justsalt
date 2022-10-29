/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import GeneralTab from "../components/GeneralTab";
import AddRecipeTab from "../components/AddRecipeTab";
import SecurityTab from "../components/SecurityTab";
import MyRecipesTab from "../components/MyRecipesTab";
import { components } from "react-select";

function MyProfile(props) {
  const [shownPage, setShownPage] = useState(0);
  return (
    <div>
      <Helmet>
        <title>Saját profilom | justsalt</title>
      </Helmet>
      <div className="w-full pt-13 flex lg:flex-row flex-col lg:h-screen bg-white z-50">
        <div className={"h-1/5 w-screen lg:w-1/5 bg-red-100  lg:h-full"}>
          <button
            className={shownPage == 0 ? "w-full p-2 underline" : "w-full p-2"}
            onClick={() => {
              setShownPage(0);
            }}
          >
            <h1>Általános beállítások</h1>
          </button>
          <button
            className={shownPage == 1 ? "w-full p-2 underline" : "w-full p-2"}
            onClick={() => {
              setShownPage(1);
            }}
          >
            <h1>Recept feltöltés</h1>
          </button>
          <button
            className={shownPage == 3 ? "w-full p-2 underline" : "w-full p-2"}
            onClick={() => {
              setShownPage(3);
            }}
          >
            <h1>Receptjeim</h1>
          </button>
          <button
            className={shownPage == 2 ? "w-full p-2 underline" : "w-full p-2"}
            onClick={() => {
              setShownPage(2);
            }}
          >
            <h1>Biztonság és jelszó</h1>
          </button>
        </div>
        <div className="w-full lg:w-4/5 h-screen lg:h-full lg:overflow-scroll">
          {shownPage == 0 && <GeneralTab URL={props.URL}></GeneralTab>}
          {shownPage == 1 && (
            <AddRecipeTab
              baseStateUpdateFn={props.baseStateUpdateFn}
              URL={props.URL}
              Alapanyagok={props.Alapanyagok}
              setAlapanyagok={props.setAlapanyagok}
            ></AddRecipeTab>
          )}
          {shownPage == 2 && <SecurityTab URL={props.URL}></SecurityTab>}
          {shownPage == 3 && (
            <MyRecipesTab
              Alapanyagok={props.Alapanyagok}
              setAlapanyagok={props.setAlapanyagok}
              Receptek={props.Receptek}
              setReceptek={props.setReceptek}
              baseStateUpdateFn={props.baseStateUpdateFn}
              URL={props.URL}
            ></MyRecipesTab>
          )}
        </div>
      </div>
    </div>
  );
}

MyProfile.propTypes = {};

export default MyProfile;
