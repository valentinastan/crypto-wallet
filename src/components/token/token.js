import React from "react";
import { deleteTokenRequest } from "../../requests/token";

const Token = (props) => {
  const currentWallet = localStorage.getItem('address')

  const deleteToken = () => {
    deleteTokenRequest({
      currentWallet,
      contract: props.contract
    }).then((result) => {
      if (result == false) {
        console.log('No such document!');
      } else {
        props.deleteToken(props.index)
      }
    })
   }

  return(
    <React.Fragment>
      <div>token: {props.contract}</div>
      <button type='button' onClick={deleteToken}>Remove</button>
    </React.Fragment>
  );
};
export default Token;
