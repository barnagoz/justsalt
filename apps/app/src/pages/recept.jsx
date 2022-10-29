import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

function Recept(props) {
  let { id } = useParams();
  let mostanirecept = props.Receptek.filter((item) => item._id === id);
  mostanirecept = mostanirecept[0];
  console.log(mostanirecept);
  return (
    <div>
      {mostanirecept ? (
        <div className="w-full max-w-screen-2xl mr-auto ml-auto ">
          <Helmet>
            <title>{mostanirecept.name} | justsalt</title>
          </Helmet>
          <img
            className="w-full h-screen2  object-cover  "
            src={mostanirecept.piclink}
            alt="adott recept lefotozva "
          ></img>
          <div className=" flex -mt-20 w-full ">
            <div className=" mr-auto ml-auto  pt-2 pb-2 glassbck w-auto p-4">
              <h1 className=" text-center text-3xl text-white  w-auto font-semibold   ">
                {mostanirecept.name}
              </h1>
              <h1 className=" text-3xl text-white ml-10">
                {mostanirecept.szerzoid}
              </h1>
            </div>
          </div>
          <div className=" bg-red-400 p-2 pt-6  pb-6 mt-6">
            <h1 className=" text-center text-white text-3xl   font-medium tracking-wide border-b-2 pb-2">
              Hozzávalók
            </h1>
            <ul className="ml-4 list-disc flex items-center flex-wrap text-white font-light text-lg pt-4  ">
              {mostanirecept.hozzavalok.map((item) => (
                <li className="p-1 ml-2 w-full">
                  <p className="inline">{item.hozzavalo + " "} </p>
                  <p className="inline">{item.mennyiseg} </p>
                  <p className="inline">{item.mennyisegfajta}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className=" p-2">
            <h1 className="text-center  text-red-400 text-3xl pt-2 font-medium tracking-wide border-b-2 csmbordercolor pb-2">
              Elkészítés
            </h1>
            <p className="p-2 szurkitett leading-loose  font-light break-normal text-lg">
              {mostanirecept.elkeszites}
            </p>
          </div>
        </div>
      ) : (
        <>
          <Helmet>
            <title>Hibás recept | justsalt</title>
          </Helmet>
        </>
      )}
    </div>
  );
}

Recept.propTypes = {};

export default Recept;
