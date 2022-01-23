import React, { useEffect, useState } from "react";
import { getTokensByWallet } from "../../requests/token";
import AddTokenForm from "./addTokenForm";
import Token from "./token";

const Tokens = () => {
  const [tokens, setState] = useState([])
  const currentWallet = localStorage.getItem('address')

  useEffect(() => {
    getTokensByWallet(currentWallet)
      .then((tokensSnapshot) => {
        if (tokensSnapshot.empty) {
          console.log('No matching documents.');
          // return;
        } 
        else {
          const tokens = []
          tokensSnapshot.forEach(token => {
            tokens.push(token.data().contract)
          })
          setState([...tokens])
        }
    })
  }, [])

  const deleteToken = (index) => {
    tokens.splice(index, 1)
    console.log(tokens)
    setState([...tokens])
  }

  const addToken = (token) => {
    tokens.push(token)
    console.log(tokens)
    setState([...tokens])
  }


  return(
    <React.Fragment>
      <AddTokenForm addToken={addToken}></AddTokenForm>
      {
        (tokens.length > 0) && 
          tokens.map((token, i) => <Token key={`idToken_${i+1}`} index={i} contract={token} deleteToken={deleteToken}></Token>)
      }
    </React.Fragment>
  );
};
export default Tokens;
