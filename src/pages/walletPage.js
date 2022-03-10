import React, { useEffect } from "react";
import SwitchTheme from "../components/switchTheme";
import Tokens from "../components/token/tokens";
import NavBar from "../components/navBar/navBar";
import './pages.css'
import Web3 from "web3";
import { useDispatch } from "../state-management/stores/store";


const WalletPage = () => {
  const dispatch = useDispatch()
  const web3 = new Web3(Web3.givenProvider); 

  // const target_chain = Object.assign({}, web3.eth.Contract.currentProvider);
  // var currentId = target_chain.networkVersion //networkVersion

  // const [currentNetworkId, setCurrentNetworkId] = useState(currentId)
  // console.log('current', currentNetworkId)

  window.ethereum.on('networkChanged', function (networkId) {
    console.log('aicicicicicicicci', networkId)
    dispatch({
      type: '[WALLET] Set Network',
      networkId
    })
  })

  console.log('!!!!!!!!!!!!!!!!!!!!!!',window.ethereum.isConnected())
  console.log('#######333', window.ethereum.on('connect', (chainIdHexa) => chainIdHexa))

  // useEffect(() => {
    
    // window.ethereum.isConnected().then(() => {
    //   dispatch({
    //     type: '[WALLET] Set Network',
    //     networkId: window.ethereum.on('connect', (chainIdHexa) => chainIdHexa.networkVersion)
    //   })
    // }) 
  // }, [])

  window.ethereum.on('connect', (network) => {
    return dispatch({
      type: '[WALLET] Set Network',
      networkId: parseInt(network.chainId, 16),
    })
  });


  return (
    <React.Fragment>
      <div className="walletPage">
        <NavBar></NavBar>
        <SwitchTheme></SwitchTheme>
        <Tokens></Tokens>
      </div>
    </React.Fragment>
  );
};
export default WalletPage;
