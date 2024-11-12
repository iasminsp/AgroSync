import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDU0UDankrLT5OUyiFQi7_-cP4kNSSg1xI",
  authDomain: "agrosync-773a1.firebaseapp.com",
  projectId: "agrosync-773a1",
  storageBucket: "agrosync-773a1.appspot.com",
  messagingSenderId: "65116238846",
  appId: "1:65116238846:web:5e1e82d706b896dd4dc6af",
  measurementId: "G-1M338M73EY"
};

export const appFirebase = initializeApp(firebaseConfig);
export const analytics = getAnalytics(appFirebase);
export const auth = getAuth(appFirebase)
export const firestore = getFirestore(appFirebase)

const db = getFirestore(appFirebase);

export { db};