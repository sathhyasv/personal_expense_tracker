// src/firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Your Firebase configuration object from the Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyDuQMW1aGZMDQ5R8vL1H7Z5awY8y6c5Gsk",
  authDomain: "expense-tracker-fab27.firebaseapp.com",
  projectId: "expense-tracker-fab27",
  storageBucket: "expense-tracker-fab27.appspot.com",
  messagingSenderId: "460037470489",
  appId: "1:460037470489:web:deca2fac669c278e5c2d88",
  measurementId: "G-5R0D02R6LY"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
