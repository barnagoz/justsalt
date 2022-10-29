import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
function Login(props) {
  let history = useHistory();
  let { red } = useParams();
  if (red === "home") {
    red = "";
  }
  if (props.isAuthenticated === true) {
    history.push("/" + red);
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errM, setErrM] = useState("");
  async function submit(e) {
    const formdata = [email, password];

    const settings = {
      method: "POST",
      mode: "cors", // this cannot be 'no-cors'
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(formdata),
    };
    e.preventDefault();

    console.log(formdata);
    const response = await fetch(
      props.URL + "auth/existingUserLogin",
      settings
    );
    if (response) {
    }
    if (response.status) {
      if (response.status === 200) {
        console.log(response.body);
        //    console.log(response.json())
        const resp2 = await response.json();
        console.log(resp2);
        localStorage.setItem("token", JSON.stringify(resp2));
        props.setIsAuthenticated(true);
        history.push("/" + red);
      }
      if (response.status === 404) {
        setErrM("hibass");
        setTimeout(() => {
          setErrM("A jelszó vagy a felhasználónév hibás!");
        }, 1000);
      }
    } else {
      setErrM("A jelszó vagy a felhasználónév hibás!");
      setTimeout(() => {
        setErrM("");
      }, 1000);
    }
  }
  return (
    <>
      <Helmet>
        <title>Bejelentkezés | justsalt</title>
      </Helmet>
      <form
        className="bg-pic2 flex justify-center h-screen w-screen items-center flex-col"
        onSubmit={submit}
      >
        <div className="flex justify-center items-center flex-col bg-red-100 p-6 rounded-3xl">
        <input
          className="text-center h-10 ml-1 mr-2 w-60 rounded-3xl shadow-lg"
          placeholder="E-mail cím"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name=""
          id=""
        />
        <br />
        <input
          className="text-center h-10 ml-1 mr-2 w-60 rounded-3xl shadow-lg focus"
          placeholder="Jelszó"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          name=""
          id=""
        />
        <br />
        <input
          className="text-center h-10 ml-1 mr-2 w-60 rounded-3xl bg-red-200 shadow-lg hover:bg-red-300 duration-700"
          type="submit"
          value="Bejelentkezés"
        />
        <p className="text-red-900">{errM}</p>
        <Link className="text-center mt-2 w-52 ml-1 mr-2 p-2 rounded-3xl bg-red-200 cursor-pointer shadow-lg hover:bg-red-300 duration-700" to="/register">Regisztráció</Link>
        <Link className="text-center mt-2 w-52 ml-1 mr-2 p-2 rounded-3xl bg-red-200 cursor-pointer shadow-lg hover:bg-red-300 duration-700" to="/forgotpass">Elfelejtett jelszó</Link>
        </div>
      </form>
    </>
  );
}

Login.propTypes = {};

export default Login;