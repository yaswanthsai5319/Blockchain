import React, {useState, useContext} from 'react';
import Ipfs from './Ipfs';
import concat from 'it-concat';
import NodeRSA from 'node-rsa';
import Context from '../store/Context';

const GetDocument = () => {
  const {dispatch} = useContext(Context);

  const [path, setPath] = useState();
  const [privateKey, setPrivateKey] = useState();
  const [ext,setExt]=useState();
  const handlePathChange = e => {
    setPath(e.target.value);
  }

  const handleKeyChange = e => {
    setPrivateKey(e.target.value);
  }
  const handleExtChange = e => {
    setExt(e.target.value);
  }

  const handleSubmit = async e => {
    try {
      dispatch({type: 'SET_LOADING', payload: true});
      e.preventDefault();
      const key = new NodeRSA(privateKey);
      const data = await concat(Ipfs.cat(path))
      const decrypt = key.decrypt(data);
      const file = decrypt;
      let blob = new Blob([new Uint8Array(
        file.buffer, file.byteOffset, file.length)],);
      // const img = document.createElement('img');
      // const extension = file.type.split('/')[1];  
      // console.log("extension:",extension);
      const url = URL.createObjectURL(blob);
      // console.log(url);
      if (ext==='jpg' || ext ==='jpeg' || ext==='png' || ext=='bmp' || ext=='gif') {
        const url = URL.createObjectURL(blob);
        window.open().document.write('<html><body><img src="' + url + '"></body></html>');
        // console.log("fdfhudfgduyfgdygfudgfudgfugdfgd");
      } else if (ext === 'txt') {
        const text = await blob.text();
        window.open().document.write('<html><body><h1>' + text + '</h1></body></html>');
      }else {
        
        const url = URL.createObjectURL(blob);
window.open(url);
            }
      dispatch({
         type: 'SET_NOTIF',
         payload: {msg: undefined, success: undefined}
      });
    } catch (error) {
      dispatch({
        type: 'SET_NOTIF',
        payload: {
          msg: error.message,
          success: false  
        }
      });
    } finally {
      dispatch({type: 'SET_LOADING', payload: false})
    }
  }

  return (
    <div className='get-document'>
    <h2><b>FETCH</b></h2>
    <form onSubmit={handleSubmit}>
      <label>Path</label>
      <input
        className='u-full-width'
        type='text'
        onChange={handlePathChange}
        required />
      <label>Private Key</label>
      <input
        className='u-full-width'
        type='text'
        onChange={handleKeyChange}
        required />
      <label>Extension</label>
      <input
        className='u-full-width'
        type='text'
        onChange={handleExtChange}
        required />  
      <button
        className='u-full-width button-primary'
        type='submit'>
        get
      </button>
    </form>
    </div>
  )
}

export default GetDocument;
