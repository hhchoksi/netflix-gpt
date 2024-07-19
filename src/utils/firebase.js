// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9hPzE8Nwip3tMaaYQoMNh-MRpbLh8MqE",
  authDomain: "netflixgpt-c2ccf.firebaseapp.com",
  projectId: "netflixgpt-c2ccf",
  storageBucket: "netflixgpt-c2ccf.appspot.com",
  messagingSenderId: "262615527182",
  appId: "1:262615527182:web:3337e61caca7414174b15f",
  measurementId: "G-NW6WNBZQPK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();