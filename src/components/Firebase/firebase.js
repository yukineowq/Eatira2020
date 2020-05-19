import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyBBDiWLiLBtY70iYU7tL5nrIFlg3mhjoKo",
  authDomain: "eatira-9c48a.firebaseapp.com",
  databaseURL: "https://eatira-9c48a.firebaseio.com",
  projectId: "eatira-9c48a",
  storageBucket: "eatira-9c48a.appspot.com",
  messagingSenderId: "64097030062",
  appId: "1:64097030062:web:670a1c549b50ff6960823f",
  measurementId: "G-21PTLF56YX",
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  // *** User API ***

  user = (uid) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");
}

export default Firebase;
