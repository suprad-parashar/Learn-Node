//Import Modules.
const firebase = require("../firebase");
const express = require("express");
const path = require("path");

//Create Router Object.
const router = express.Router();

//Main Login Page (GET)
router.get("/", (request, response) => {
    console.log(__dirname);
    response.sendFile(path.resolve("./views/html/login.html"));
});

//Main Login Page (POST)
router.post("/", (request, response) => {
    let email = request.body.email;
    let password = request.body.password;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(r => {
            let user = firebase.auth().currentUser;
            if (user.emailVerified)
                response.send("<h1>" + user.displayName + "</h1>");
            else
                response.send("<h1>Please Verify your email address.</h1>");
        })
        .catch(error => {
            response.send("<h1>Invalid Credentials</h1>");
        })
});

//Google Sign In Auth Function Route.
router.get("/google", (request, response) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        let user = result.user;
        if (user == null)
            response.send("<h1>NULL</h1>");
        else
            response.redirect("/home");
    }).catch(function (error) {
        response.send("<h1>" + error.message + "</h1>");
    });
});

//Export Router.
module.exports = router;