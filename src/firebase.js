// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDy0PrnNo7hOXWBIU6cxId1cJW3J5i_H_g",
  authDomain: "reorg-108.firebaseapp.com",
  projectId: "reorg-108",
  storageBucket: "reorg-108.appspot.com",
  messagingSenderId: "197093140992",
  appId: "1:197093140992:web:d986ed82e88808a90946e5",
  measurementId: "G-HNDXVF3ZK0"
};

// Initialize Firebase


let instance;

export default function getFirebase() {
  if (typeof window !== "undefined") {
    if (instance) return instance;
    instance = initializeApp(firebaseConfig);
    return instance;
  }

  return null;
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export {auth,app}