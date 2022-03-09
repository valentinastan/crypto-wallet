import React, { useEffect, useState } from "react";
import { deleteTokenRequest, getPricesRequest, getTokensByWallet } from "../../requests/token";
import Token from "./token";

import constants from "../../const";
import { ethers } from "ethers";
import Web3 from "web3";

import { Table, Thead, Tbody, Tr, Th, useDisclosure, Divider } from "@chakra-ui/react";
import AddTokenModal from "./addTokenModal";
import DeleteTokenAlert from "./deleteTokenAlert";
import TokenToast from "../tokenToast";
import DonutChartWallet from "../charts/donutChartWallet";

const Tokens = () => {
  // const [tokens, setState] = useState({
  //   "": {
  //     balance: null,
  //     price: null,
  //   },
  // });
  
  const [tokens, setState] = useState({});
  const [currentSymbolsState, setCurrentSymbols] = useState(
    Object.keys(tokens)
  );
  const [showDeleteModal, setShowDeleteModal] = useState({symbol: ''});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  // const [tokens, setState] = useState([
  //   {
  //     symbol: "",
  //     balance: null,
  //     price: null,
  //   },
  // ]);
  const currentWallet = localStorage.getItem("address");
  const web3 = new Web3(Web3.givenProvider); //tr vazut cand se schimba val asta  x network
  // console.log('******* WEB3: ', web3)
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
        console.log("IN PRIMUL USE EFFECT");

        saveTokens(tokensSymbol, "INDEX");
        setCurrentSymbols(tokensSymbol);
        //refreshPrices()
      }
    });
  }, []);

  useEffect(() => {
    if (currentSymbolsState.length > 0) {
      let symbols = [...currentSymbolsState];
      refreshPrices();
    }
    return () => {
      clearInterval(nIntervId);
    };
  }, [currentSymbolsState]);

  const getBalance = async (tokenSymbol) => {
    var MyContract = new web3.eth.Contract(
      constants[tokenSymbol].tokenABI,
      constants[tokenSymbol].tokenAddress,
      {
        from: currentWallet,
      }
    );

    try {
      const tokenBalance = await MyContract.methods
        .balanceOf(currentWallet)
        .call();
      return ethers.utils.formatEther(tokenBalance);
    } catch(ex) {
      alert(ex)
    }
  };

  const getPrices = async (tokens) => {
    console.log("IN GET PRICES", tokens);
    return await getPricesRequest(tokens);
  };

  const deleteToken = () => {
    deleteTokenRequest({
      currentWallet,
      symbol: showDeleteModal.symbol,
    }).then((result) => {
      if (result === false) {
        console.log("No such document!");
      } else {
        delete tokens[showDeleteModal.symbol];
        console.log("DELETE", tokens, showDeleteModal);
        setState({ ...tokens });
        let symbols = Object.keys(tokens);
        setCurrentSymbols([...symbols]);
        
        setShowDeleteModal({symbol: ''})        
        setShowDeleteToast(true)
      }
    });
  };

  const deletePressed = (symbol) => {
    setShowDeleteToast(false)
    setShowDeleteModal({symbol})
    onOpen()
  }

  const addToken = (symbol) => {
    console.log("ADD", symbol);
    saveTokens([symbol], "ADD").then(() => {
      let currentSymbols = [...currentSymbolsState];
      currentSymbols.push(symbol);
      setCurrentSymbols([...currentSymbols]);
    });
  };

  const refreshPrices = () => {
    if (!nIntervId) {
      nIntervId = setTimeout(() => {
        setShowDeleteToast(false)
        if (
          currentSymbolsState !== undefined &&
          currentSymbolsState.length > 0
        ) {
          saveTokens(currentSymbolsState, "INDEX");
        }
      }, 90000);
    }
    return () => {
      clearInterval(nIntervId);
    };
  };

  const saveTokens = async (tokensSymbol, action) => {
    setShowDeleteToast(false)
    let prices = await getPrices(tokensSymbol);
    const newValues = {};

    for (const symbol of tokensSymbol) {
      let priceInfo = (prices || []).filter(
        (token) => token.symbol.toUpperCase() === symbol.toUpperCase()
      );
      let balance = await getBalance(symbol);

      if (priceInfo !== undefined && priceInfo.length > 0) {
        newValues[symbol] = {
          balance,
          price: priceInfo[0].price,
          image: priceInfo[0].image,
          price_change_percentage_24h: priceInfo[0].price_change_percentage_24h,
        };
      } else {
        if (tokens?.hasOwnProperty(symbol) && tokens[symbol].price !== null) {
          newValues[symbol] = {
            balance,
            price: tokens[symbol].price,
            image: tokens[symbol]?.image,
            price_change_percentage_24h:
              tokens[symbol]?.price_change_percentage_24h,
          };
        } else {
          newValues[symbol] = {
            balance,
            price: null,
            image: null,
            price_change_percentage_24h: null,
          };
        }
      }
      // newValues[symbol] = {
      //   balance,
      //   price: (priceInfo !== undefined && priceInfo.length > 0) ? priceInfo[0].price : (tokens?.hasOwnProperty(symbol) && tokens[symbol].price !== null) ? tokens[symbol].price : null,
      // }
    }

    switch (action) {
      case "INDEX":
        setState({ ...newValues });
        setCurrentSymbols(Object.keys(newValues));

        break;
      case "ADD":
        setState({ ...tokens, ...newValues });
        setCurrentSymbols([...Object.keys(tokens), ...Object.keys(newValues)]);

        break;
      default:
        setState({ ...tokens });
        setCurrentSymbols(Object.keys(newValues));

        break;
    }
  };

  return (
    <React.Fragment>
      <DonutChartWallet tokens={tokens}></DonutChartWallet>
      <AddTokenModal tokens={tokens} addToken={addToken}></AddTokenModal>

      <Table variant="simple" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Index</Th>
            <Th>Symbol</Th>
            <Th isNumeric>% 24h</Th>
            <Th isNumeric>Price</Th>
            <Th isNumeric>Balance</Th>
            <Th isNumeric>Amount</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {tokens !== undefined &&
            Object.keys(tokens).length > 0 &&
            Object.keys(tokens).map((key, i) => (
              <Token
                key={`idToken_${i + 1}`}
                index={i}
                token={{ ...tokens[key], symbol: key }}
                deleteToken={deleteToken}
                deletePressed={deletePressed}
              ></Token>
            ))}
        </Tbody>
      </Table>
      <DeleteTokenAlert deleteToken={deleteToken} symbol={showDeleteModal.symbol} onClose={onClose} isOpen={isOpen}></DeleteTokenAlert>
      {showDeleteToast && (
        <TokenToast
          actionStatus="error"
          title="Token deleted."
          description="We've deleted your token."
        ></TokenToast>
      )}
      {/* {(tokens !== undefined && Object.keys(tokens).length > 0) &&
        Object.keys(tokens).map((key, i) => (
          <Token
            key={`idToken_${i + 1}`}
            index={i}
            token={{...tokens[key], symbol: key}}
            deleteToken={deleteToken}
          ></Token>
        ))} */}
    </React.Fragment>
  );
};
export default Tokens;
