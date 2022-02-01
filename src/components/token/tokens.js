import React, { useEffect, useState } from "react";
import { getPricesRequest, getTokensByWallet } from "../../requests/token";
import AddTokenForm from "./addTokenForm";
import Token from "./token";

import constants from "../../const";
import { ethers } from "ethers";

import Web3 from "web3";

const Tokens = () => {
  const [tokens, setState] = useState({
    "": {
      balance: null,
      price: null,
    },
  });

  const [currentSymbolsState, setCurrentSymbols] = useState()
  // const [tokens, setState] = useState([
  //   {
  //     symbol: "",
  //     balance: null,
  //     price: null,
  //   },
  // ]);
  const currentWallet = localStorage.getItem("address");
  const web3 = new Web3(Web3.givenProvider);
  let nIntervId;

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
        setCurrentSymbols(tokensSymbol)
        saveTokens(tokensSymbol, 'INDEX')
        refreshPrices(tokensSymbol)
        //setTokensState(tokensSymbol, 'INDEX');
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
    console.log(tokens)
    return await getPricesRequest(tokens);
  };

  const deleteToken = (symbolDeleted, index) => {
    delete tokens[symbolDeleted];
    console.log('DELETE', tokens)
    setState({...tokens});
    //setCurrentSymbols(currentSymbolsState.splice(index, 1))
  };

  const addToken = (symbol) => {
    saveTokens([symbol], 'ADD');
    //setCurrentSymbols([currentSymbolsState, symbol])
  };

  const refreshPrices = (symbols) => {
   if (!nIntervId) {
      nIntervId = setInterval(() => {
        saveTokens(symbols, 'INDEX')
      }, 20000)
    }
  }

  const setTokensState = async (tokensSymbol, action) => {
    // refreshPrices(tokensSymbol)
    // console.log('pricesInfoState: ', pricesInfoState)
 
    //  //console.log('update state',prices)
    // // let prices = await refreshPrices(tokensSymbol)
    // //let prices = await getPrices(tokensSymbol);
  };

  const saveTokens = async (tokensSymbol, action) => {
    let prices = await getPrices(tokensSymbol);
    const newValues = {};
    for (const symbol of tokensSymbol) {
      let priceInfo =  prices?.filter(token => token.symbol.toUpperCase() === symbol.toUpperCase())
      let balance = await getBalance(symbol);
      
      newValues[symbol] = {
        balance,
        price: (priceInfo !== undefined && priceInfo.length > 0) ? priceInfo[0].price : (tokens.hasOwnProperty(symbol) && tokens[symbol].price !== null) ? tokens[symbol].price : null,
      }
      // newValues.push({
      //   symbol,
      //   balance,
      //   price: (priceInfo !== undefined && priceInfo.length > 0) ? priceInfo[0].price : (tokens.hasOwnProperty(symbol) && tokens[symbol].price !== null) ? tokens[symbol].price : null,
      // });
    }
    console.log(newValues)
   // setState({...newValues});

    switch (action) {
      case 'INDEX':
        setState({...newValues});
        break;

      case 'ADD':
        console.log(tokens, newValues)
        setState({...tokens, ...newValues});//de modif

        break;
    
      default:
        setState({...tokens});
        break;
    }
  }

  return (
    <React.Fragment>
      <AddTokenForm addToken={addToken}></AddTokenForm>
      {(tokens !== undefined && Object.keys(tokens).length > 0) &&
        Object.keys(tokens).map((key, i) => (
          <Token
            key={`idToken_${i + 1}`}
            index={i}
            token={{...tokens[key], symbol: key}}
            deleteToken={deleteToken}
          ></Token>
        ))}
    </React.Fragment>
  );
};
export default Tokens;
