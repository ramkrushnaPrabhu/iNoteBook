import React from "react";
import { NotesState } from "../Context/NotesContext";

const Alert = () => {
  const { alert } = NotesState();
  return (
    <div style={{ height: "2.5rem" }}>
      {alert && (
        <div
          style={{
            backgroundColor: alert.type === "success" ? "#29f172" : "#f17474",
            color: "white",
            height: "2.5rem",
          }}
        >
          <h4 style={{ marginLeft: "0.5rem" }}>
            {alert.type}:{alert.msg}
          </h4>
        </div>
      )}
    </div>
  );
};

export default Alert;
