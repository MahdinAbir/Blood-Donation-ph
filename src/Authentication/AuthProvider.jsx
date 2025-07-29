import React, { useEffect, useState } from 'react';
import {
  
    createUserWithEmailAndPassword,
  getIdToken,
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
import axios from 'axios';


const AuthProvider = ({ children }) => {
  const [user, Setuser] = useState(null);
  const [loading, setloading] = useState(true);



  const [mainProfileData, setMainProfileData] = useState(null);

 


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



useEffect(() => {
  if (!user?.email) return;

  const fetchProfile = async () => {
    try {
      setloading(true);  

      const token = await getIdToken(user); 

      const res = await axios.get(`http://localhost:3000/Allusers/${user.email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data[0];
      setMainProfileData(data);  

    } catch (error) {
      console.error('Failed to fetch profile data', error);
      setMainProfileData(null);
    } finally {
      setloading(false);  
    }
  };

  fetchProfile();
}, [user]);




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
    mainProfileData,
    setMainProfileData
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
