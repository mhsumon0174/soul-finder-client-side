import { useEffect, useState } from "react";
import { Auth } from "../Firebase/firebase.config";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut  } from "firebase/auth";
const AuthProvider = ({ children }) => {
  const [user,setUser]=useState(null)
  console.log(user);
  
const provider=new GoogleAuthProvider
  const createUser=(email,password)=>{
    return createUserWithEmailAndPassword(Auth,email,password)
  }
  const googleSign=()=>{
    return signInWithPopup(Auth,provider)
  }
  const signIn=(email,password)=>{
    return signInWithEmailAndPassword(Auth,email,password)
  }
  const logOut=()=>{
    return signOut(Auth)
  }
useEffect(()=>{
  const unSubscribe=onAuthStateChanged(Auth,(currentUser)=>{
    setUser(currentUser)
  })
  return ()=>{
unSubscribe()
  }
},[])

  const userinfo = {
createUser,googleSign,signIn,user,setUser,logOut
  };
  return (
  <AuthContext value={userinfo}>
    {children}
    </AuthContext>
  )
};

export default AuthProvider;
