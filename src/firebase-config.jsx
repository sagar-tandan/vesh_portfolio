// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

//if anyone is looking through this and thinking that such 
//sensitive info. are not hidden ..I tried using .env but firebase didnt allowed that
//if you know any methods you can mail me at sagarchhetry333@gmail.com
// but i had set write permission to specifit admid only so even if the api keys are known
//stealer won't be able to use it...
const firebaseConfig = {
  apiKey: "AIzaSyD7KDAJ8EPpc3AF2t7uCiWav1-wLUNXvuc",
  authDomain: "blog-d0133.firebaseapp.com",
  projectId: "blog-d0133",
  storageBucket: "blog-d0133.appspot.com",
  messagingSenderId: " 106819996990",
  appId: "1:106819996990:web:b8edc4a84dffef5971706f",
  measurementId: " G-QEPNC211TN",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);



