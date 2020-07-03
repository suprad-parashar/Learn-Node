//Import Firebase Modules
const firebase = require("firebase");
const firebaseApp = require("firebase/app");

//Configure Firebase.
const firebaseConfig = {
    apiKey: "AIzaSyBasifU1_o2rfiptyJEA7GRoXszwySbHek",
    authDomain: "learn-634be.firebaseapp.com",
    databaseURL: "https://learn-634be.firebaseio.com",
    projectId: "learn-634be",
    storageBucket: "learn-634be.appspot.com",
    messagingSenderId: "172846432484",
    appId: "1:172846432484:web:d0ae995eeef4323f0fecf1",
    measurementId: "G-0W9LD4N2GM"
};
firebaseApp.initializeApp(firebaseConfig);
const database = firebase.database;
const storage = firebase.storage;

//Export Firebase
module.exports = {firebase, database, storage};