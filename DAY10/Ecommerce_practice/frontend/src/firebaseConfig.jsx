// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4TMPpWEYzIJqe7WIunhVLHSR-KGTf3Uk",
  authDomain: "ecommerce-auth-a5402.firebaseapp.com",
  projectId: "ecommerce-auth-a5402",
  storageBucket: "ecommerce-auth-a5402.appspot.com", // corrected
  messagingSenderId: "497384046051",
  appId: "1:497384046051:web:6e54bb84eac954965ef4d6",
  measurementId: "G-XR0L94FV80",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut, onAuthStateChanged };
