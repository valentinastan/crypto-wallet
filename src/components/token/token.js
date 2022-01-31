import React from "react";
import { deleteTokenRequest } from "../../requests/token";

const Token = (props) => {
  const currentWallet = localStorage.getItem("address");
  console.log("props", props);

  const deleteToken = () => {
    deleteTokenRequest({
      currentWallet,
      symbol: props.token.symbol,
    }).then((result) => {
      if (result === false) {
        console.log("No such document!");
      } else {
        props.deleteToken(props.index);
      }
    });
  };

  const calculateTotal = () => {
    if(parseFloat(props.token.balance) > 0 && props.token.price > 0 ){
      return (parseFloat(props.token.balance)*props.token.price).toFixed(2)
    } else {
      return 0;
    }
  }

  return (
    <React.Fragment>
      <div>token: {props.token.symbol}</div>
      <div>balance: {parseFloat(props?.token?.balance || 0).toFixed(2)}</div>
      <div>price: {parseFloat(props?.token?.price || 0).toFixed(2)} USD</div>
      <div>total: {calculateTotal()} USD</div>
      <button type="button" onClick={deleteToken}>
        Remove
      </button>
    </React.Fragment>
  );
};
export default Token;
