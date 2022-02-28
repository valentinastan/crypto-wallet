import React from "react";
import SwitchTheme from "../components/switchTheme";
import Tokens from "../components/token/tokens";
import Charts from "../components/charts/charts";

const WalletPage = () => {
  return (
    <React.Fragment>
      <SwitchTheme></SwitchTheme>
      <Charts></Charts>
      <Tokens></Tokens>
    </React.Fragment>
  );
};
export default WalletPage;
