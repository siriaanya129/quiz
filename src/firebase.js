import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6T9Ry3qtodPkOxj_VKaS0Lf0gU9QtQm0",
  authDomain: "quiz-bae8c.firebaseapp.com",
  projectId: "quiz-bae8c",
  storageBucket: "quiz-bae8c.appspot.com",
  messagingSenderId: "401462625005",
  appId: "1:401462625005:web:8e1938094fb34bc238c2e4",
  measurementId: "G-M8KLL2PNSJ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
