// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDaYazn5RIXa4zGJ2Muz_G2QCCEQRPkohQ",
    authDomain: "mern-ecommerce-26633.firebaseapp.com",
    projectId: "mern-ecommerce-26633",
    storageBucket: "mern-ecommerce-26633.appspot.com",
    messagingSenderId: "960342263603",
    appId: "1:960342263603:web:067698661c316db05e6046"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const fireDB = getFirestore(app)

