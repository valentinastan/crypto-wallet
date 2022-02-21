import React, { useEffect, useState } from "react";
import { getPricesRequest, getTokensByWallet } from "../../requests/token";
import AddTokenForm from "./addTokenForm";
import Token from "./token";

import constants from "../../const";
import { ethers } from "ethers";

import Web3 from "web3";
import TokensTable from "./tokensTable";

const Tokens = () => {
  // const [tokens, setState] = useState({
  //   "": {
  //     balance: null,
  //     price: null,
  //   },
  // });
  const [tokens, setState] = useState({});
  console.log('se rerandeaza')

  const [currentSymbolsState, setCurrentSymbols] = useState(Object.keys(tokens))
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
        console.log('IN PRIMUL USE EFFECT')
        
        saveTokens(tokensSymbol, 'INDEX')
        setCurrentSymbols(tokensSymbol)
        //refreshPrices()
      }
    });
  }, []);

  useEffect(() => {
    if(currentSymbolsState.length > 0) {
      let symbols = [...currentSymbolsState]
      refreshPrices()
    }
    return () => {
      clearInterval(nIntervId);
    }
  }, [currentSymbolsState]);

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
    console.log('IN GET PRICES', tokens)
    return await getPricesRequest(tokens);
  };

  const deleteToken = (symbolDeleted, index) => {
    delete tokens[symbolDeleted];
    console.log('DELETE', tokens)
    setState({...tokens});
    let symbols = Object.keys(tokens)
    setCurrentSymbols([...symbols])
  };

  const addToken = (symbol) => {
    console.log('ADD', symbol)
    saveTokens([symbol], 'ADD').then(() => {

    })
    let currentSymbols = [...currentSymbolsState]
    currentSymbols.push(symbol)
    setCurrentSymbols([...currentSymbols])
  };

  const refreshPrices = () => {
   if (!nIntervId) {
      nIntervId = setTimeout(() => {
        if(currentSymbolsState !== undefined && currentSymbolsState.length > 0) {
          saveTokens(currentSymbolsState, 'INDEX')
        }
      }, 90000)
    }
    return () => {
      clearInterval(nIntervId);
    }
  }


  const saveTokens = async (tokensSymbol, action) => {
    let prices = await getPrices(tokensSymbol);
    const newValues = {};
    for (const symbol of tokensSymbol) {
      let priceInfo =  prices?.filter(token => token.symbol.toUpperCase() === symbol.toUpperCase())
      let balance = await getBalance(symbol);
      
      newValues[symbol] = {
        balance,
        price: (priceInfo !== undefined && priceInfo.length > 0) ? priceInfo[0].price : (tokens?.hasOwnProperty(symbol) && tokens[symbol].price !== null) ? tokens[symbol].price : null,
      }

    }
    console.log('salvez in state', newValues)

    switch (action) {
      case 'INDEX':
        setState({...newValues});
        setCurrentSymbols(Object.keys(newValues))

        break;
      case 'ADD':
        setState({...tokens, ...newValues});
        setCurrentSymbols([...Object.keys(tokens), ...Object.keys(newValues)])

        break;
      default:
        setState({...tokens});
        setCurrentSymbols(Object.keys(newValues))

        break;
    }
  }

  const createData = (data) => {
    const tableTokens = {}

    Object.keys(data).filter(key => data[key].balance > 0.000005).map((key, i) => {
      tableTokens[key] = {
        id: i + 1,
        index: i + 1,
        token: {...data[key], symbol: key},
        deleteToken: () => deleteToken()
      }
    })

    return <TokensTable tokens={tableTokens}></TokensTable>
}

  return (
    <React.Fragment>
      <AddTokenForm addToken={addToken}></AddTokenForm>

      {(tokens !== undefined && Object.keys(tokens).length > 0) &&
          createData(tokens)  
      }

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
