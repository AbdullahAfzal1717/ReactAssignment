import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyANqxqm87xbendrOKFcy1pdQX60ZyMqiWI ",
  authDomain: "react-firebase-59f1c.firebaseapp.com",
  projectId: "react-firebase-59f1c",
  storageBucket: "react-firebase-59f1c.appspot.com",
  messagingSenderId: "870420698359",
  appId: "1:870420698359:web:3b7c3b5abb54dd2979eff2",
  measurementId: "G-NT2WHKQW3S",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, analytics, firestore, storage };
