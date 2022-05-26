
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider,signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword,sendPasswordResetEmail,signOut } from "firebase/auth";
import{getFirestore,query,getDocs,collection,where,addDoc} from "firebase/firestore";
import { Navigate } from "react-router-dom";


const firebaseConfig = {
  apiKey: "AIzaSyBtq5KtolbSo5YxxnCO5CbnD_akwP9F8XI",
  authDomain: "fir-auth-7bb71.firebaseapp.com",
  projectId: "fir-auth-7bb71",
  storageBucket: "fir-auth-7bb71.appspot.com",
  messagingSenderId: "398017596847",
  appId: "1:398017596847:web:70d6bc107cd75dec49735a",
  measurementId: "G-SPNHHXDPH7"
};

// Initialize Firebase
const app=initializeApp(firebaseConfig);
const analytics=getAnalytics(app);
const auth = getAuth(app);
const db=getFirestore(app);


const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


const logout = () => {
  console.log("requested");
  signOut(auth);
  window.location.assign('/Home');
};


export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};

