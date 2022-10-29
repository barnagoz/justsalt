import React from "react";
import PropTypes from "prop-types";
import { useRef, useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import axios from "axios";

function AddRecipeTab(props) {
  const [RecipeName, setRecipeName] = useState("");
  const [UserID, setUserID] = useState("");
  const [PicLink, setPicLink] = useState("");
  const [Hozzavalok, setHozzavalok] = useState([
    { hozzavalo: "", mennyiseg: "", mennyisegfajta: "" },
  ]);
  const [KepFeltolve, setKepFeltolve] = useState(false);
  const [Elkeszites, setElkeszites] = useState("");
  const [UserName, setUserName] = useState("");
  const reftofileinput = useRef(null);
  //object hiding useStates
  const [one, setOne] = useState(true);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);

  function addSelect() {
    setHozzavalok([
      ...Hozzavalok,
      { hozzavalo: "", mennyiseg: "", mennyisegfajta: "" },
    ]);
  }
  useEffect(() => {
    async function getData() {
      let token = localStorage.getItem("token");
      token = JSON.parse(token);
      console.log(token, "token");
      let tokenid = token._id;

      //fetch with userid
      const resp = await axios.post(`${props.URL}users/getUserData `, {
        tokenid,
      });
      setUserID(resp.data._id);
      setUserName(resp.data.username);
    }

    getData();
  }, []);

  function CreatableSelectSelected(value, action, index) {
    console.log(value, action, index);
    let temphozzavalok = [...Hozzavalok];
    if (action.action == "select-option") {
      temphozzavalok[index].hozzavalo = value.value;
      setHozzavalok(temphozzavalok);
    }
    if (action.action == "create-option") {
      props.setAlapanyagok([...props.Alapanyagok, value]);
      temphozzavalok[index].hozzavalo = value.value;
      temphozzavalok[index].isnew = true;
      setHozzavalok(temphozzavalok);
    }
  }

  const handleszurodelete = (index) => {
    console.log(index, "índex");
    let temp1 = [...Hozzavalok];
    temp1.splice(index, 1);
    setHozzavalok(temp1);
  };

  async function handlepicupload() {
    let token = localStorage.getItem("token");
    token = JSON.parse(token);
    console.log(token, "token");
    let tokenid = token._id;
    let data = reftofileinput.current.files[0];
    if (data !== undefined) {
      console.log(data);
      const datatoupload = new FormData();
      datatoupload.append("file", reftofileinput.current.files[0]);
      datatoupload.append("userid", tokenid);
      const resp = await axios.post(
        props.URL + "recept/recipePicUpload",
        datatoupload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(resp.data);
      setKepFeltolve(true);
      setPicLink(resp.data);
      setTwo(false)
      setThree(true)
    } else {
      alert("Kérlek először válaszd ki a feltölteni kívánt képet, a szürke gomb segítségével.");
    }
  }

  async function saveRecipe() {
    if (KepFeltolve === true) {
      const response = await axios.post(`${props.URL}recept/addNewRecipe`, {
        userid: UserID,
        piclink: PicLink,
        name: RecipeName,
        hozzavalok: Hozzavalok,
        elkeszites: Elkeszites,
        username: UserName,
      });
      if (response.status == 201) {
        props.baseStateUpdateFn();
      }
    } else {
      alert("Először töltsd fel a képet!");
    }
  }
  return (
    <div className=" h-4/5 w-screen lg:h-screen lg:w-4/5 bg-white text-center flex flex-col">
      {
        one &&
        <div className={one ? "visble" : "invisible"} id="bevezető-szöveg">
        <br />
        <h1 className="font-montserrat font-semibold text-4xl">Helló!</h1>
        <h1>
          Üdvözöllek a receptfeltöltési folyamat kezdetén. Két egyszerű lépés
          után már fent is lesz recepted az oldalunkon.
        </h1>
        <button
          className="bg-red-200 p-3 rounded-2xl"
          onClick={() => {
            setOne(false);
            setTwo(true);
          }}
        >
          Vágjunk bele.
        </button>
      </div>

      }
      {
        two &&
        <div className={two ? "visble" : "invisible"}>
        <h1 className="font-montserrat font-semibold text-4xl">1. lépés</h1>
        <h1>
          Kérlek töltsd fel a receptedhez illő képet. Ezeken általában egy
          tányér szokott lenni, tele étellel. <br />
          Az azért fontos dolog, hogy szép képet tölts fel, olyat amire te is
          rákattintanál.
          <br />
          Először kattints a szürke gombra, és válaszd ki a képet. Másodszor
          kattints a rózsaszín Kép feltöltése gombra.
        </h1>
        <input ref={reftofileinput} accept="image/png, image/jpeg" type="file" />
        <button
          className="bg-red-200 p-3 rounded-2xl"
          onClick={handlepicupload}
        >
          Kép feltöltése
        </button>
      </div>

      }
      {
        three &&
        <div className={three ? "visble" : "invisible"}>
        <h1 className="font-montserrat font-semibold text-4xl">2. lépés</h1>
          <h1>
            Azta ez gyors volt... Arra számítottam hogy még pihenhetek is kicsit, de nagyon gyorsan ideértél. Gratulálok!<br/>Most hogy itt vagy hadd mutassam be mit kell csinálnod. Először is add meg a recept nevét, ezt fogják a felhasználók <br/> a receptek oldalunkon látni (példa: Sajtos Makaróni). Ezután írd le az elkészítését a receptnek. Majd add meg a hozzávalókat.<br/>Először válaszd ki a hozzávalót, vagy hozz létre újat. Add meg a számát(például: 2 (liter)), majd a mértékegységet. 
          </h1>
        <input
          className="text-center h-10 ml-1 mr-2 w-60 rounded-3xl bg-red-100 mb-4 mt-4"   
          value={RecipeName}
          onChange={(e) => {
            let username = e.target.value;
            setRecipeName(username);
          }}
          id="usernamefield"
          placeholder="Recept neve"
          type="text"
        />
        <br />
        <textarea
          className="text-center h-10 ml-1 mr-2 w-96 rounded-3xl bg-red-100 mb-4"
          value={Elkeszites}
          onChange={(e) => {
            let username = e.target.value;
            setElkeszites(username);
          }}
          id="usernamefield"
          placeholder="Elkészítés"
        />
        {Hozzavalok.map((item, index) => (
          <div className="flex ml-4 w-128 text-center">
            <CreatableSelect
              className="w-96"
              value={Hozzavalok[index].nev}
              options={props.Alapanyagok}
              onChange={(e, i) => {
                CreatableSelectSelected(e, i, index);
              }}
            />
            <input
              className="w-10"
              value={Hozzavalok[index].mennyiseg}
              onChange={(e) => {
                let temp = [...Hozzavalok];
                temp[index].mennyiseg = e.target.value;
                setHozzavalok(temp);
              }}
              type="number"
              min="0"
            />
            <input
              type="text"
              className="text-center h-10 ml-1 mr-2 w-60 rounded-3xl bg-red-100"
              value={Hozzavalok[index].mennyisegfajta}
              onChange={(e) => {
                let temp = [...Hozzavalok];
                temp[index].mennyisegfajta = e.target.value;
                setHozzavalok(temp);
              }}
              placeholder="Mértékegység (pl.: kg)"
            />
            <button
              className="bg-red-200 p-3 rounded-3xl"
              onClick={() => handleszurodelete(index)}
            >
              {" "}
              ❌
            </button>
          </div>
        ))}
        <br />
        <h1>Tudtad hogy a recepthez több hozzávalót is adhatsz?</h1>
        <button
        className="bg-red-200 p-3 rounded-2xl"
          onClick={() => {
            addSelect();
          }}
        >
          Hozzávaló hozzáadása
        </button>
        <br />
        <br />
        <h1>Úgy érzed kész vagy? Töltsd fel a recepted oldalunkra. ⬇️</h1>
        <button className="bg-red-200 p-3 rounded-2xl" onClick={() => saveRecipe()}>Recept feltöltése</button>
        </div>
  
      }
                  </div>
  );
}

AddRecipeTab.propTypes = {};

export default AddRecipeTab;
