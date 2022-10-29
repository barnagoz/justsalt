import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function SecurityTab(props) {
  const [OldPass, setOldPass] = useState("");
  const [NewPass1, setNewPass1] = useState("");
  const [NewPass2, setNewPass2] = useState("");
  const [UserData, setUserData] = useState();
  const [Msg, setMsg] = useState("");
  const [DeletePass, setDeletePass] = useState("");
  const [Msg2, setMsg2] = useState("");

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
      setUserData(resp.data);
    }

    getData();
  }, []);

  async function savePass() {
    if (NewPass1 === NewPass2) {
      const response = await axios.post(
        `${props.URL}users/resetPassFromProfilePage`,
        { oldPass: OldPass, newPass: NewPass1, email: UserData.email }
      );
      console.log(response);
      if (response) {
      }
      if (response.status === 200) {
        setMsg(
          "Jelszavad megváltozott! Javasoljuk, hogy jelentkezz ki és jelentkezz be újra."
        );
      } else {
        setMsg(
          "Valamilyen hiba történt. Elképzelhető, hogy rossz a régi jelszó amit megadtál."
        );
      }
    } else {
      setMsg("A új jelszavak nem egyeznek. Kérlek próbáld újra!");
    }
  }

  async function deleteUser() {
    const resp = await axios.post(
      `${props.URL}users/resetPassFromProfilePage`,
      { email: UserData.email, pass: DeletePass }
    );
    if (resp) {
      if (resp.status === 200) {
        setMsg2("Felhasználódat töröltük. Kérlek jelentkezz ki!");
      } else {
        setMsg2(
          "Valamilyen hiba történt. Elképzelhető, hogy rossz az a jelszó amit megadtál."
        );
      }
    } else {
      setMsg2("Ismeretlen hiba történt. Kérlek próbáld újra!");
    }
  }
  return (
    <div className="h-4/5 lg:h-auto w-screen lg:w-4/5 bg-white text-center mt-16">
      <h1 className="font-montserrat  font-bold text-4xl mb-12">
        Jelszó megváltozatása:
      </h1>
      <h1>Régi jelszó:</h1>
      <input
        value={OldPass}
        onChange={(e) => {
          let oldpass = e.target.value;
          setOldPass(oldpass);
        }}
        type="password"
        className="w-60  text-center bg-red-100 h-8 rounded-2xl"
      />
      <br />
      <br />
      <h1>Új jelszó:</h1>
      <input
        value={NewPass1}
        onChange={(e) => {
          let pass1 = e.target.value;
          setNewPass1(pass1);
        }}
        type="password"
        className="w-60  text-center bg-yellow-100 h-8 rounded-2xl"
      />
      <br />
      <br />
      <h1>Új jelszó megerősítése:</h1>
      <input
        value={NewPass2}
        onChange={(e) => {
          let pass2 = e.target.value;
          setNewPass2(pass2);
        }}
        type="password"
        className="w-60  text-center bg-yellow-100 h-8 rounded-2xl"
      />
      <br />
      <h1 className="text-red-500 font-bold font-montserrat">{Msg}</h1>
      <br />
      <button
        onClick={() => savePass()}
        className="mt-14 mb-14 font-montserrat bg-red-200 p-4 rounded-3xl"
      >
        Jelszóváltoztatás rögzítése
      </button>
      <h1 className="font-montserrat  font-bold text-4xl mb-12">
        Felhasználó törlése:
      </h1>
      <h1>Fiókhoz tartozó jelszó:</h1>
      <input
        type="password"
        value={DeletePass}
        onChange={(e) => {
          let pass = e.target.value;
          setDeletePass(pass);
        }}
        className="w-60  text-center bg-red-100 h-8 rounded-2xl"
      />
      <br />
      <h1 className="text-red-500 font-bold font-montserrat">{Msg2}</h1>
      <br />
      <button
        onClick={() => deleteUser()}
        className="mt-14 mb-14 font-montserrat bg-red-500 p-4 rounded-3xl"
      >
        Felhasználó végleges törlése
      </button>
    </div>
  );
}

SecurityTab.propTypes = {};

export default SecurityTab;
