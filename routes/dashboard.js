//Import Modules.
const firebase = require("../firebase");
const express = require("express");
const helper = require("../helper");
const path = require("path");

//Create Router Object.
const router = express.Router();
const database = firebase.database();

// //Check Authentication.
// router.use((request, response, next) => {
//     helper.checkAuth(response);
//     next();
// });

//Dashboard
router.get("/", (request, response) => {
    // let user = firebase.auth().currentUser;
    // let userName = user.displayName;
    // let picURL = "https://firebasestorage.googleapis.com/v0/b/learn-634be.appspot.com/o/Profile%20Pictures%2F" + user.uid + '.jpg?alt=media';
    database.ref().child("links").child("Random").once('value').then(function (snapshot) {
        let n = snapshot.numChildren();
        let random = Math.floor(Math.random() * n).toString();
        response.render(path.resolve('./views/html/dashboard'), {
            activeName: "Dashboard",
            random: random
            // showMessage: true,
            // messages: [{
            //     type: "success",
            //     message: "Testing the Message Feature"
            // }]
        });
    });
});

//Export Router.
module.exports = router;