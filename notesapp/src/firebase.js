// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALgHkZ5cX3lY3N8phnpbw1rkO4rLLkqac",
  authDomain: "react-notes-9cc07.firebaseapp.com",
  projectId: "react-notes-9cc07",
  storageBucket: "react-notes-9cc07.appspot.com",
  messagingSenderId: "903051612545",
  appId: "1:903051612545:web:04192e4b2fe9aae0525880"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const notesCollection = collection(db, "notes");