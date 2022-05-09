import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyC5SmvLWKrelgSGeoAguA_Og5-7sGRwpPE",
  authDomain: "sport-shop-60073.firebaseapp.com",
  databaseURL:
    "https://sport-shop-60073-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sport-shop-60073",
  storageBucket: "sport-shop-60073.appspot.com",
  messagingSenderId: "735342748568",
  appId: "1:735342748568:web:8191d2ffd01217650081ed",
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
