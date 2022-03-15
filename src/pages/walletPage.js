import React from "react";
import Tokens from "../components/token/tokens";
import NavBar from "../components/navBar/navBar";
import './pages.css'
import { useDispatch } from "../state-management/stores/store";


const WalletPage = () => {
  const dispatch = useDispatch()
  // const web3 = new Web3(Web3.givenProvider); 

  // const target_chain = Object.assign({}, web3.eth.Contract.currentProvider);
  // var currentId = target_chain.networkVersion //networkVersion
  // const [currentNetworkId, setCurrentNetworkId] = useState(currentId)
  // console.log('current', currentNetworkId)

  window.ethereum.on('accountsChanged', (accounts) => {
    dispatch({
      type: '[WALLET] Set Address',
      address: accounts[0]
    })

  });

  window.ethereum.on('chainChanged', function (networkId) {
    console.log('llalal', networkId)
    dispatch({
      type: '[WALLET] Set Network',
      networkId: parseInt(networkId, 16),
    })
  })

  window.ethereum.on('connect', (network) => {
    console.log('la connetc', network)
    return dispatch({
      type: '[WALLET] Set Network',
      networkId: parseInt(network.chainId, 16),
    })
  });

  // return window.ethereum.removeListener('networkChanged', () => {});

  return (
    <React.Fragment>
      <div className="walletPage">
        <NavBar></NavBar>
        {/* <SwitchTheme></SwitchTheme> */}
        <Tokens></Tokens>
      </div>
    </React.Fragment>
  );
};
export default WalletPage;
