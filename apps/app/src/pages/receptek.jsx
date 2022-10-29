/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Select from "react-select";

import { Helmet } from "react-helmet";
import RecipeCard from "../components/RecipeCard";

function Receptek(props) {
  const [alapanyagszuro, setAlapanyagszuro] = useState([{}]);
  const [alapanyagszuro2, setAlapanyagszuro2] = useState([{}]);
  // eslint-disable-next-line no-unused-vars
  const [milegyenbenne, setMilegyenbenne] = useState([]);
  const [szurtreceptek, setszurtreceptek] = useState([]);
  const [alapanyagok, setAlapanyagok] = useState([]);

  useEffect(() => {
    setAlapanyagok(props.Alapanyagok);
    console.log(szurtreceptek);
  }, [props.Alapanyagok]);

  function filteritemadder() {
    setAlapanyagszuro([...alapanyagszuro, {}]);
  }
  function filteritemadder2() {
    setAlapanyagszuro2([...alapanyagszuro2, {}]);
  }
  function filtersetter(e, i) {
    console.log(e, i);
    let temp = [...alapanyagszuro];

    temp[i] = e;
    setAlapanyagszuro(temp);
  }
  useEffect(() => {
    let indexes = [];
    let temp = [...props.Alapanyagok];
    console.log("1", alapanyagszuro);
    console.log("2", alapanyagszuro2);

    temp.map((alapanyag, i) => {
      alapanyagszuro.map((hozzavalo) => {
        console.log(alapanyag, hozzavalo);
        if (alapanyag === hozzavalo) {
          indexes.push(i);
        }
      });
    });

    temp.map((alapanyag, i) => {
      alapanyagszuro2.map((hozzavalo) => {
        console.log(alapanyag, hozzavalo);
        if (alapanyag === hozzavalo) {
          indexes.push(i);
        }
      });
    });
    console.log(indexes);

    indexes.sort();
    indexes.reverse();
    indexes.map((index) => {
      temp.splice(index, 1);
    });

    setAlapanyagok(temp);
  }, [alapanyagszuro, alapanyagszuro2]);

  function filtersetter2(e, i) {
    console.log(e, i);
    let temp = [...alapanyagszuro2];

    temp[i] = e;
    setAlapanyagszuro2(temp);
  }
  // eslint-disable-next-line no-unused-vars
  const isEmpty = (inputObject) => {
    return Object.keys(inputObject).length === 0;
  };
  useEffect(() => {
    setszurtreceptek([...props.Receptek]);
  }, [props.Receptek]);

  useEffect(() => {
    let szurtreceptektemp = [];
    let temp = [...props.Receptek];

    if (
      Object.keys(alapanyagszuro2).length > 0 &&
      Object.keys(alapanyagszuro2[0]).length !== 0
    ) {
      temp.forEach((recept) => {
        const hozzaadjuke = [];

        alapanyagszuro2.forEach((szuro) => {
          const bool = recept.hozzavalok.find(
            (hozzavalo) => hozzavalo.hozzavalo === szuro.label
          );
          if (bool !== undefined) {
            hozzaadjuke.push(true);
          }
        });

        if (hozzaadjuke.length === alapanyagszuro2.length) {
          //Ha annyiszor raktuk bele a truet amennyire hosszu a szuro, az azt jelenti, hogy minden szurofeltetlnek megfelelt
          szurtreceptektemp.push(recept);
        }
      });
    } else {
      szurtreceptektemp = temp;
    }

    //most ujra vegig megyunk a mar bent levo recepteken, es amelyiket kikell venni, annak elmentjuk az indexét a törléshez
    let indexek = [];
    if (
      Object.keys(alapanyagszuro).length > 0 &&
      Object.keys(alapanyagszuro[0]).length !== 0
    ) {
      // eslint-disable-next-line array-callback-return
      szurtreceptektemp.map((recept, index) => {
        // eslint-disable-next-line array-callback-return
        alapanyagszuro.map((szuro) => {
          const bool = recept.hozzavalok.find(
            (hozzavalo) => hozzavalo.hozzavalo === szuro.label
          );
          if (bool !== undefined) {
            indexek.push(index);
          }
        });
      });
    }

    //forditsuk meg h a torlesnel ne kuszalja ossze az indexeket
    //legyen 1 index csak 1x
    indexek = indexek.reverse();
    indexek = new Set([...indexek]);

    indexek.forEach((i) => {
      szurtreceptektemp.splice(i, 1);
    });
    console.log(szurtreceptektemp);
    setszurtreceptek(szurtreceptektemp);
  }, [alapanyagszuro, alapanyagszuro2, props.Receptek]);

  const handleszuro2delete = (index) => {
    let temp = [...alapanyagszuro2];
    temp.splice(index, 1);

    setAlapanyagszuro2(temp);
  };

  const handleszurodelete = (index) => {
    let temp = [...alapanyagszuro];
    temp.splice(index, 1);

    setAlapanyagszuro(temp);
  };
  return (
    <>
      <Helmet>
        <title>Receptek | justsalt</title>
      </Helmet>
      <div className="  mt-12 w-full h-auto text-center pt-8 pb-8 bg-cover bghero">
        <div className="mr-auto ml-auto  pt-2 pb-2 glassbck2 w-auto p-4">
          <h2 className="text-white font-sans text-4xl">
            Felhasználóink receptjei
          </h2>
        </div>
      </div>
      <div className="bg-grey flex h-auto flex-wrap">
        <div className="ossz-filter">
          <h1 className="ml-4">Mi maradjon ki a receptből?</h1>
          {alapanyagszuro.map((item, index) => (
            <div className="flex w-auto ml-4">
              <Select
                onChange={(e) => filtersetter(e, index)}
                value={
                  Object.keys(alapanyagszuro[index]).length === 0
                    ? {
                        value: "Válassz alapanyagot!",
                        label: "Válassz alapanyagot!",
                      }
                    : alapanyagszuro[index]
                }
                options={alapanyagok}
                className="w-4/5 "
              />
              <button
                className="ml-auto mr-8 p-1  border   pl-2 pr-2 bg-red-600"
                onClick={() => handleszurodelete(index)}
              >
                {" "}
                X
              </button>
            </div>
          ))}
          <button className="ml-4" onClick={filteritemadder}>
            Új mező hozzáadása
          </button>
        </div>
        <div className="ossz-filter">
          <h1 className="ml-4">Mi legyen benne a receptben?</h1>
          {alapanyagszuro2.map((item, index) => (
            <div className="flex w-auto ml-4">
              <Select
                onChange={(e) => filtersetter2(e, index)}
                value={
                  Object.keys(alapanyagszuro2[index]).length === 0
                    ? {
                        value: "Válassz alapanyagot!",
                        label: "Válassz alapanyagot!",
                      }
                    : alapanyagszuro2[index]
                }
                options={alapanyagok}
                className="w-4/5 "
              />
              <button
                className="text-center mr-8 ml-auto p-1  border  pl-2 pr-2 bg-red-600"
                onClick={() => handleszuro2delete(index)}
              >
                {" "}
                X
              </button>
            </div>
          ))}
          <button className="ml-4 mr-2" onClick={filteritemadder2}>
            Új mező hozzáadása
          </button>
        </div>
        <div className="w-full flex justify-evenly flex-wrap bg-grey-receptek">
          {szurtreceptek.map((item, index) => (
            <RecipeCard URL={props.URL} item={item}></RecipeCard>
          ))}
        </div>
      </div>
    </>
  );
}

export default Receptek;
