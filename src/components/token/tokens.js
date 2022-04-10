import React, { useEffect, useState } from "react";
import {
  deleteTokenRequest,
  getPricesRequest,
  getTokensByWallet,
} from "../../requests/token";
import Token from "./token";

import ethConstants from "../../constants/ethChain/const";
import bnbConstants from "../../constants/bnbChain/const";
import { ethers } from "ethers";
import Web3 from "web3";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  useDisclosure,
  IconButton,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import AddTokenModal from "./addTokenModal";
import DeleteTokenAlert from "./deleteTokenAlert";
import TokenToast from "../tokenToast";
import DonutChartWallet from "../charts/donutChartWallet";
import { useGlobalState, useStore } from "../../state-management/stores/store";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { calculateTokenAmount, sortTokens } from "./token-helpers";
import Loader from "../loader";

const Tokens = () => {
  const currentWallet = localStorage.getItem("address");
  const [tokens, setState] = useState({});
  const [orderedTokens, setOrderedTokens] = useState([]);
  const [currentSymbolsState, setCurrentSymbols] = useState(
    Object.keys(tokens)
  );

  const selectedSortColor = useColorModeValue('black', 'white')

  const [showDeleteModal, setShowDeleteModal] = useState({ symbol: "" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showDeleteToast, setShowDeleteToast] = useState(false);

  const web3 = new Web3(Web3.givenProvider);
  const walletState = useGlobalState().walletState;
  const [store, dispatch] = useStore();
  const sort = store.tokenState?.sort;

  const getNetwork = () => {
    if (walletState.networkId !== null) {
      return walletState.networkId;
    } else {
      const target_chain = Object.assign({}, web3.eth.Contract.currentProvider);
      return parseInt(target_chain.networkVersion);
    }
  };

  const networkId = getNetwork();
  let nIntervId;

  useEffect(() => {
    setShowDeleteToast(false);
    if (networkId) {
      getTokensByWallet({ currentWallet, networkId }).then((tokensSnapshot) => {
        if (tokensSnapshot.empty) {
          console.log("No matching documents.");
          setState({});
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletState.address, networkId]);

  useEffect(() => {
    if (currentSymbolsState.length > 0) {
      // let symbols = [...currentSymbolsState];
      refreshPrices();
    }
    return () => {
      clearInterval(nIntervId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSymbolsState]);

  useEffect(() => {
    setShowDeleteToast(false);
    sortTokens(sort, tokens, setOrderedTokens);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, currentSymbolsState]);

  const getBalance = async (tokenSymbol) => {
    if (networkId) {
      let MyContract;
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
          } catch (ex) {
            console.log(ex); //he doesn't have this token
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
          } catch (ex) {
            console.log(ex);
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
    if (networkId) return await getPricesRequest({ tokens, networkId });
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

        setShowDeleteModal({ symbol: "" });
        setShowDeleteToast(true);
      }
    });
  };

  const deletePressed = (symbol) => {
    setShowDeleteToast(false);
    setShowDeleteModal({ symbol });
    onOpen();
  };

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
        setShowDeleteToast(false);
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
    setShowDeleteToast(false);
    let prices = await getPrices(tokensSymbol);
    const newValues = {};

    for (const symbol of tokensSymbol) {
      let priceInfo = (prices || []).filter(
        (token) => token.symbol.toUpperCase() === symbol.toUpperCase()
      );
      let balance = await getBalance(symbol);

      if (priceInfo !== undefined && priceInfo.length > 0) {
        newValues[symbol] = {
          balance: balance || 0,
          name: priceInfo[0].name,
          price: priceInfo[0].price,
          image: priceInfo[0].image,
          price_change_percentage_24h: priceInfo[0].price_change_percentage_24h,
          amount: calculateTokenAmount(balance, priceInfo[0].price),
        };
      } else {
        if (tokens?.hasOwnProperty(symbol) && tokens[symbol].price !== null) {
          newValues[symbol] = {
            balance: balance || 0,
            name: tokens[symbol].name,
            price: tokens[symbol].price,
            image: tokens[symbol].image,
            price_change_percentage_24h:
              tokens[symbol].price_change_percentage_24h,
            amount: calculateTokenAmount(balance, tokens[symbol].price),
          };
        } else {
          newValues[symbol] = {
            balance: balance || 0,
            name: null,
            price: null,
            image: null,
            price_change_percentage_24h: null,
            amount: null,
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

  const handleSort = (action) => {
    const {
      type,
      isAsc,
      filter
    } = action
    
    setShowDeleteToast(false)
    dispatch({
      type,
      sort: {
        isAsc,
        filter,
      },
    })
  } 

  return (
    <React.Fragment>
      {Object.keys(tokens).length > 0 ? (
        <>
          <DonutChartWallet tokens={tokens}></DonutChartWallet>
          <AddTokenModal tokens={tokens} addToken={addToken}></AddTokenModal>
          <Table variant="simple" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Index</Th>
                <Th>
                  <Flex alignItems="center" style={sort.filter === 'name' ? {color: selectedSortColor} : {}}>
                    <div>Symbol</div>
                    <IconButton
                      aria-label="sort"
                      onClick={() =>
                        handleSort({
                          type: "[TOKEN] SET_SORT",
                          isAsc: (sort.filter === undefined || sort.filter !== 'name') ? true : !sort?.isAsc,
                          filter: "name",
                        })
                        // dispatch({
                        //   type: "[TOKEN] SET_SORT",
                        //   sort: {
                        //     isAsc: !sort?.isAsc,
                        //     filter: "name",
                        //   },
                        // })
                      }
                      variant="none"
                      _focus={false}
                      icon={
                        (sort?.isAsc && sort?.filter === "name") ? <ChevronUpIcon /> : <ChevronDownIcon />
                      }
                    />
                  </Flex>
                </Th>
                <Th isNumeric>
                  <Flex alignItems="center" style={sort.filter === '24h_percentage' ? {color: selectedSortColor, justifyContent: 'flex-end'} : {justifyContent: 'flex-end'}}>
                    <div>% 24h</div>
                    <IconButton
                      aria-label="sort"
                      onClick={() => 
                        handleSort({
                          type: "[TOKEN] SET_SORT",
                          isAsc: (sort.filter === undefined || sort.filter !== '24h_percentage') ? true : !sort?.isAsc,
                          filter: "24h_percentage",
                        })
                        // return dispatch({
                        //   type: "[TOKEN] SET_SORT",
                        //   sort: {
                        //     isAsc: !sort?.isAsc,
                        //     filter: "24h_percentage",
                        //   },
                        // })
                      
                      }
                      variant="none"
                      _focus={false}
                      icon={
                        (sort?.isAsc && sort?.filter === "24h_percentage") ? <ChevronUpIcon /> : <ChevronDownIcon />
                      }
                    />
                  </Flex>
                </Th>
                <Th isNumeric>
                  <Flex alignItems="center" style={sort.filter === 'price' ? {color: selectedSortColor, justifyContent: 'flex-end'} : {justifyContent: 'flex-end'}}>
                    <div>Price</div>
                    <IconButton
                      aria-label="sort"
                      onClick={() =>
                        handleSort({
                          type: "[TOKEN] SET_SORT",
                          isAsc: (sort.filter === undefined || sort.filter !== 'price') ? true : !sort?.isAsc,
                          filter: "price",
                        })
                        // dispatch({
                        //   type: "[TOKEN] SET_SORT",
                        //   sort: {
                        //     isAsc: !sort?.isAsc,
                        //     filter: "price",
                        //   },
                      }
                      variant="none"
                      _focus={false}
                      icon={
                        (sort?.isAsc && sort?.filter === "price") ? <ChevronUpIcon /> : <ChevronDownIcon />
                      }
                    />
                  </Flex>
                </Th>
                <Th isNumeric>
                  <Flex alignItems="center" style={sort.filter === 'balance' ? {color: selectedSortColor, justifyContent: 'flex-end'} : {justifyContent: 'flex-end'}}>
                    <div>Balance</div>
                    <IconButton
                      aria-label="sort"
                      onClick={() =>
                        handleSort({
                          type: "[TOKEN] SET_SORT",
                          isAsc: (sort.filter === undefined || sort.filter !== 'balance') ? true : !sort?.isAsc,
                          filter: "balance",
                        })
                        // dispatch({
                        //   type: "[TOKEN] SET_SORT",
                        //   sort: {
                        //     isAsc: !sort?.isAsc,
                        //     filter: "balance",
                        //   },
                        // })
                      }
                      variant="none"
                      _focus={false}
                      icon={
                        (sort?.isAsc && sort?.filter === "balance")? <ChevronUpIcon /> : <ChevronDownIcon />
                      }
                    />
                  </Flex>
                </Th>
                <Th isNumeric>
                  <Flex alignItems="center" style={sort.filter === 'amount' ? {color: selectedSortColor, justifyContent: 'flex-end'} : {justifyContent: 'flex-end'}}>
                    <div>Amount</div>
                    <IconButton
                      aria-label="sort"
                      onClick={() =>
                        handleSort({
                          type: "[TOKEN] SET_SORT",
                          isAsc: (sort.filter === undefined || sort.filter !== 'amount') ? true : !sort?.isAsc,
                          filter: "amount",
                        })
                        // dispatch({
                        //   type: "[TOKEN] SET_SORT",
                        //   sort: {
                        //     isAsc: !sort?.isAsc,
                        //     filter: "amount",
                        //   },
                        // })
                      }
                      variant="none"
                      _focus={false}
                      icon={
                        (sort?.isAsc && sort?.filter === "amount") ? <ChevronUpIcon /> : <ChevronDownIcon />
                      }
                    />
                  </Flex>
                </Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {(orderedTokens.length > 0
                ? orderedTokens
                : Object.keys(tokens).length > 0
                ? Object.keys(tokens)
                : []
              ).map((key, i) => (
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
        </>
      ) : (
        <Loader show={true}></Loader>
      )}
      <DeleteTokenAlert
        deleteToken={deleteToken}
        symbol={showDeleteModal.symbol}
        onClose={onClose}
        isOpen={isOpen}
      ></DeleteTokenAlert>
      {showDeleteToast && (
        <TokenToast
          actionStatus="error"
          title="Token deleted."
          description="We've deleted your token."
        ></TokenToast>
      )}
    </React.Fragment>
  );
};
export default Tokens;
