import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import NotesCard from "./Pages/NotesCard";
import CreateNotes from "./Pages/CreateNotes";
import Login from "./Pages/Login";
import Alert from "./Components/Alert";
import { NotesState } from "./Context/NotesContext";

function App() {
  const { alert } = NotesState();
  return (
    <BrowserRouter>
      <Header />
      <Alert alert={alert}/>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/createNotes" element={<CreateNotes />} />
        <Route exact path="/MyNotes" element={<NotesCard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
