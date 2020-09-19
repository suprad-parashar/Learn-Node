//Import Modules.
const firebase = require("../firebase");
const express = require("express");
const path = require("path");
const helper = require("../helper");

//Create Objects.
const router = express.Router();
const database = firebase.database();

//Check Auth.
router.use((request, response, next) => {
    helper.checkAuth(response);
    next();
});

//Static data and Assets
// router.use("/assets", express.static("assets"));
// router.use("/views", express.static("views"));
router.use(express.static(path.join(__dirname, 'views')));

//Learn Main Page
router.get('/', (request, response) => {
    let user = firebase.auth().currentUser;
    let userName = user.displayName;
    let picURL = "https://firebasestorage.googleapis.com/v0/b/learn-634be.appspot.com/o/Profile%20Pictures%2F" + user.uid + '.jpg?alt=media';
    database.ref().child("domain").once('value').then(function (snapshot) {
        response.render(path.resolve('./views/html/learn'), {
            name: userName,
            email: user.email,
            activeName: "Learn",
            profilePic: picURL,
            filter: snapshot,
        });
    }).catch(function (error) {
        console.log(error.message);
    });
});

//Get Domain and Branch
router.get("/:domain/:branch", (request, response) => {
    const domainName = request.params.domain;
    const branchName = request.params.branch;
    console.log("Course" + domainName);
    let user = firebase.auth().currentUser;
    let userName = user.displayName;
    let picURL = "https://firebasestorage.googleapis.com/v0/b/learn-634be.appspot.com/o/Profile%20Pictures%2F" + user.uid + '.jpg?alt=media';
    database.ref().child("domain").child(domainName).child(branchName).once('value').then(function (snapshot) {
        response.render(path.resolve('./views/html/coursesList'), {
            name: userName,
            email: user.email,
            activeName: "Learn",
            domainName: domainName,
            branchName: branchName,
            profilePic: picURL,
            filter: snapshot,
        });
    }).catch(function (error) {
        console.log(error.message);
    });
});

//Get Domain
router.get("/:domain", (request, response) => {
    const domainName = request.params.domain;
    let user = firebase.auth().currentUser;
    let userName = user.displayName;
    let picURL = "https://firebasestorage.googleapis.com/v0/b/learn-634be.appspot.com/o/Profile%20Pictures%2F" + user.uid + '.jpg?alt=media';
    database.ref().child("domain").child(domainName).once('value').then(function (snapshot) {
        response.render(path.resolve('./views/html/branch'), {
            name: userName,
            email: user.email,
            activeName: "Learn",
            domainName: domainName,
            profilePic: picURL,
            filter: snapshot,
        });
    }).catch(function (error) {
        console.log(error.message);
    });
});
//Static data and Assets
router.use("/assets", express.static("assets"));
router.use("/views", express.static("views"));

//Export Router.
module.exports = router;