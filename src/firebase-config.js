import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDenN5qfEl3UTGODaITwSw90uLYK6Y3rMo",
    authDomain: "trip-planner-1a249.firebaseapp.com",
    projectId: "trip-planner-1a249",
    storageBucket: "trip-planner-1a249.appspot.com",
    messagingSenderId: "535109392798",
    appId: "1:535109392798:web:7b709037427961a505de8f"
};
firebase.initializeApp(firebaseConfig);
export const provider = new firebase.auth.GoogleAuthProvider();
export const databaseRef = firebase.firestore();
export const authRef = firebase.auth();