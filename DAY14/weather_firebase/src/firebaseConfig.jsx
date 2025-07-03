// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4TMPpWEYzIJqe7WIunhVLHSR-KGTf3Uk",
  authDomain: "ecommerce-auth-a5402.firebaseapp.com",
  projectId: "ecommerce-auth-a5402",
  storageBucket: "ecommerce-auth-a5402.firebasestorage.app",
  messagingSenderId: "497384046051",
  appId: "1:497384046051:web:6e54bb84eac954965ef4d6",
  measurementId: "G-XR0L94FV80",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth service
const auth = getAuth(app);

// Create Google provider instance
const provider = new GoogleAuthProvider();

// Function to trigger Google Sign-In popup
export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

export { auth };
