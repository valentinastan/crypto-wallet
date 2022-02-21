import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { dbStore } from "../config/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { getExternal } from "./request";

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

export async function getPricesRequest(params) {
  //get all coins
  let allCoins = await getExternal('https://api.coingecko.com/api/v3/coins/list')
  allCoins = createCache(allCoins.data)

  let myTokensIds = [];
  params.forEach(myToken => {
    if(allCoins.hasOwnProperty(myToken.toLowerCase())) {
      return myTokensIds.push(allCoins[myToken.toLowerCase()])
    }})
  
  myTokensIds = myTokensIds.filter((value, index, self) =>
      index === self.findIndex((token) => (
        token.toLowerCase() === value.toLowerCase()
    ))
  )
  if(myTokensIds.length > 0) {
    let mySymbolsList = myTokensIds.reduce((symbolsList, id) => symbolsList + id + ',', '')
    console.log('my tokens', mySymbolsList)
      //get my coins for their prices
      let response = await getExternal(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${mySymbolsList}`)
      let prices = []
      response.data.map(token => prices.push({
        price: token.current_price, 
        symbol: token.symbol, 
        name: token.name
      }))
      console.log('response final', prices)
      return prices
  } else {
    return false
  }
}

const createCache = (data) => {
  let tokens = {}
  data.forEach(token => {
    tokens[token.symbol] = token.id
  })

 return tokens
}
