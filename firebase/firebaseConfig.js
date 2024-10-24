// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDU0UDankrLT5OUyiFQi7_-cP4kNSSg1xI",
  authDomain: "agrosync-773a1.firebaseapp.com",
  projectId: "agrosync-773a1",
  storageBucket: "agrosync-773a1.appspot.com",
  messagingSenderId: "65116238846",
  appId: "1:65116238846:web:5e1e82d706b896dd4dc6af",
  measurementId: "G-1M338M73EY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db};