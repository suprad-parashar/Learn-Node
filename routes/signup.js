//Import Modules.
const firebaseVariables = require("../firebase");
const firebase = firebaseVariables.firebase;
const database = firebaseVariables.database;
const express = require("express");
const path = require("path");

//Create Router Object.
const router = express.Router();

//Main Signup Page (GET)
router.get("/", (request, response) => {
    response.sendFile(path.resolve("./views/html/signup.html"));
});

//Main Signup Page (POST)
router.post("/", (request, response) => {
    let name = request.body.name;
    let email = request.body.email;
    let pass = request.body.pass;
    let re_pass = request.body.re_pass;
    if (pass !== re_pass) {
        response.sendFile(path.resolve("./views/html/signup.html"), {
            validationMessage: "Password Mismatch at server."
        });
    }
    firebase.auth().createUserWithEmailAndPassword(email, pass).then(() => {
        let user = firebase.auth().currentUser;
        database.ref().child("users").child(user.uid).child("data").set({
            points: 100,
            moderator: false,
            type: "Student"
        });
        user.updateProfile({
            displayName: name
        });
        user.sendEmailVerification().then(() => {
            console.log('Verification Mail Has been sent Please Verify Before you login.');
            window.location.replace('/login');
        }).catch(error => {
            console.log("Error Sending Verification Email");
            console.log(error.message);
        });
        firebase.auth().signOut();
    }).catch(error => {
        response.send("<h1>Email Already Exists!</h1>");
    });
});

//Export Router.
module.exports = router;