import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


// Initialize Cloud Firestore through Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCTsVXe8woNH01xnF-RJ_dNiSdPI0Gzq2M",
    authDomain: "challenge-tracker-ac44a.firebaseapp.com",
    databaseURL: "https://challenge-tracker-ac44a.firebaseio.com",
    projectId: "challenge-tracker-ac44a",
    storageBucket: "challenge-tracker-ac44a.appspot.com",
    messagingSenderId: "398296912248",
    appId: "1:398296912248:web:4490681cd0e30ed1fff88d"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
firestore.enablePersistence({"synchronizeTabs": true});

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`accounts/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`accounts/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
