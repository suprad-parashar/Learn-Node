//Import Firebase Modules
const firebase = require("firebase");
require("firebase/database")
require("firebase/storage")

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
firebase.initializeApp(firebaseConfig);

//Export Firebase
module.exports = firebase;