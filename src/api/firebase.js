import firebase from "firebase";
// Required for side-effects
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

var db = firebase.firestore();

export default db;