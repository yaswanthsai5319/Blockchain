import React, { useState,useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import  Axios from 'axios';

function LoginPage() {
const navigate=useNavigate();
useEffect(() => {
      // console.log(sessionStorage.length)
      if(sessionStorage.length>0)
      {
        navigate('/main')
      }
      },[]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(username);
    // console.log(password);
       Axios.post("http://localhost:3001/login",{
        username:username,
        password:password,
       })
       .then((res)=>{
        // console.log("fdigjhifj");
        if(Object.values(res.data).length===2)
        {
          const {vals}=res.data.result[0]
          alert('Login Successful')
          // console.log(res.data.result[0].firstname)
          
          sessionStorage.setItem('username',res.data.result[0].username)
          sessionStorage.setItem('loggined',true)
          navigate('/main')
        }
        else{
          alert(res.message)
          navigate('/')
        }
       })
    // TODO: Handle login logic with username and password
  }

  return (
    <div className='main'> 
    <div className='form-container'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} id="username" name="username" onChange={handleUsernameChange} />
        </label>
        <label>
          Password:
          <input type="password" id="username" name="username" value={password} onChange={handlePasswordChange} />
        </label>
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Register</Link>
    </div>
    </div>
  );
}

export default LoginPage;


