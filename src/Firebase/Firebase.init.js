// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyLl2JNk6sGXGq3_S8w2RW9NrkO6ZGn4Y",
  authDomain: "donate-blood-d33a2.firebaseapp.com",
  projectId: "donate-blood-d33a2",
  storageBucket: "donate-blood-d33a2.firebasestorage.app",
  messagingSenderId: "497588478087",
  appId: "1:497588478087:web:3fc22727f77fe623275822"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);