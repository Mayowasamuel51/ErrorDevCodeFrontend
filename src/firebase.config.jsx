// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyWge5KZFvjLVYSpJ3P9BExGvB1Wg-aqU",
  authDomain: "mainerrorproject.firebaseapp.com",
  projectId: "mainerrorproject",
  storageBucket: "mainerrorproject.appspot.com",
  messagingSenderId: "194020076602",
  appId: "1:194020076602:web:796d5a857dbf9e11859903",
  measurementId: "G-CQ8K96JW2V"
};

// // Initialize Firebase
// export const app  =  initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const app  =  initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);