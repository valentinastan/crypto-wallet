import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { dbStore } from "../config/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

export async function addTokenRequest(params) {
  const walletsRef = collection(dbStore, "wallets");
  
  //Check if this token already exists
  const existingTokenForThisWallet = query(walletsRef, where("walletAddress", "==" , params.walletAddress), where("contract", "==", params.contract));
  const querySnapshot = await getDocs(existingTokenForThisWallet);
  
  if(querySnapshot.empty) {
    const docRef = await addDoc(walletsRef, {
      walletAddress: params.walletAddress,
      contract: params.contract,
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

  const existingTokenForThisWallet = query(walletsRef, where("walletAddress", "==" , params.currentWallet), where("contract", "==", params.contract));
  const querySnapshot = await getDocs(existingTokenForThisWallet);

  let deletedId = '';
  querySnapshot.forEach((doc) => deletedId = doc.id);

  const result = await deleteDoc(doc(dbStore, "wallets",deletedId));
  if(result == undefined) 
   return true 
   else return false
}
