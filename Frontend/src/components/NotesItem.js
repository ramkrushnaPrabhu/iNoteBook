import React, { useContext } from "react";
import noteContext from "../context/notes/notesContext";

const NotesItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div class="card mt-2">
      <div class="card-header">
        <h5 className="card-title">{note.title}</h5>
      </div>
      <div class="card-body">
        <p className="card-text">{note.description}</p>
        <h5>Tag:-{note.tag}</h5>
      </div>
      <div class="card-footer">
        <i
          className="fa-solid fa-trash-can mx-2"
          onClick={() => {
            deleteNote(note._id);
          }}
        ></i>
        {" "}
        <i
          className="fa-solid fa-file-pen mx-2"
          onClick={() => {
            updateNote(note);
          }}
        ></i>
      </div>
    </div>
  );
};

export default NotesItem;



