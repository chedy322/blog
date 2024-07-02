import React, { useContext, useState } from 'react';
import '../App.css'; // Import CSS file for styling
import { Navigate } from 'react-router-dom';


function Login() {

  const [redirect,setRedirect]=useState(false)
  const [form,setForm]=useState({
    email:'',
    password:''
  })
  
  const handleForm=(e)=>{
    return setForm({...form,[e.target.name]:e.target.value})

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to handle form submission
    const response=await fetch('http://localhost:3002/auth/login',{
      method:'POST',
      body:JSON.stringify({ email: form.email, password: form.password }),
      headers:{'Content-Type':'application/json'},
      credentials:"include",
    }
  
    )
    if(response.status===200){
        setRedirect(true)
      }else{
    alert('wrong credentials')
      }
      
      };
  if(redirect){
    return <Navigate to='/profile'/>
  }
  return (
    
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input
            type="email"
            id="email"
            name='email'
            value={form.email}
            onChange={handleForm}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleForm}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

