import React, { useEffect, useState } from "react";
import { deleteTokenRequest, getPricesRequest, getTokensByWallet } from "../../requests/token";
import Token from "./token";

import ethConstants from "../../constants/ethChain/const";
import bnbConstants from "../../constants/bnbChain/const";
import { ethers } from "ethers";
import Web3 from "web3";

import { Table, Thead, Tbody, Tr, Th, useDisclosure, IconButton, Flex } from "@chakra-ui/react";
import AddTokenModal from "./addTokenModal";
import DeleteTokenAlert from "./deleteTokenAlert";
import TokenToast from "../tokenToast";
import DonutChartWallet from "../charts/donutChartWallet";
import { useGlobalState, useStore } from "../../state-management/stores/store";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

const Tokens = () => {
  const currentWallet = localStorage.getItem("address");
  const [tokens, setState] = useState({});
  const [currentSymbolsState, setCurrentSymbols] = useState(
    Object.keys(tokens)
  );

  const [showDeleteModal, setShowDeleteModal] = useState({symbol: ''});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showDeleteToast, setShowDeleteToast] = useState(false);


  const web3 = new Web3(Web3.givenProvider); 
  const walletState = useGlobalState().walletState
  const [store, dispatch] = useStore();
  const sort = store.tokenState.sort

  const getNetwork = () => {
    if(walletState.networkId !== null) {
      return walletState.networkId
    } else {
      const target_chain = Object.assign({}, web3.eth.Contract.currentProvider);
      return parseInt(target_chain.networkVersion)
    }
  }

  const networkId = getNetwork()
  let nIntervId;

  useEffect(() => {
    if(networkId) {
    getTokensByWallet({currentWallet, networkId}).then((tokensSnapshot) => {
      if (tokensSnapshot.empty) {
        console.log("No matching documents.");
        setState({})
        // return;
      } else {
        const tokensSymbol = [];
        tokensSnapshot.forEach((token) => {
          tokensSymbol.push(token.data().tokenSymbol);
        });
        console.log("IN PRIMUL USE EFFECT", tokensSymbol);

        saveTokens(tokensSymbol, "INDEX");
        setCurrentSymbols(tokensSymbol);
        //refreshPrices()
      }
    });
  }
  }, [walletState.address, networkId]);

  useEffect(() => {
    if (currentSymbolsState.length > 0) {
      let symbols = [...currentSymbolsState];
      refreshPrices();
    }
    return () => {
      clearInterval(nIntervId);
    };
  }, [currentSymbolsState]);

  useEffect(() => {
    sortTokens(tokens)
  }, [sort])

  const getBalance = async (tokenSymbol) => {
    console.log('caut monede noi?', networkId)
    if(networkId) {
      let MyContract
      switch (networkId) {
        case 1: //eth chain
          MyContract = new web3.eth.Contract(
            ethConstants[tokenSymbol].tokenABI,
            ethConstants[tokenSymbol].tokenAddress,
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
            console.log(ex) //he doesn't have this token
          }
          
          break;
        case 56: //binance chain
        MyContract = new web3.eth.Contract(
          bnbConstants[tokenSymbol].tokenABI,
          bnbConstants[tokenSymbol].tokenAddress,
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
          console.log(ex)
        }
        
          break;
        case 137: //polygon chain
        
          break;
      
        default:
          break;
      }
    }
 
    // var MyContract = new web3.eth.Contract(
    //   constants[tokenSymbol].tokenABI,
    //   constants[tokenSymbol].tokenAddress,
    //   {
    //     from: currentWallet,
    //   }
    // );

  };

  const getPrices = async (tokens) => {
    console.log("IN GET PRICES", tokens);
    if(networkId)
      return await getPricesRequest({tokens, networkId})
    
  };

  const deleteToken = () => {
    deleteTokenRequest({
      currentWallet,
      symbol: showDeleteModal.symbol,
      networkId,
    }).then((result) => {
      if (result === false) {
        console.log("No such document!");
      } else {
        delete tokens[showDeleteModal.symbol];
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
        sortTokens({...newValues})
      // setState({ ...newValues });
        setCurrentSymbols(Object.keys(newValues));

        break;
      case "ADD":
        sortTokens({...tokens, ...newValues})
        // setState({ ...tokens, ...newValues });
        setCurrentSymbols([...Object.keys(tokens), ...Object.keys(newValues)]);

        break;
      default:
        //sortTokens(sort.isAsc, sort.filter, { ...tokens })
        setState({ ...tokens });
        setCurrentSymbols(Object.keys(newValues));

        break;
    }
  };

const sortTokens = (tokensList) => {
  const {
    isAsc,
    filter
  } = sort

  console.log('aoco', isAsc, filter, tokensList)
  if(filter !== undefined && isAsc !== undefined) {
    switch (filter) {
      case 'symbol':
        if(isAsc === true) {
          const ordered = Object.keys(tokensList).sort().reduce(
            (obj, key) => { 
              obj[key] = tokensList[key]; 
              return obj;
            },
            {}
          );
          setState({...ordered})
        } else if(isAsc === false) {
          const orderedDesc = Object.keys(tokensList).sort().reverse().reduce(
            (obj, key) => { 
              obj[key] = tokensList[key]; 
              return obj;
            },
            {}
          );
          setState({...orderedDesc})
        }
        break;
    
      default:
        setState({...tokensList})
    }
  } else {
    setState({...tokensList})
  }
}

 
  return (
    <React.Fragment>
      <DonutChartWallet tokens={tokens}></DonutChartWallet>
      {/* {tokens !== undefined && Object.keys(tokens).length > 0 && */}
        <AddTokenModal tokens={tokens} addToken={addToken}></AddTokenModal>
      {/* } */}

      <Table variant="simple" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Index</Th>
            <Th>
              <Flex alignItems='center'>
                <div>Symbol</div> 
                <IconButton
                  aria-label="sort"
                  onClick={() => {
                    dispatch({
                      type: '[TOKEN] SET_SORT',
                      sort: {
                        isAsc: !sort.isAsc,
                        filter: 'symbol'
                      }
                    })
                    return sortTokens(tokens) 
                  }} 
                  variant="none"
                  _focus={false}
                  icon={sort.isAsc ? <ChevronUpIcon /> : <ChevronDownIcon />}
              />
              </Flex>
            </Th>
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
