import React, { useEffect, useState } from "react";
import { getPricesRequest, getTokensByWallet } from "../../requests/token";
import AddTokenForm from "./addTokenForm";
import Token from "./token";


import constants from '../../const'
import { ethers } from "ethers";

import Web3 from "web3";

const Tokens = () => {
  const [tokens, setState] = useState([
    {
      symbol: '',
      balance: null,
      price: null,
    }
  ])
  const currentWallet = localStorage.getItem('address')
  const web3 = new Web3(Web3.givenProvider);

  useEffect(() => {
    getTokensByWallet(currentWallet)
      .then((tokensSnapshot) => {
        if (tokensSnapshot.empty) {
          console.log('No matching documents.');
          // return;
        } 
        else {
          const tokensSymbol = []
          tokensSnapshot.forEach(token => {
            tokensSymbol.push(token.data().tokenSymbol)
          })
          setTokensState(tokensSymbol)
          // getPrices(tokens).then((result) => {
          //   console.log(result)
          //   result.forEach(token => getBalance(token))
          //  // setState([...tokens])
          // })
        }
    })
  }, [])

  const getBalance = async (tokenSymbol) => {
    var MyContract = new web3.eth.Contract(constants[tokenSymbol].tokenABI, constants[tokenSymbol].tokenAddress, {
      from: currentWallet, // default from address
    });

    await MyContract.methods.balanceOf(currentWallet).call()
      .then((balance) => {
        console.log('in getBalance:', ethers.utils.formatEther(balance))
        console.log(typeof(balance))
        if(balance !== undefined) {
          return ethers.utils.formatEther(balance)
        } else return 0
    });
  }

  // const getPrices = (tokens) => {
    // console.log('tokens', tokens)
  //  getPricesRequest(tokens)
  // }

  const deleteToken = (index) => {
    tokens.splice(index, 1)
    console.log(tokens)
    setState([...tokens])
  }

  const addToken = (token) => {
    console.log('data', token)
    tokens.push(token)
    console.log(tokens)
    setTokensState(tokens)
    // setState([...tokens])
  }

  const setTokensState = async (tokensSymbol) => {
    const newValues = []
    for(const symbol of tokensSymbol) {
      let balance = await getBalance(symbol)
      console.log('in for:', balance)
      newValues.push({
        symbol,
        balance,
        price: null, //getPrice()
      })
    }

    console.log("values" , newValues)
    setState([...newValues])
  }


  return(
    <React.Fragment>
      <AddTokenForm addToken={addToken}></AddTokenForm>
      {
        (tokens.length > 0) && 
          tokens.map((token, i) => <Token key={`idToken_${i+1}`} index={i} token={{...token}} deleteToken={deleteToken}></Token>)
      }
    </React.Fragment>
  );
};
export default Tokens;
