import React, {useState, useContext} from 'react';
import Ipfs from './Ipfs';
import NodeRSA from 'node-rsa';
import Context from '../store/Context';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
const AddDocument = () => {
  const navigate=useNavigate()
  const {state, dispatch} = useContext(Context);

  const [buffer, setBuffer] = useState();
  const [publicKey, setPublicKey] = useState();
  const [privateKey,setPrivateKey]=useState();
  const [username,setUsername]=useState();
  const [ext,setExt]=useState("");
  const handleFileChange = e => {
    const file = e.target.files[0];
    // console.log(file);
    setExt(file.name.split('.').pop())
    // console.log(file);
    const reader = new window.FileReader();
    // console.log("reader");
    reader.readAsArrayBuffer(file);
    // console.log();
    
    reader.onloadend = () => {
      setBuffer(Buffer(reader.result));
      // console.log(reader.result);
    }

    // console.log("final");
  }

  const handleKeyChange = e => {
    setPublicKey(e.target.value);
  }

  const handlePKeyChange = e => {
    setPrivateKey(e.target.value);
  }

  const handleUserName = e =>{
    setUsername(e.target.value);
  }
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      dispatch({type: 'SET_LOADING', payload: true});
      const key = new NodeRSA(state.publicKey);
      // console.log(key);
      // console.log("buffer",buffer);
      const encrypt = key.encrypt(buffer);
      // console.log(encrypt)
      let filePath="";
      for await (const result of Ipfs.add(encrypt)) {
        await state.contract.methods
          .set(result.path)
          .send({from: state.accounts[0]});
        // console.log("final-2");
        filePath = result.path;
        dispatch({type: 'SET_PATH', payload: result.path});
        dispatch({
          type: 'SET_NOTIF',
          payload: {msg: result.path, success: true}
        });
      }
      //ikkada manam post cheyali data ni
      // console.log(filePath);
      // console.log(privateKey)
      // Axios.post("http://localhost:3001/post",{
      //   username:username,
      //   key:privateKey,
      //   path: filePath,
      //  })
      //  .then((res)=>{
      //   console.log(res);
      //   if(res.data==username)
      //   {
      //     console.log("Data sent");
      //   }
      //   else{
      //   alert(res.data.message);
      //   }
      //  })
      Axios.post("http://localhost:3001/post",{
  username: username,
  
  path: filePath,
  pkey: state.privateKey,
  exxt:ext,
})
.then((res)=>{
  // console.log(res);
  if(res.data==username) {
    console.log("Data sent");
  } else {
    alert(res.data.message);
  }
});
    } catch (error) {
      dispatch({
        type: 'SET_NOTIF',
        payload: {msg: error.message, success: false}
      });
    } finally {
      dispatch({type: 'SET_LOADING', payload: false});
    }
  }

  
  return (
    <div className='add-document'>
    <h2><b>SEND</b></h2>
    <form onSubmit={handleSubmit}>
      <label>File</label>
      <input
        className='u-full-width'
        type='file'
        onChange={handleFileChange}
        required />
        <label>Username</label>
      <input
        className='u-full-width'
        type='text'
        onChange={handleUserName}
        required />
      <label>Public Key</label>
      <input
        className='u-full-width'
        type='text'
        value={state.publicKey || ''}
        onChange={handleKeyChange}
        required />
        <label>Private Key</label>
      <input
        className='u-full-width'
        type='text'
        value={state.privateKey || ''}
        onChange={handlePKeyChange}
        required />
      <button
        className='u-full-width button-primary'
        type='submit'>
        submit
      </button>
      
    </form>
    </div>
  )
}

export default AddDocument;


