import React, { useState } from 'react'
import { addTokenRequest } from '../../requests/token'

const AddTokenForm = (props) => {

  const [tokenSymbol, setState] = useState('')
  const walletAddress = localStorage.getItem('address')
 
  const importToken = () => {
    addTokenRequest({
      walletAddress,
      tokenSymbol,
    }).then((data) => {
      if (false || !data.exists) {
        console.log('No such document!');
      } else {
        props.addToken(data.data().tokenSymbol)
        setState('')
      }
    })
  }


  return(
    <React.Fragment>
      <div>Token Address</div>
      <input 
        id="addtokenSymbol" 
        onChange={(event) => setState(event.target.value.toUpperCase())}
        placeholder="Add a new token..."
        value={tokenSymbol}
        type="text"
      ></input> <br/>
      {/* <IconButton
        colorScheme='teal'
        aria-label='Add Token'
        icon={<AddIcon />}
      /> */}
  
      <button type='button' onClick={importToken}>Import</button>
    </React.Fragment>
  )
}
export default AddTokenForm