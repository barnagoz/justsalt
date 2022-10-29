/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

function GeneralTab(props) {
  const [profileData, setProfileData] = useState({});
  const [tempProfileData, setTempProfileData] = useState({});
  const [Msg, setMsg] = useState()
  const reftofileinput = useRef(null);
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
      console.log(resp.data);
      setProfileData(resp.data);
      setTempProfileData(resp.data);
    }

    getData();
  }, []);

  async function handlepicupload() {
    let token = localStorage.getItem("token");
    token = JSON.parse(token);
    console.log(token, "token");
    let tokenid = token._id;
    let data = reftofileinput.current.files[0];
    console.log(data);
    const datatoupload = new FormData();
    datatoupload.append("file", reftofileinput.current.files[0]);
    datatoupload.append("userid", tokenid);
    await axios.post(props.URL + "users/userPicUpdate", datatoupload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async function saveData () {
    const resp = await axios.post(`${props.URL}users/changeUserData`, {"email" : tempProfileData.email, "bio" : tempProfileData.about, "uName" : tempProfileData.username, "oldEmail" : profileData.email})
    if (resp.status === 200) {
      setMsg(
        "Adataid megváltoztak! Javasoljuk, hogy jelentkezz ki és jelentkezz be újra. Figyelj, mert nemsokára újratöltjük az oldalt."
      );
      setTimeout(function(){window.location.reload(false);}, 5000);
    } 
    else {
      setMsg(
        "Valamilyen hiba történt. Elképzelhető, hogy rossz az email címed. Kérlek próbáld újra. Figyelj, mert nemsokára újratöltjük az oldalt."
      );
      setTimeout(function(){window.location.reload(false);}, 5000);
    }
  }

  return (
    <>
      <Helmet>
        <h1>Általános beállítások | justsalt</h1>
      </Helmet>
      <div className="lg:w-4/5  w-screen h-4/5 lg:overflow-y-scroll text-center pt-3 bg-white">
      <img
          className="w-32 h-auto m-auto rounded-full"
          alt="a felhasználó profilképe"
          src={profileData.profilepic}
        ></img>
        <br/>
        <h1>Felhasználónév: </h1>
        <input
        className="text-center"
          value={tempProfileData.username}
          onChange={(e) => {
            let username = e.target.value;
            setTempProfileData({ ...tempProfileData, username });
          }}
          id="usernamefield"
          type="text"
        />
        <br/>
        <br/>
        <h1>Email cím:</h1>
        <input
          value={tempProfileData.email}
          onChange={(e) => {
            let email = e.target.value;
            setTempProfileData({ ...tempProfileData, email });
          }}
          id="emailfield"
          type="text"
          className="w-60  text-center"
        />
        <br/>
        <br/>
        <h1>Profil leírás:</h1>
        <textarea
          value={tempProfileData.about}
          onChange={(e) => {
            let about = e.target.value;
            setTempProfileData({ ...tempProfileData, about });
          }}
          id="aboutfield"
          type="text"
          className="text-center  w-60 h-auto"
        />
        <br/>
        <br/>
        <h1>Profilkép csere:</h1>
        <input ref={reftofileinput} type="file" />
        <button className="bg-red-200 p-3 rounded-2xl" onClick={handlepicupload}>Fájl feltöltés</button>
        <br/>
        <h1 className="text-red-500 font-bold font-montserrat">{Msg}</h1>
        <br/>
        <button className="bg-red-200 p-3 rounded-2xl" onClick={() => saveData()}>Mentés</button>
      </div>
    </>
  );
}

GeneralTab.propTypes = {};

export default GeneralTab;
