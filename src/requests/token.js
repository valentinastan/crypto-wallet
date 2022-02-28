import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { dbStore } from "../config/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { getExternal } from "./request";
import constants from '../const'


export async function addTokenRequest(params) {
  const walletsRef = collection(dbStore, "wallets");
  
  //Check if this token already exists
  const existingTokenForThisWallet = query(walletsRef, where("walletAddress", "==" , params.walletAddress), where("tokenSymbol", "==", params.tokenSymbol));
  const querySnapshot = await getDocs(existingTokenForThisWallet);
  
  if(querySnapshot.empty) {
    const docRef = await addDoc(walletsRef, {
      walletAddress: params.walletAddress,
      tokenSymbol: params.tokenSymbol,
    });
    console.log("Document written with ID: ", docRef.id);
  
    const docRefCreated = doc(dbStore, "wallets", docRef.id);
    const docSnap = await getDoc(docRefCreated);
    return docSnap;
  } else {
    return false;
  }
}

export async function getTokensByWallet(params) {
  const walletsRef = collection(dbStore, "wallets");

  const currentWalletTokens = query(walletsRef, where("walletAddress", "==" , params));
  const querySnapshot = await getDocs(currentWalletTokens);
  
  return querySnapshot
}

export async function deleteTokenRequest(params) {
  const walletsRef = collection(dbStore, "wallets");
  console.log('params ', params)

  const existingTokenForThisWallet = query(walletsRef, where("walletAddress", "==" , params.currentWallet), where("tokenSymbol", "==", params.symbol));
  const querySnapshot = await getDocs(existingTokenForThisWallet);

  let deletedId = '';
  querySnapshot.forEach((doc) => deletedId = doc.id);

  const result = await deleteDoc(doc(dbStore, "wallets",deletedId));
  if(result === undefined) 
   return true 
   else return false
}

async function getAllTokensRequest() {
  console.log('****FAC AICI REQUEST')
  const allCoins = await getExternal('https://api.coingecko.com/api/v3/coins/list')
  //return createCache(allCoins.data)
  return allCoins
}

function filterDuplicatedSymbolTokens(myTokens) {
  let results = {}
  let duplicatedTokens = []
  let tokensToBeFiltered = [...myTokens]
  //let regex = new RegExp('(-token)|(-lala)$')

  for (let i = 0; i < tokensToBeFiltered.length - 1; i++) {
    if (tokensToBeFiltered[i + 1].symbol === tokensToBeFiltered[i].symbol) {
      duplicatedTokens.push(tokensToBeFiltered[i].symbol)

      if(tokensToBeFiltered[i].id.endsWith('-token')) {
     
        results[tokensToBeFiltered[i].symbol] = tokensToBeFiltered[i].id
      } else {
  
        if(tokensToBeFiltered[i+1].id.endsWith('-token')) {
          results[tokensToBeFiltered[i+1].symbol] = tokensToBeFiltered[i+1].id
        } else {
         
          if(tokensToBeFiltered[i].id.toUpperCase() === tokensToBeFiltered[i].symbol.toUpperCase()) {
            if(!results.hasOwnProperty(tokensToBeFiltered[i].symbol))
              results[tokensToBeFiltered[i].symbol] = tokensToBeFiltered[i].id
          } else {
           
            if(tokensToBeFiltered[i+1].id.toUpperCase() === tokensToBeFiltered[i+1].symbol.toUpperCase()) {
              if(!results.hasOwnProperty(tokensToBeFiltered[i+1].symbol))
                results[tokensToBeFiltered[i+1].symbol] = tokensToBeFiltered[i+1].id
            } else {
            
              if(!results.hasOwnProperty(tokensToBeFiltered[i].symbol) && !tokensToBeFiltered[i].id.endsWith('-wormhole')) {
                results[tokensToBeFiltered[i].symbol] = tokensToBeFiltered[i].id
              } else {

                if(!results.hasOwnProperty(tokensToBeFiltered[i+1].symbol) && !tokensToBeFiltered[i+1].id.endsWith('-wormhole')) {
                  results[tokensToBeFiltered[i+1].symbol] = tokensToBeFiltered[i+1].id
                }
              }
            }  
          }  
        }
      } 
    } 
  }

  myTokens = myTokens.filter(token => !duplicatedTokens.includes(token.symbol))
  console.log('token fara duplicate', myTokens)
  console.log('token cu duplicate, filtrat', results)

  let resultsWithoutDup = {}

  myTokens.map(tokenObj => {
    resultsWithoutDup[tokenObj.symbol] = tokenObj.id
  })

  return {...resultsWithoutDup, ...results}
}


export async function getPricesRequest(params) {
  // const allCoins = await getAllTokensRequest()

  // let myTokens = [];

  // //get only my tokens
  // myTokens = allCoins.data.filter(externalToken => {
  //   return params.includes(externalToken.symbol.toUpperCase())
  // })
  // console.log('mytokens ids', myTokens)

  // //get filtered tokens
  // let filteredTokens = filterDuplicatedSymbolTokens(myTokens)
  // console.log('filtered all', filteredTokens)
 
  console.log('constants',Object.keys(constants))

  //get token's details
  if(Object.keys(constants).length > 0) {
    let mySymbolsList = Object.keys(constants).reduce((symbolsList, key) => symbolsList + constants[key].coingeckoId + ',', '') //filteredTokens.ley = id
    console.log('my tokens list', mySymbolsList)
      //get my coins for their prices
      let response = await getExternal(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${mySymbolsList}`)
      let prices = []
      console.log('data!!!: ', response.data)
      response.data.map(token => prices.push({
        price: token.current_price, 
        symbol: token.symbol, 
        name: token.name,
        image: token.image,
        price_change_percentage_24h: token.price_change_percentage_24h
      }))
      console.log('response final', prices)
      return prices
  } else {
    return false
  }
}

// const createCache = (data) => {
//   let tokens = {}
//   data.forEach(token => {
//     if(Object.hasOwnProperty(token.symbol))
//     tokens[token.symbol] = token.id.toLowerCase()
//   })

export async function getHistoricalMarketData(params) {
//token-id, data up to number of days ago, Data interval:daily
//https://api.coingecko.com/api/v3/coins/gnosis/market_chart?vs_currency=usd&days=1&interval=daily

}