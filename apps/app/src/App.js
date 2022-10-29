import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/home";
import ScrollToTop from "./utils/ScrollToTop";
import Receptek1 from "./pages/receptek";
import Recept from "./pages/recept";
import Register from "./pages/register";
import Login from "./pages/login";
import MyProfile from "./pages/myprofile";
import Nav from "./components/Nav";
import ErrNotFound from "./pages/errNotFound";
import ForgotPass from "./pages/forgotPass";
import ResetPass from "./pages/resetPass";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  let url = "http://localhost:5000/";
  if (process.env.NODE_ENV == "production")
    url = "https://justsalt-server.herokuapp.com/";
  const reload = () => window.location.reload();
  const [Receptek, setReceptek] = useState([]);
  const [Alapanyagok, setAlapanyagok] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [baseStateUpdater, setBaseStateUpdater] = useState(0);

  const baseStateUpdateFn = () => {
    setBaseStateUpdater(baseStateUpdater + 1);
  };

  useEffect(() => {
    console.log("object");
    //ellenorizzuk a tokent es ha jo akkor loggedin
    if (localStorage.getItem("token") != null) {
      console.log("222");
      setIsAuthenticated(true);
    }
  }, []);
  useEffect(() => {
    async function apicall() {
      const apiresponse = await axios.get(url + "recept/getAllRecipes");
      console.log(apiresponse);
      const apiresponse2 = await axios.get(url + "recept/getAllIngredient");
      console.log(apiresponse2);
      setReceptek(apiresponse.data);
      setAlapanyagok(apiresponse2.data);
    }
    apicall();
  }, [baseStateUpdater]);
  return (
    <Router>
      <Nav
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <ScrollToTop>
        <Switch>
          <Route exact path="/">
            <Home URL={url} Receptek={Receptek} />
          </Route>
          <Route path="/receptek">
            <Receptek1
              URL={url}
              Receptek={Receptek}
              Alapanyagok={Alapanyagok}
            />
          </Route>
          <Route path="/recept/:id">
            <Recept URL={url} Receptek={Receptek} />
          </Route>
          <Route path="/register">
            <Register URL={url}></Register>
          </Route>
          <Route path="/login/:red">
            <Login
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
              URL={url}
            ></Login>
          </Route>
          <Route path="/myprofile">
            {isAuthenticated == true ? (
              <MyProfile
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                URL={url}
                Alapanyagok={Alapanyagok}
                setAlapanyagok={setAlapanyagok}
                Receptek={Receptek}
                setReceptek={setReceptek}
                baseStateUpdateFn={baseStateUpdateFn}
              ></MyProfile>
            ) : (
              <Redirect to="/login/myprofile" />
            )}
          </Route>
          <Route path="/forgotpass">
            <ForgotPass URL={url}></ForgotPass>
          </Route>
          <Route path="/resetpass/:id">
            <ResetPass URL={url}></ResetPass>
          </Route>
          <Route path="/404">
            <ErrNotFound URL={url} />
          </Route>
          <Redirect to="/404"></Redirect>
        </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default App;
