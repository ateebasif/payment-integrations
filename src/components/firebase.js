import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";

// real project
const firebaseConfig = {
  apiKey: "AIzaSyCGdfdrKH3Cco_OtVHSAFN5KVQePCRsKGY",
  authDomain: "react-chat-app12.firebaseapp.com",
  projectId: "react-chat-app12",
  storageBucket: "react-chat-app12.appspot.com",
  messagingSenderId: "569404600692",
  appId: "1:569404600692:web:c80999a00ecc7d8e60bc21",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
export const firebaseRef = firebase;
export const auth = firebase.auth;
export const firestore = firebase.firestore();
export const storageRef = firebase.storage().ref();
