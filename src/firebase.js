// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//we are importing getAuth method from firebase/auth...//
import {getAuth} from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOMtW4qSdXOaIiwH_XWl3wSoEnCjlV35Y",
  authDomain: "auth-phone-9af78.firebaseapp.com",
  projectId: "auth-phone-9af78",
  storageBucket: "auth-phone-9af78.appspot.com",
  messagingSenderId: "877513386473",
  appId: "1:877513386473:web:9ce5b1cedba2fbfe4d4378"
};

// Initialize Firebaseconfig 
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export default app;