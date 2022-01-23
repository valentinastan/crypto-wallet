import React, { useState } from 'react'
import { addTokenRequest } from '../../requests/token'

const AddTokenForm = (props) => {

  const [contract, setState] = useState('')
  const walletAddress = localStorage.getItem('address')
 
  const importToken = () => {
    addTokenRequest({
      walletAddress,
      contract,
    }).then((data) => {
      if (false || !data.exists) {
        console.log('No such document!');
      } else {
        props.addToken(data.data().contract)
        setState('')
      }
    })
  }


  return(
    <React.Fragment>
      <div>Token Address</div>
      <input 
        id="addContract" 
        onChange={(event) => setState(event.target.value)}
        placeholder="Add a new token..."
        value={contract}
        type="text"
      ></input> <br/>
      <button type='button' onClick={importToken}>Import</button>
    </React.Fragment>
  )
}
export default AddTokenForm