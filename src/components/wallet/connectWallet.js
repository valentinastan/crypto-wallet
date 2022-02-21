import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "../../state-management/stores/store";
import Button from '@material-ui/core/Button';
import './connectWallet.css'

const ConnectWallet = () => {
  const [currentAccount, setCurrentAccount] = useState(localStorage.getItem('address'));
  const dispatch = useDispatch()

  const checkWalletIsConnected = () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists!");
    }
  };

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Found an account! Address: ", accounts[0]);
      
      setCurrentAccount(accounts[0]) //!! de modificat
      const address = accounts[0]
        dispatch({
          type: '[WALLET] Set Address',
          address
        })
    } catch (err) {
      console.log(err);
    }
  };

  const connectWalletButton = () => {
    return <div className="connect-wallet">
      <Button onClick={connectWalletHandler} variant="outlined" /*color="primary"*/>
        Connect Wallet
      </Button>
    </div>
 };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  return (
    <React.Fragment >
      {connectWalletButton()}
      {currentAccount && <Navigate to="/wallet" replace />}
    </React.Fragment>
  );
};
export default ConnectWallet;
