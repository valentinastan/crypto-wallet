
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

var config = {
  apiKey: "AIzaSyDEf5km2uim7ftQa6svkac6N2zcX9hUJQc",
  authDomain: "crypto-wallet-a30a2.firebaseapp.com",
  projectId: "crypto-wallet-a30a2",
  storageBucket: "crypto-wallet-a30a2.appspot.com",
  messagingSenderId: "561927296684",
  appId: "1:561927296684:web:a532baba4ac7198a1df109",
  measurementId: "G-TCQ677RNSF"
};

// export const dbStore = initializeApp(config);
export const dbCon = initializeApp(config)
export const dbStore = getFirestore()