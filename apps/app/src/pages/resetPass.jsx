import React from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

function ResetPass(props) {
  const [emailInput, setEmailInput] = useState("");
  const [pass1Input, setPass1Input] = useState("");
  const [pass2Input, setPass2Input] = useState("");
  const [errM, setErrMSG] = useState("");
  let { id } = useParams();
  async function sendReq(event) {
    event.preventDefault();
    if (pass1Input === pass2Input) {
      await axios.post(`${props.URL}users/resetPasswordByToken`, {
        token: id,
        email: emailInput,
        newpassword: pass1Input,
      });
    } else {
      setErrMSG("A jelszavak nem egyeznek!!!!!!");
    }
  }
  return (
    <>
      <Helmet>
        <title>Jelszó visszaállítás | justsalt</title>
      </Helmet>
      <form
        className="bg-pic2 flex justify-center h-screen w-screen items-center flex-col"
        onSubmit={(e) => sendReq(e)}
      >
        <div className="flex justify-center items-center flex-col bg-red-100 p-6 rounded-3xl">
          <input
            type="email"
            placeholder="E-mail cím"
            className="text-center h-10 ml-1 mr-2 w-60 rounded-3xl shadow-lg"
            onChange={(e) => setEmailInput(e.target.value)}
            value={emailInput}
          ></input>
          <br />
          <input
            type="password"
            placeholder="Új jelszó"
            className="text-center h-10 ml-1 mr-2 w-60 rounded-3xl shadow-lg"
            onChange={(e) => setPass1Input(e.target.value)}
            value={pass1Input}
          ></input>
          <br />
          <input
            type="password"
            placeholder="Új jelszó másodszor"
            className="text-center h-10 ml-1 mr-2 w-60 rounded-3xl shadow-lg"
            onChange={(e) => setPass2Input(e.target.value)}
            value={pass2Input}
          ></input>
          <br />
          <input
            type="submit"
            value="Jelszó megváltoztatása"
            className="text-center h-10 ml-1 mr-2 w-60 rounded-3xl bg-red-200 shadow-lg hover:bg-red-300 duration-700"
          />
          <p className="text-red-900">{errM}</p>
          <Link
            className="text-center mt-2 w-52 ml-1 mr-2 p-2 rounded-3xl bg-red-200 cursor-pointer shadow-lg hover:bg-red-300 duration-700"
            to="/login/home"
          >
            Bejelentkezés
          </Link>
        </div>
      </form>
    </>
  );
}

ResetPass.propTypes = {};

export default ResetPass;
