import React from 'react'
import ConnectWallet from '../components/wallet/connectWallet'
import { useStore } from '../state-management/stores/store'

const ConnectWalletPage = () => {
  const [state, dispatch] = useStore()
  console.log('in pagina2: store este= ', state)

  return(
    <React.Fragment>
      <ConnectWallet></ConnectWallet>
    </React.Fragment>
  )
}
export default ConnectWalletPage