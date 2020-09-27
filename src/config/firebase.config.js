import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBbm0G5DMQYLwyiQnxXkJdnJEDrCSHhZ_E",
    authDomain: "aerabeti.firebaseapp.com",
    databaseURL: "https://aerabeti.firebaseio.com",
    projectId: "aerabeti",
    storageBucket: "aerabeti.appspot.com",
    messagingSenderId: "872431049018",
    appId: "1:872431049018:web:3af18dc63b026732a49803",
    measurementId: "G-4LNMP9HQV9"
};

firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
