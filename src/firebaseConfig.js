// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ7Z3T7nXtq4gFE--9q4-ZOxUrpWuNT9I",
  authDomain: "ecommerce-2025-e38b2.firebaseapp.com",
  projectId: "ecommerce-2025-e38b2",
  storageBucket: "ecommerce-2025-e38b2.firebasestorage.app",
  messagingSenderId: "172976482890",
  appId: "1:172976482890:web:ef47c6b78cfa8c1bc494b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleAuthProvider = new GoogleAuthProvider(app);

export { 
    auth,
    db,
    googleAuthProvider
}