import React from "react";
import SwitchTheme from "../components/switchTheme";
import Tokens from "../components/token/tokens";
import NavBar from "../components/navBar/navBar";
import './pages.css'

const WalletPage = () => {
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
