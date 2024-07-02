import React, { useState } from 'react';
import '../App.css';
import { Navigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const[redirect,setRedirect]=useState(false)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({...formData})
    // Add your registration logic here
    if(formData.password!==formData.confirmPassword){
      alert("Password and Confirm Password does not match")
      return;
    }
    const result=await fetch('http://localhost:3002/auth/register',{
      method:'POST',
      body:JSON.stringify({...formData}),
      headers:{'Content-Type':'application/json'}
    })
    console.log(result)
    if(result.status===200){
      setRedirect(true)
    }else if(result.status===400){
      alert("email already in use please log in")
    }
    else{
      alert("Something went wrong")
    }
  };
  if(redirect){
    return <Navigate to='/profile'/>
  }

  return (
    <div className="register-form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            minLength={4}
            maxLength={20}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            minLength={8}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
};

export default Register;
