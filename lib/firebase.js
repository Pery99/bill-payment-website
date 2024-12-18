// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkjgjxDzCNkYhsiezoYjHKt3ZxC_q3TfU",
  authDomain: "bill-app-504c4.firebaseapp.com",
  projectId: "bill-app-504c4",
  storageBucket: "bill-app-504c4.firebasestorage.app",
  messagingSenderId: "550304077487",
  appId: "1:550304077487:web:4f1fa3bd160f3d1c69265a",
  measurementId: "G-W8TZVQCSPX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
