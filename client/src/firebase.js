
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-16a80.firebaseapp.com",
  projectId: "mern-auth-16a80",
  storageBucket: "mern-auth-16a80.appspot.com",
  messagingSenderId: "617307961321",
  appId: "1:617307961321:web:6b79e3805d41d4c27b7d78"
};


export const app = initializeApp(firebaseConfig);