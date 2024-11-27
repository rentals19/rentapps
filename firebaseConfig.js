// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "xxx",
  authDomain: "rental-4cbc1.firebaseapp.com",
  projectId: "rental-4cbc1",
  storageBucket: "rental-4cbc1.firebasestorage.app",
  messagingSenderId: "525027031885",
  appId: "1:525027031885:web:d10ae72321c9b81bd65504",
  measurementId: "G-GQM2KQK7W5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
