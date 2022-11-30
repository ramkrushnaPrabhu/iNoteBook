import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NotesState } from "../Context/NotesContext";


const SignUp = () => {
  const {showAlert } = NotesState();
  let history = useNavigate();
  const [credentils, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentils;
    const response = await fetch("https://storenoteson.herokuapp.com/api/auth/createUser", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();

    if (json.success) {
      localStorage.setItem("token", json.Autotoken);
      history("/createNotes");
      showAlert("SignUp Successful","success")
    } else {
      showAlert("invalid credentials","Error");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentils, [event.target.name]: event.target.value });
  };

  return (
    <>
      <span className="logInForm">
      <div id="FormCenter">

        <h3 id="LogFormFont">Name</h3>
        <input
          type="text"
          placeholder="Enter your Name"
     
          value={credentils.name}
          onChange={onChange}
          name="name"
          id="LoginInput"
        />
        <h3 id="LogFormFont">Email</h3>
        <input
          type="email"
          placeholder="Enter your Email Id"
         
          value={credentils.email}
          onChange={onChange}
          name="email"
          id="LoginInput"
        />
        <h3 id="LogFormFont">Password</h3>
        <input
          type="password"
          placeholder="Enter your Password"
   
          value={credentils.password}
          onChange={onChange}
          name="password"
          id="LoginInput"
        /></div>
        <div id="AuthDivOfSignLog">
        <button
          id="AuthButton"
          onClick={handleSignup}
        >
          SignUp
        </button></div>
      </span>
    </>
  );
};

export default SignUp;
