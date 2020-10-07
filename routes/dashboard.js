//Import Modules.
const firebase = require("../firebase");
const express = require("express");
const helper = require("../helper");
const path = require("path");

//Create Router Object.
const router = express.Router();
const database = firebase.database();

//Check Authentication.
router.use((request, response, next) => {
    helper.checkAuth(response);
    next();
});

//Dashboard
router.get("/", (request, response) => {
    let user = firebase.auth().currentUser;
    let userName = user.displayName;
    let picURL = "https://firebasestorage.googleapis.com/v0/b/learn-634be.appspot.com/o/Profile%20Pictures%2F" + user.uid + '.jpg?alt=media';
    let random= "";
    database.ref().child("users").child(user.uid).child("activity").once('value').then(function (snapshot) {
        let n = snapshot.numChildren();
        const data = [];
        for (let i = n - 1; i >= n - 3; i--)
            data.push(snapshot.child(i.toString()).val());
        response.render(path.resolve('./views/html/dashboard'), {
            name: userName,
            email: user.email,
            activeName: "Dashboard",
            profilePic: picURL,
            filter: data,
        });
    }).catch(function (error) {
        console.log(error.message);
    });
});

//Export Router.
module.exports = router;