import React from 'react'
import ConnectWallet from '../components/wallet/connectWallet'
import Sky from './sky'
import "../../node_modules/react-dat-gui/dist/index.css";

const ConnectWalletPage = () => {

  return(
    <React.Fragment>
      <Sky></Sky>
      <ConnectWallet></ConnectWallet>
    </React.Fragment>
  )
}
export default ConnectWalletPage