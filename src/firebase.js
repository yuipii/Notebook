// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7f0bWg_UcEbjTjMhjLVKVArKENAZfCA4",
  authDomain: "notebook-6c26c.firebaseapp.com",
  projectId: "notebook-6c26c",
  storageBucket: "notebook-6c26c.firebasestorage.app",
  messagingSenderId: "350574384463",
  appId: "1:350574384463:web:aeb1eca759e1fcd931a13a",
  measurementId: "G-56CCJN7PXN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
