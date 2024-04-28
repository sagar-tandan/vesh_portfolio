// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import dotenv from 'dotenv';




const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "blog-d0133.firebaseapp.com",
  projectId: "blog-d0133",
  storageBucket: "blog-d0133.appspot.com",
  messagingSenderId: process.env.MESSESING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);



