import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from "axios";

function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errM, setErrM] = useState("");
  async function submit(e) {
    e.preventDefault();

    const response = await axios.post(props.URL + "auth/newUser", {"name": name, "email": email, "pass": pass})
    console.log(response);
    if (response) {
      setErrM("Sikeres regisztráció, most próbálj meg bejelentkezni...");
      setTimeout(() => {
        setErrM("");
      }, 1000);
    } else {
      setErrM("Valami nem sikerült. Próbáld újra...");
      setTimeout(() => {
        setErrM("");
      }, 1000);
    }
  }
  return (
    <>
      <Helmet>
        <title>Regisztráció | justsalt</title>
      </Helmet>
      <form
        className="bg-pic2 flex justify-center h-screen w-screen items-center flex-col"
        onSubmit={submit}
      >
        <div className="flex justify-center items-center flex-col bg-red-100 p-6 rounded-3xl">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Felhasználónév"
            name=""
            id=""
            className="text-center h-10 ml-1 mr-2 w-60 rounded-3xl shadow-lg"
          />
          <br />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name=""
            placeholder="E-mail cím"
            id=""
            className="text-center h-10 ml-1 mr-2 w-60 rounded-3xl shadow-lg"
          />
          <br />
          <input
            onChange={(e) => {
              setPass(e.target.value);
            }}
            type="password"
            name=""
            id=""
            placeholder="Jelszó"
            className="text-center h-10 ml-1 mr-2 w-60 rounded-3xl shadow-lg"
          />
          <br />
          <input
            className="text-center h-10 ml-1 mr-2 w-60 rounded-3xl bg-red-200 shadow-lg hover:bg-red-300 duration-700"
            type="submit"
            value="Regisztráció"
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

Register.propTypes = {};

export default Register;
