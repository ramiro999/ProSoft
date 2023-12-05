// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBD3-WCa1xPXxdGlPJtiLWDVnST5qOI_C4",
    authDomain: "react-login-register-auth.firebaseapp.com",
    projectId: "react-login-register-auth",
    storageBucket: "react-login-register-auth.appspot.com",
    messagingSenderId: "41331438673",
    appId: "1:41331438673:web:4c17359632ce687d9c3470",
    measurementId: "G-TVJR9TKPDV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getDatabase(app)