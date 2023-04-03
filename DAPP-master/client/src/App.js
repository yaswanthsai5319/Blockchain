import React, {useReducer,useState, useEffect} from 'react';
import Context from './store/Context.js';
import InitialeState from './store/InitialeState.js';
import Reducer from './store/Reducer.js';
import ipfs from './components/Ipfs.js';
import AddDocument from './components/AddDocument.js';
import GenerateKeyPair from './components/GenerateKeyPair.js';
import GetDocument from './components/GetDocument.js';
import Notif from './components/Notif.js';
import SimpleStorage from './contracts/SimpleStorage.json';
import GetWeb3 from './utils/GetWeb3.js';
import { useNavigate } from 'react-router-dom';
// import { navigate } from '@reach/router';
import Axios from 'axios';
import './App.css'
import Web3 from 'web3';




function App() {
  // use the reducer hook
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(Reducer, InitialeState);
  const [data,setData] =useState("")
  useEffect(() => {

    async function connectToGanacheAccount() {
      // Check if the browser has MetaMask installed
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);

        try {
          // Request access to MetaMask accounts
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Connect to the local Ganache blockchain
          const networkId = await web3.eth.net.getId();
          if (networkId !== 1337) {
            console.error('Please connect MetaMask to your local Ganache blockchain.');
            return;
          }

          // Get the first account from Ganache
          const accounts = await web3.eth.getAccounts();
          const firstAccount = accounts[0];

          console.log('Connected to the first account in Ganache:', firstAccount);
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
        }
      } else {
        console.error('MetaMask not installed. Please install MetaMask to use this feature.');
      }
    }

    connectToGanacheAccount()

    if(sessionStorage.length==0)
        {
            navigate('/')
        }

    const init = async () => {
      // get web3 instance
      const web3 = await GetWeb3();
      
      // get accounts      
      const accounts = await web3.eth.getAccounts();

      // get the contract instance from the blockchain
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorage.networks[networkId];      
      const contract = new web3.eth.Contract(
        SimpleStorage.abi,
        deployedNetwork && deployedNetwork.address,
      );
      
      // set the web3 instance to a global variable
      dispatch({type: 'SET_WEB3', payload: web3});

      // set accounts to a global variable
      dispatch({type: 'SET_ACCOUNTS', payload: accounts});
      
      // set the contract instance to a global variable
      dispatch({type: 'SET_CONTRACT', payload: contract});
    }

    // launch the init function
    init();

    // if the account of metamask change, the accounts will be updated
    window.ethereum.on('accountsChanged', accounts => {
      dispatch({type: 'SET_CONTRACT', payload: accounts});
    });
  }, []);

  const handleClick=()=>{
        sessionStorage.clear()
        navigate('/')
  }

  const getAll = () => {
  Axios.get('http://localhost:3001/get', {
    params: {
      username: sessionStorage.getItem('username')
    }
  }).then((response) => {
    if (response.data!==[]) {
      setData(response.data);
    }
  });
};

  // the app will be started if the state is not null
  if(state && !state.loading) {
    return (
      // Provide state and dispatch function to the components of the app
      <Context.Provider value={{state, dispatch}}>
        <br/><br/>
         
        {state.msg && <Notif />}

         <div className="components-container">
        <AddDocument />
        <GetDocument />
        </div>
        <hr/>

         
        <GenerateKeyPair/>
        <button type='submit' className='logout-btn' onClick={handleClick}>Logout</button>
        {data !== "" && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Path</th>
                <th>Private Key</th>
                <th>Extension</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
          <tr key={index}>
            <td>{item.path}</td>
            <td>{item.key}</td>
            <td>{item.extension}</td>
          </tr>
        ))}
            </tbody>
          </table>
        </div>
      )}
        <button type='submit' className="get-data-button" onClick={getAll}>Received Data</button>

      </Context.Provider>
      
    );
  } else {
    // if the state in null, the app shows loading message
    return (
      <>
      <br/><br/>
      <h2>Loading...</h2>
      </>
    )
  }
}

export default App;
