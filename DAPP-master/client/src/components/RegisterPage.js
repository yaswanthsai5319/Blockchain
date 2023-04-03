// import React, { useState } from 'react';
// import Axios from 'axios';
// import {useNavigate} from 'react-router-dom'

// function RegisterPage() {
//   const navigate=useNavigate();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   function handleUsernameChange(event) {
//     setUsername(event.target.value);
//   }

//   function handlePasswordChange(event) {
//     setPassword(event.target.value);
//   }

//   function handleConfirmPasswordChange(event) {
//     setConfirmPassword(event.target.value);
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//     // TODO: Handle registration logic with Username and password
//       Axios.post('http://localhost:3001/register',{
//         username:username,
//         password:password,
//         confirmPassword:confirmPassword
//       })
      
//       .then((res)=>{
//         console.log("ress--",res.data.code)
//         // alert("Registered Successfully");
//         if (res.data!=="" & res){
//           alert("Registration Successful")
//           navigate('/')
//         }
//         else{
//           alert("Registration Unsuccessful")
//           navigate('/register')
//         }
//       })
//       //  alert(JSON.stringify(event, null, 2));
//       //  navigate('/login')
//      }

//   return (
//     <div>
//       <h1>Register</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Username:
//           <input type="username" id="username" name="username" value={username} onChange={handleUsernameChange} />
//         </label>
//         <label>
//           Password:
//           <input type="password" value={password} id="password" name="password" onChange={handlePasswordChange} />
//         </label>
//         <label>
//           Confirm Password:
//           <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
//         </label>
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// export default RegisterPage;
import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';
function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    Axios.post('http://localhost:3001/register', {
      username: username,
      password: password
    })
    .then(res => {
      console.log(res);
      if (res.data==username) {
        alert('Registration Successful');
        navigate('/');
      } else {
        alert(res);
        navigate('/register');
      }
    })
    .catch(error => {
      console.error(error);
      alert('Registration Unsuccessful');
      navigate('/register');
    });
  }

  return (
    <div className="main">
    <div className='form-container'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username :
          <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} />
        </label>
        <label>
          Password :
          <input type="password" value={password} id="password" name="password" onChange={handlePasswordChange} />
        </label>
        <label>
          Confirm  :
          <input type="password" className='form-control' id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
    </div>
  );
}

export default RegisterPage;
