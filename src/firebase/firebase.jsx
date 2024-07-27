// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import {
//   collection,
//   addDoc,
//   doc,
//   setDoc,
//   getDocs,
//   getDoc,
//   collectionGroup,
//   onSnapshot,
//   query,
//   where,
//   updateDoc,
// } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_APP_FB_API_KEY,
//   authDomain: import.meta.env.VITE_APP_FB_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_APP_FB_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_APP_FB_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_APP_FB_SENDER_ID,
//   appId: import.meta.env.VITE_APP_FB_APP_ID,
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const firestoreDB = getFirestore(app);

// export {
//   app,
//   auth,
//   firestoreDB,
//   collection,
//   addDoc,
//   doc,
//   setDoc,
//   getDocs,
//   getDoc,
//   collectionGroup,
//   onSnapshot,
//   query,
//   where,
//   updateDoc,
// };




import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  getDoc,
  collectionGroup,
  onSnapshot,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC85IA7ueRmozYCVLDDIUedJnqmVoeKTak",
  authDomain: import.meta.env.VITE_APP_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FB_SENDER_ID,
  appId: import.meta.env.VITE_APP_FB_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestoreDB = getFirestore(app);

export {
  app,
  auth,
  firestoreDB,
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  getDoc,
  collectionGroup,
  onSnapshot,
  query,
  where,
  updateDoc,
};