import React, { useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/notesContext';

const Signup = () => {
  const context = useContext(noteContext);
  const { showAlert } = context;


  let history = useNavigate();

  const [credentils, setCredentials] = useState({name:"",email: "", password: "" })

  const handelsubmit = async (e) => {
    e.preventDefault();
    const {name,email,password}=credentils;
    const response = await fetch("https://storenoteson.herokuapp.com/api/auth/createUser", {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({ name,email,password })
    });
    const json = await response.json()
    console.log(json)
    if(json.success){
      localStorage.setItem('token', json.Autotoken);
      history("/createNotes");
    }
    else{
      alert("invalid credentials");
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentils, [event.target.name]: event.target.value })
  }

  return (
    <div className='d-flex w-100 h-100 justify-content-center'>
      {/* <h2 className='text-center'>Sign Up for iNotebook</h2> */}
      <form onSubmit={handelsubmit}>
      <h2 className='text-center'>Sign Up for iNotebook</h2>
        <div className="mb-3 ">
          <label htmlFor="name" className="form-label"><h4>Name</h4></label>
          <input type="text" className="form-control" id="name" name='name' placeholder='Enter your Name' onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label"><h4>Email address</h4></label>
          <input type="email" className="form-control " id="email" name='email' value={credentils.email} placeholder='Enter your Email Address' onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label"><h4>Password</h4></label>
          <input type="password" className="form-control" name='password' value={credentils.password} placeholder='Enter your Password' onChange={onChange} id="password" minLength={5} required />
        </div>

        <button type="submit" className="btn btn-primary" onClick={()=>{showAlert("SignUp successful",'success')}}>Submit</button>
      </form>
    </div>
  )
}

export default Signup