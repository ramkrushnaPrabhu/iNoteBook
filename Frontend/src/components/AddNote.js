import React,{useContext,useEffect,useState} from 'react'
import noteContext from '../context/notes/notesContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote,showAlert } = context;
    const [User, setUser] = useState('');

    const [note,setNote] = useState({title:"",description:"",tag:""})

    const handleClick = (event) => {
        event.preventDefault();
        addNote(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:""});
        showAlert("New Note Added","success");
    }

    const onChange=(event)=>{
        setNote({...note,[event.target.name]:event.target.value})

    }

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
      },[]);

    return (
        <div>
            <div className="container my-3">
            <h3 className='text-center'><b>Welcome {User.name}...😎</b></h3>
                <h1 className='text-center'>ADD A NOTE</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label"><b>Title</b></label>
                        <input type="text" className="form-control" id="title" name='title' placeholder='Enter 3 Characters atleast' value={note.title} minLength={3} onChange={onChange} required/>
                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label"><b>Description</b></label>
                        <input type="text" className="form-control" id="description" name='description' placeholder='Enter 5 Characters atleast' minLength={5} value={note.description} onChange={onChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label"><b>Tag</b></label>
                        <input type="text" className="form-control" placeholder='Tag' id="tag" name='tag' value={note.tag} onChange={onChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
                <h3 className='text-center'>Your Note</h3>
            </div>
        </div>
    )
}

export default AddNote