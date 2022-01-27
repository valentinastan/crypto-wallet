import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { dbStore } from "../config/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { get, getExternalAPI } from "./request";
import { apiKeyHeader, requestOptions } from "./coinMarketCap";

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

  const existingTokenForThisWallet = query(walletsRef, where("walletAddress", "==" , params.currentWallet), where("tokenSymbol", "==", params.tokenSymbol));
  const querySnapshot = await getDocs(existingTokenForThisWallet);

  let deletedId = '';
  querySnapshot.forEach((doc) => deletedId = doc.id);

  const result = await deleteDoc(doc(dbStore, "wallets",deletedId));
  if(result == undefined) 
   return true 
   else return false
}

export async function getPricesRequest(params) {
  console.log('my tokens:', params)
  let symbols = params.reduce((symbolsList, symbol) => symbolsList + symbol + ',')
  let response = await getExternalAPI(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?symbol=${symbols}`, {'X-CMC_PRO_API_KEY': 'ab728d41-328b-41c7-a25c-d3e814aef330'})
  console.log('response', response)
}

//Why did I receive a Access-Control-Allow-Origin error while trying to use the API?
//A:This CORS error means you are trying to make HTTP requests directly to the API from 
//JavaScript in the client-side of your application which is not supported. This restriction 
//is to protect your API Key as anyone viewing your application could open their browser's Developer 
//Tools to view your HTTP requests and steal your API Key. You should prevent your API Key from being 
//visible on your client-side by proxying your requests through your own backend script.
