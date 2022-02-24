import React from "react";
import SwitchTheme from "../components/switchTheme";
import Tokens from "../components/token/tokens";

const WalletPage = () => {
  return (
    <React.Fragment>
      <SwitchTheme></SwitchTheme>
      <Tokens></Tokens>
    </React.Fragment>
  );
};
export default WalletPage;
