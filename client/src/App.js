import "./App.css";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./components/register/Register";
import Signin from "./components/signin/Signin";
import Home from "./components/home/Home/Home";
import Main from "./components/Main/Main";
import About from "./components/About/About";
import Profile from "./components/Profile/Profile";
// import Footer from "./components/Footer";
import CurrentProfile from "./components/CurrentProfile/CurrentProfile";
import search from "./components/search/search";
import Test from "./resources/test/test";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path="/register" exact component={Register}></Route>
        <Route path="/login" exact component={Signin}></Route>
        <Route path="/chat" exact component={Home}></Route>
        <Route path="/" exact component={Main}></Route>
        <Route path="/about" exact component={About}></Route>
        <Route path="/editprofile" exact component={Profile}></Route>
        <Route path="/Profile" exact component={CurrentProfile}></Route>
        <Route path="/search" exact component={search}></Route>
        <Route path="/test" exact component={Test}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
