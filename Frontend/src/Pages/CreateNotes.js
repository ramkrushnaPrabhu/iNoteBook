import React, { useEffect, useState } from "react";
import "../App.css";
import { NotesState } from "../Context/NotesContext";

const CreateNotes = () => {
  const { addNote } = NotesState();
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const [User, setUser] = useState([]);

  const handleAddNote = (event) => {
    event.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
  
  };

  const onChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };
  ////
  const getUser = async () => {
    const response = await fetch(`https://storenoteson.herokuapp.com/api/auth/getuser`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const userInfo = await response.json();
    setUser(userInfo);
  };
  useEffect(() => {
    getUser();
  });
  /////
  return (
    <div className="createNote-A">
      <div className="AddNotesMainDiv">
        <span className="nameOfUser"><h1 className="createNoteHeading">Welcome {User.name}...😎</h1></span>
        <h3>Title</h3>
        <input
          type="text"
          placeholder="Enter Title"
          id="AddNoteInput"
          name="title"
          value={note.title}
          onChange={onChange}
        />
        <h3>Description</h3>
        <input
          type="text"
          placeholder="Enter Description"
          id="AddNoteInput"
          name="description"
          value={note.description}
          onChange={onChange}
        />
        <h3>Tag</h3>
        <input
          type="text"
          placeholder="Enter Tag"
          id="AddNoteInput"
          name="tag"
          value={note.tag}
          onChange={onChange}
        />
        <button id="AddNotesButton" onClick={handleAddNote}>
          Add Notes
        </button>
      </div>
    </div>
  );
};

export default CreateNotes;
