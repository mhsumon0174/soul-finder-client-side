import { useEffect, useState } from "react";
import { Auth } from "../Firebase/firebase.config";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile  } from "firebase/auth";
const AuthProvider = ({ children }) => {
  const [user,setUser]=useState(null)
 const [loading,setLoading]=useState(true)
  
const provider=new GoogleAuthProvider
  const createUser=(email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(Auth,email,password)
  }
  const googleSign=()=>{
     setLoading(true)
    return signInWithPopup(Auth,provider)
  }
  const signIn=(email,password)=>{
     setLoading(true)
    return signInWithEmailAndPassword(Auth,email,password)
  }
  const logOut=()=>{
    return signOut(Auth)
  }
  const updateUser=(updatedData)=>{
    return updateProfile(Auth.currentUser,updatedData)
  }
useEffect(()=>{
  const unSubscribe=onAuthStateChanged(Auth,(currentUser)=>{
    setUser(currentUser)
     setLoading(false)
  })
  return ()=>{
unSubscribe()
  }
},[])

  const userinfo = {
createUser,googleSign,signIn,user,setUser,logOut,updateUser,loading
  };
  return (
  <AuthContext value={userinfo}>
    {children}
    </AuthContext>
  )
};

export default AuthProvider;
