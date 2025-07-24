import React, { useEffect, useState } from 'react';
import {
  
    createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';


import { auth } from '../Firebase/Firebase.init';
import { AuthContext } from './AuthContext';


const AuthProvider = ({ children }) => {
  const [user, Setuser] = useState(null);
  const [loading, setloading] = useState(true);

  const registerWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const provider = new GoogleAuthProvider(); 

  const LoginGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (newData) => {
    return updateProfile(auth.currentUser, newData);
  };

  const passwordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const observer = onAuthStateChanged(auth, (currentUser) => {
      Setuser(currentUser);
      setloading(false);
    });
    return () => observer();
  }, []);

  const authData = {
    user,
    Setuser,
    registerWithEmail,
    logOut,
    logIn,
    loading,
    setloading,
    updateUser,
    passwordReset,
    LoginGoogle,
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
