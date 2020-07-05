//Import Modules.
const firebase = require("../firebase");
const express = require("express");
const path = require("path");
const helper = require("../helper");

//Create Router Object.
const router = express.Router();

router.use((request, response, next) => {
    helper.checkAuth(response);
    next();
});

//Profile
router.get("/", (request, response) => {
    const user = firebase.auth().currentUser;
    const database = firebase.database();
    let picURL = "https://firebasestorage.googleapis.com/v0/b/learn-634be.appspot.com/o/Profile%20Pictures%2F" + user.uid + '.jpg?alt=media';
    const defaultPicURL = "views/home/img/playstore.png";
    database.ref().child("users").child(user.uid).child("data").once("value").then(snapshot => {
        response.render("html/profile", {
            name: user.displayName,
            email: user.email,
            profilePic: picURL,
            activeName: "Profile",
            institution: snapshot.child("institution").val()
        });
    });
});

router.get("/edit", (request, response) => {
    const user = firebase.auth().currentUser;
    const database = firebase.database();
    let picURL = "https://firebasestorage.googleapis.com/v0/b/learn-634be.appspot.com/o/Profile%20Pictures%2F" + user.uid + '.jpg?alt=media';
    const defaultPicURL = "views/home/img/playstore.png";
    database.ref().child("users").child(user.uid).child("data").once("value").then(snapshot => {
        response.render("html/editProfile", {
            name: user.displayName,
            email: user.email,
            profilePic: picURL,
            activeName: "Profile",
            institution: snapshot.child("institution").val()
        });
    });
})

//Export Router.
module.exports = router;