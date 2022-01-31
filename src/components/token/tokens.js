import React, { useEffect, useState } from "react";
import { getPricesRequest, getTokensByWallet } from "../../requests/token";
import AddTokenForm from "./addTokenForm";
import Token from "./token";

import constants from "../../const";
import { ethers } from "ethers";

import Web3 from "web3";

const Tokens = () => {
  const [tokens, setState] = useState([
    {
      symbol: "",
      balance: null,
      price: null,
    },
  ]);
  const currentWallet = localStorage.getItem("address");
  const web3 = new Web3(Web3.givenProvider);

  useEffect(() => {
    getTokensByWallet(currentWallet).then((tokensSnapshot) => {
      if (tokensSnapshot.empty) {
        console.log("No matching documents.");
        // return;
      } else {
        const tokensSymbol = [];
        tokensSnapshot.forEach((token) => {
          tokensSymbol.push(token.data().tokenSymbol);
        });
        setTokensState(tokensSymbol, 'INDEX');
      }
    });
  }, []);

  const getBalance = async (tokenSymbol) => {
    var MyContract = new web3.eth.Contract(
      constants[tokenSymbol].tokenABI,
      constants[tokenSymbol].tokenAddress,
      {
        from: currentWallet,
      }
    );

    const tokenBalance = await MyContract.methods
      .balanceOf(currentWallet)
      .call();
    return ethers.utils.formatEther(tokenBalance);
  };

  const getPrices = async (tokens) => {
    return await getPricesRequest(tokens);
  };

  const deleteToken = (index) => {
    tokens.splice(index, 1);
    setState([...tokens]);
  };

  const addToken = (token) => {
    setTokensState([token], 'ADD');
  };

  const setTokensState = async (tokensSymbol, action) => {
    let prices = await getPrices(tokensSymbol);
   
    const newValues = [];
    for (const symbol of tokensSymbol) {
      let priceInfo =  prices.filter(token => token.symbol.toUpperCase() === symbol.toUpperCase())
      let balance = await getBalance(symbol);

      newValues.push({
        symbol,
        balance,
        price: priceInfo.length > 0 ? priceInfo[0].price : null,
      });
    }

    switch (action) {
      case 'INDEX':
        setState([...newValues]);
        break;

      case 'ADD':
        setState([...tokens, ...newValues]);

        break;
    
      default:
        setState([...tokens]);
        break;
    }
  };

  return (
    <React.Fragment>
      <AddTokenForm addToken={addToken}></AddTokenForm>
      {tokens.length > 0 &&
        tokens.map((token, i) => (
          <Token
            key={`idToken_${i + 1}`}
            index={i}
            token={{ ...token }}
            deleteToken={deleteToken}
          ></Token>
        ))}
    </React.Fragment>
  );
};
export default Tokens;
