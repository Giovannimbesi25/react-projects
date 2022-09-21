import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBOfir9BKg1kn0BgzfeZTdf8llEskWm_hA",
  authDomain: "clone-4d78c.firebaseapp.com",
  projectId: "clone-4d78c",
  storageBucket: "clone-4d78c.appspot.com",
  messagingSenderId: "316587191445",
  appId: "1:316587191445:web:43a052a36a9c7c48143f9c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const provider = new GoogleAuthProvider();

export default app;