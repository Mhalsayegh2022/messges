import 'firebase/firestore';
import firebase from 'firebase/app';

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBx4gcRNiNZBD4t-eaGLPmWghZ_QAYh6BI",
    authDomain: "messages-9b0e0.firebaseapp.com",
    databaseURL: "https://messages-9b0e0.firebaseio.com",
    projectId: "messages-9b0e0",
    storageBucket: "messages-9b0e0.appspot.com",
    messagingSenderId: "948984734889",
    appId: "1:948984734889:web:ed20597636b8fd9048b5b8",
    measurementId: "G-N9SNN3DS3T"
});


export default firebase.firestore()