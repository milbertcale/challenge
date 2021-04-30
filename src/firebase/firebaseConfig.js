import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyAG71bJHzLfIigolGyQbUC1PrmB2VdRh_4",
    authDomain: "challenge-b8aaf.firebaseapp.com",
    projectId: "challenge-b8aaf",
    storageBucket: "challenge-b8aaf.appspot.com",
    messagingSenderId: "163115662306",
    appId: "1:163115662306:web:fe4d0b93287a7378d9d7bb",
    measurementId: "G-MB8Q922LTX"
});

export default firebaseConfig;