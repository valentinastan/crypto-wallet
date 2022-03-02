import React from "react";
import SwitchTheme from "../components/switchTheme";
import Tokens from "../components/token/tokens";
import Charts from "../components/charts/charts";
import NavBar from "../components/navBar/navBar";
import './pages.css'

const WalletPage = () => {
  return (
    <React.Fragment>
      <div className="walletPage">
        <NavBar></NavBar>
        <SwitchTheme></SwitchTheme>
        <Charts></Charts>
        <Tokens></Tokens>
      </div>
    </React.Fragment>
  );
};
export default WalletPage;
