import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { NotesState } from "../Context/NotesContext";
import "../App.css";

const NotesCard = () => {
  const history = useNavigate();
  const { notes, getAllNotes, editNote, deleteNote } = NotesState();
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllNotes();
    } else {
      history("/");
    }
    // eslint-disable-next-line
  }, []);

  const handleEditbutton = async (n) => {
    var modal = document.getElementById("myModal");

    var btn = document.getElementById(n);

    var span = document.getElementsByClassName("close")[0];

    var cls = document.getElementsByClassName("cls")[0];

    btn.onclick = function () {
      modal.style.display = "block";
    };

    span.onclick = function () {
      modal.style.display = "none";
    };

    cls.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  };

  const chagevalue = (currentnote) => {
    setNote({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    });
  };

  const handleEditNote = (event) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
  };

  const onChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  const ref = useRef(null);

  return (
    <>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <div className="AddNotesMainDiv">
            <h4>Title</h4>
            <input
              type="text"
              placeholder="Enter Title"
              id="EditNoteInput"
              onChange={onChange}
              name="etitle"
              value={note.etitle}
            />
            <h4>Description</h4>
            <input
              type="text"
              placeholder="Enter Description"
              id="EditNoteInput"
              onChange={onChange}
              name="edescription"
              value={note.edescription}
            />
            <h4>Tag</h4>
            <input
              type="text"
              placeholder="Enter Tag"
              id="EditNoteInput"
              onChange={onChange}
              name="etag"
              value={note.etag}
            />

            <button
              id="EditNotesButton"
              className="cls"
              onClick={handleEditNote}
            >
              Edit Note
            </button>
            {/* <button className="cls" id="AddNotesButton">
              Close
            </button> */}
          </div>
        </div>
      </div>
      <div className="CardsFormat">
        {notes.map((note) => {
          let idE = note;
          return (
            <div className="NotesCard" key={note._id}>
              <div className="NotesCardById" key={note._id}>
                <text id="TitleInCard">
                  <b>Title</b> :- {note.title}
                </text>
                <text className="ellipsis" id="TitleInCard">
                  <b>Description</b> :- {note.description}
                </text>
                

                <text id="TitleInCard">
                  <b>Tag</b> :- {note.tag}
                </text>
                
                <div className="NotesCardButtons" key={note._id}>
                  <button
                    className="NotesCardButtonsfunction"
                    style={{ backgroundColor: "orange" }}
                    id={note._id}
                    onClick={() => {
                      ref.current.click();
                      chagevalue(idE);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    id={note._id}
                    onClick={handleEditbutton(idE._id)}
                    ref={ref}
                    style={{ display: "none" }}
                  >
                    open modal
                  </button>
                  <button
                    className="NotesCardButtonsfunction"
                    style={{ backgroundColor: "gray" }}
                    onClick={() => {
                      deleteNote(note._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NotesCard;
