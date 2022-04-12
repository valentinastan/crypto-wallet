import React from "react";
import Tokens from "../components/token/tokens";
import NavBar from "../components/navBar/navBar";
import './pages.css'
import { useDispatch } from "../state-management/stores/store";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";


const WalletPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  // const web3 = new Web3(Web3.givenProvider); 

  // const target_chain = Object.assign({}, web3.eth.Contract.currentProvider);
  // var currentId = target_chain.networkVersion //networkVersion
  // const [currentNetworkId, setCurrentNetworkId] = useState(currentId)
  // console.log('current', currentNetworkId)

  window.ethereum.on('accountsChanged', (accounts) => {
    if(accounts[0] !== undefined) {
      localStorage.setItem('address', accounts[0])
      dispatch({
        type: '[WALLET] Set Address',
        address: accounts[0]
      })
    } else {
      localStorage.removeItem('address');
      navigate('/')
    }
  });

  window.ethereum.on('chainChanged', function (networkId) {
    dispatch({
      type: '[WALLET] Set Network',
      networkId: parseInt(networkId, 16),
    })
  })

  window.ethereum.on('connect', (network) => {
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
        <Tokens></Tokens>
        <Footer></Footer>
      </div>
    </React.Fragment>
  );
};
export default WalletPage;
