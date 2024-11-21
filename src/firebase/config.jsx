import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoYAnIhhhSxQ8jn-ef6f9gWuUlniH3X3A",
  authDomain: "auction2024-11f9d.firebaseapp.com",
  projectId: "auction2024-11f9d",
  storageBucket: "auction2024-11f9d.firebasestorage.app",
  messagingSenderId: "379420478510",
  appId: "1:379420478510:web:4ece016961262c2d21a3bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
