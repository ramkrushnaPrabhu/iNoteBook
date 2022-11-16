import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import noteContext from "../context/notes/notesContext";

// in react router dom v6 useHistory is replace by useNavigate

const Login = () => {
  const context = useContext(noteContext);
  const { showAlert } = context;

  let history = useNavigate();

  const [credentils, setCredentials] = useState({ email: "", password: "" });

  const handelsubmit = async (e) => {
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
      history("/");
      showAlert("Login sucessful", "success");
    } else {
      alert("Invalid Credentials");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentils, [event.target.name]: event.target.value });
  };

  return (
    // <div className="container">
    <div className="d-flex w-100 h-100  justify-content-center">
      {/* <h1 className="text-center">Welcome to iNoteBook</h1>
      <h2 className="text-center">Login for iNootBook</h2> */}
      <form onSubmit={handelsubmit}>
      <h1 className="text-center">Welcome to iNoteBook</h1>
      <h2 className="text-center">Login for iNootBook</h2>
        <div className="mb-3">
          <label htmlFor="email1" className="form-label">
            <h4>Email address</h4>
          </label>
          <input
            type="email"
            className="form-control"
            value={credentils.email}
            placeholder="Enter your Email"
            onChange={onChange}
            id="email1"
            name="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            <h4>Password</h4>
          </label>
          <input
            type="password"
            className="form-control"
            value={credentils.password}
            placeholder="Enter your Password"
            onChange={onChange}
            id="password"
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/signup" className="text-center ">
        <h5 className="text-dark">Click here for SignUp?</h5>
      </Link>
      </form>
      {/* <Link to="/signup" className="text-center ">
        <h5 className="text-dark">Click here for SignUp?</h5>
      </Link> */}
    </div>
    // </div>
  );
};

export default Login;
