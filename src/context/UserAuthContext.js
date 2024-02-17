//here in this file I am writing contextAPI:-
import { createContext, useContext, useEffect, useState } from "react";
//Below I have imported some methods from firebase/auth:-
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
//imported auth instance:-
import { auth } from "../firebase";


const userAuthContext = createContext();


//Below I am created a Provider Function in which we can pass our Components as children and this Provider function return us ContextProvider which is name of our createdContext that is userAuthContext.Provider and inside the provider I pass the children and it would takes props as a value:-
export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  function setUpRecaptha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {},
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }


    //OnAuthStateChange function is used to check whether any user logged in and this function is runs only once when component is mounted and so we using useEffect Hook which runs only once when component is mounted so we use []:-
    //so components gets mounted means auth's status or current user state changes:-
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
        console.log("Auth", currentuser);
        setUser(currentuser);
      });
  
      return () => {
        unsubscribe();
      };
    }, []);
  
    return (
      <userAuthContext.Provider
        value={{
          user,
          logIn,
          signUp,
          logOut,
          googleSignIn,
          setUpRecaptha,
        }}
      >
        {children}
      </userAuthContext.Provider>
    );
  }
  
  


//In order to make use the above context we have to create custom hook that is used to wrap the useContext Hook in which a function is created in which it would return us useContext Hook in which we have to pass our createdContext:--
export function useUserAuth() {
  return useContext(userAuthContext);
}


