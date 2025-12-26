// firebase.js

// Core Firebase
import { initializeApp } from "firebase/app";

// Firebase services
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyMxUTkJkfvtkExwzY9FUNoFLYL9SAmpA",
  authDomain: "web-film-652a5.firebaseapp.com",
  projectId: "web-film-652a5",
  storageBucket: "web-film-652a5.appspot.com",
  messagingSenderId: "907193303296",
  appId: "1:907193303296:web:7e0ee04f6935c06bc633e5",
  measurementId: "G-D140QG4EJL",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Services
const auth = getAuth(app); // Authentication
const db = getFirestore(app); // Firestore Database
const storage = getStorage(app); // Firebase Storage
const analytics = getAnalytics(app); // Analytics (optional)

// Export
export { app, auth, db, storage, analytics };
