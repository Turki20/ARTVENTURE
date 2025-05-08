// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// هذا هو إعدادك اللي نسخته من Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyA0iZOWhn6MRezrvbbfDUEiDgxGUD_B3kM",
  authDomain: "artventure-cbd70.firebaseapp.com",
  projectId: "artventure-cbd70",
  storageBucket: "artventure-cbd70.firebasestorage.app",
  messagingSenderId: "387373998354",
  appId: "1:387373998354:web:01325fe3040e9c407f93cb",
  measurementId: "G-PDD6RT7F4L"
};

// تهيئة الفايربيس
const app = initializeApp(firebaseConfig);

// تهيئة auth
const auth = getAuth(app);
const db = getFirestore(app);

export { auth ,db };
