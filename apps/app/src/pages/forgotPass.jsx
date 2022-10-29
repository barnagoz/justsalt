import React from "react";
import { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";


function ForgotPass(props) {
  const [emailInputField, setEmailInputField] = useState("");
  const [errM, setErrM] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    await axios.post(`${props.URL}users/getPasswordResetEmail`, {
      email: emailInputField,
    });
    setErrM("Nézd meg az e-mailjeidet. Ha nem kaptál e-mailt valószínűleg elrontottad az e-mail címet.");
      setTimeout(() => {
        setErrM("");
      }, 1000);
  }
  return (
    <>
      <Helmet>
        <title>Elfelejtett jelszó | justsalt</title>
      </Helmet>
      <form
        onSubmit={(e) => onSubmit(e)}
        className="bg-pic2 flex justify-center h-screen w-screen items-center flex-col"
      >
        <div className="flex justify-center items-center flex-col bg-red-100 p-6 rounded-3xl">
          <input
            type="email"
            placeholder="E-mail cím"
            className="text-center h-10 ml-1 mr-2 w-60 rounded-3xl shadow-lg"
            onChange={(e) => setEmailInputField(e.target.value)}
            value={emailInputField}
          ></input>
          <br />
          <input
            type="submit"
            value="Jelszó visszaállítása"
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

ForgotPass.propTypes = {};

export default ForgotPass;
