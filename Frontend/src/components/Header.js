import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { NotesState } from "../Context/NotesContext";


const Header = () => {
  const {showAlert}=NotesState();
  let history = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    history("/");
    showAlert("LogOut Successful","success")
    
  };

  return (
    <>
      {localStorage.getItem("token") ? (
        <div className="Navbar">
          <nav className="newNav">
            <ul type="none">
              <h2  id="NavHeadingUser">iNotebook</h2>
              <Link
                id="headerLinks"
                to="/createNotes"
                className="navBarHeadline" 
              >
                CreateNotes
              </Link>
              <Link
                id="headerLinks"
                to="/MyNotes"
                className="navBarHeadline" 
              >
                MyNotes
              </Link>
              <div
              className="LogOutButtonContainer"
              
              >
                <button
                  id="LogOutButtonNav"
                  onClick={handleLogout}
                  className="navBarHeadline" 
                >
                  Log Out
                </button>
              </div>
            </ul>
          </nav>
        </div>
      ) : (
        <div className="stNavbar">
          <nav>
            <ul type="none">
              <h1 style={{ fontSize: "xx-large" }} className="headingOfLogin">iNotebook</h1>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
