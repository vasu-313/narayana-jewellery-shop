// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxmabAhXEpqIhEQw41RZdk75sYJWMyZ4g",
  authDomain: "jewellery-shop-1ecea.firebaseapp.com",
  projectId: "jewellery-shop-1ecea",
  storageBucket: "jewellery-shop-1ecea.firebasestorage.app",
  messagingSenderId: "607194996423",
  appId: "1:607194996423:web:5ddc8dbe2f5e66f4d128e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export default app;