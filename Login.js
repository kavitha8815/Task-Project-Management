import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import Validation from './LoginValidation';
import axios from'axios';
import backgroundImage from './background.jpg';
import './style.css';

function Login() {
  const[values, setValues]=useState({
    email: '',
    password: '' 
  })
  const navigate=useNavigate();
  const[errors,setErrors]=useState({})
  const handleInput=(event)=>{
    setValues(prev=>({...prev,[event.target.name]: event.target.value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.email === "" && errors.password === "") {
      axios.post('http://localhost:8081/login', values, { withCredentials: true })
      .then(res => {
        navigate('/dashboard');
      })
      .catch(err => {
        console.error("Axios error:", err);
      });
    }
  };

  return (
    <div className='login-container'style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className='bg-white p-3 rounded w-25'>
          <h2>Sign in</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor="email"><strong>Email</strong></label>
              <input type="email" placeholder='Enter email' name='email'
              onChange={handleInput} className='form-control rounded-0'/>
              {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            <div className='mb-3'>
              <label htmlFor="password"><strong>Password</strong></label>
              <input type="password" placeholder='Enter password' name='password'
              onChange={handleInput} className='form-control rounded-0'/>
              {errors.password && <span className='text-danger'>{errors.password}</span>}
            </div>
            <button type='submit' className='btn btn-success w-100 mb-3 rounded-0'>Log in</button>
            <p>Don't have an existing account</p>
            <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
