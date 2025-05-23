// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYDy2_Hxh-hxyF5E5S8ZeGuLMTwxf2ErY",
  authDomain: "riverapp-2227b.firebaseapp.com",
  projectId: "riverapp-2227b",
  storageBucket: "riverapp-2227b.firebasestorage.app",
  messagingSenderId: "1009960499680",
  appId: "1:1009960499680:web:3c32f921c9e5e83cfc9385"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
