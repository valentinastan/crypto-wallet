import React from "react";
import { deleteTokenRequest } from "../../requests/token";

const Token = (props) => {
  const currentWallet = localStorage.getItem('address')
console.log('props', props)
  const deleteToken = () => {
    deleteTokenRequest({
      currentWallet,
      symbol: props.token.symbol
    }).then((result) => {
      if (result === false) {
        console.log('No such document!');
      } else {
        props.deleteToken(props.index)
      }
    })
   }

  return(
    <React.Fragment>
      <div>token: {props.token.symbol}</div>
      <div>balance: {props.token.balance}</div>
      <button type='button' onClick={deleteToken}>Remove</button>
    </React.Fragment>
  );
};
export default Token;
