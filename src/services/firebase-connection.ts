// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"
import { getAuth} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeGzdLS30SC5p-ILdM0vnqdh9s511gshU",
  authDomain: "reactlinks-fea9d.firebaseapp.com",
  projectId: "reactlinks-fea9d",
  storageBucket: "reactlinks-fea9d.firebasestorage.app",
  messagingSenderId: "893569344362",
  appId: "1:893569344362:web:86b773c99fb262272f3b13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db} 