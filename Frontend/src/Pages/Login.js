import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { NotesState } from "../Context/NotesContext";

import SignUp from "./SignUp";

const Login = () => {
  const {showAlert } = NotesState();
  const [Form, setForm] = useState(true);
  let history = useNavigate();

  const [credentils, setCredentials] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("https://storenoteson.herokuapp.com/api/auth/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentils.email,
        password: credentils.password,
      }),
    });
    const json = await response.json();

    if (json.success) {
      localStorage.setItem("token", json.Autotoken);
      history("/createNotes");
      showAlert("Login Successful","success");
    } else {
      showAlert("Invalid Credentials","Error");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentils, [event.target.name]: event.target.value });
  };

  return (
    <div className="LoginPage">
      <div className="logincolumn">
        <span className="logintitlespan">
          <h1 id="AuthPageHeading">Welcome to iNotebook</h1>
          <p id="HomePageParag">One safe place for all Notes</p>
        </span>
        <div className="tabsForTwo">
        <span className="loginOrSignup">
          <button
            id="AuthTab"
            onClick={() => setForm(true)}
            style={{
              backgroundColor: Form ? "orange" : "white",
              color: Form ? "white" : "black",
            }}
          >
            LogIn
          </button>
          <button
            id="AuthTab"
            onClick={() => setForm(false)}
            style={{
              backgroundColor: Form ? "white" : "orange",
              color: Form ? "black" : "white",
            }}
          >
            SignUp
          </button>
        </span>
        </div>
        {Form ? (
          <div className="logInForm">
          <div id="FormCenter">
            <h3 id="LogFormFont">Email</h3>
            <input
              type="email"
              placeholder="Enter your Email Id"

              name="email"
              value={credentils.email}
              onChange={onChange}
              id="LoginInput"
            />
            <h3 id="LogFormFont">Password</h3>
            <input
              type="password"
              placeholder="Enter your Password"

              name="password"
              value={credentils.password}
              onChange={onChange}
              id="LoginInput"
            />
            </div>
            <div id="AuthDivOfSignLog">
            <button

              id="AuthButton"
              onClick={handleLogin}
            >
              Login
            </button></div>
          </div>
        ) : (
          <SignUp />
        )}
      </div>
    </div>
  );
};

export default Login;
