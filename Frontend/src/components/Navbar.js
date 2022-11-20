import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import noteContext from "../context/notes/notesContext";

const Navbar = () => {
  let history = useNavigate();

  const context = useContext(noteContext);
  const { showAlert} = context;
  const [User, setUser] = useState('');


  const handleLogout = () => {
    localStorage.removeItem("token");
    history("/login");
    showAlert("LogOut Successful", "success");
  };

  let location = useLocation();


  
  const getUser = async () => {
    const response = await fetch(
      `https://storenoteson.herokuapp.com/api/auth/getuser`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const userInfo = await response.json();
    setUser(userInfo);
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  },[localStorage.getItem('token')]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid ">
          <Link className="navbar-brand" to="/">
            iNoteBook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {localStorage.getItem("token") && (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/" ? "active" : ""
                    }`}
                    aria-current="page"
                    to="/"
                  >
                    Create Notes
                  </Link>
                </li>
              )}
              {localStorage.getItem("token") && (
                <li className="nav-item">
                  <Link
                    className={`nav-link text-primary ${
                      location.pathname === "/" ? "active" : ""
                    }`}
                    aria-current="page"
                    to="/"
                  >
                    Welcome :-{User.name}
                  </Link>
                </li>
              )}
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex ">
                <Link
                  className="btn btn-outline-danger mx-1 "
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-outline-warning mx-1 "
                  to="/signup"
                  role="button"
                >
                  Sign up
                </Link>
              </form>
            ) : (
              <button
                onClick={handleLogout}
                className="btn btn-outline-primary mx-1 "
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
