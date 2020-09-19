//Import Modules.
const firebase = require("../firebase");
const express = require("express");
const path = require("path");
const helper = require("../helper");

//Create Objects.
const router = express.Router();
const database = firebase.database();

//Check Auth
router.use((request, response, next) => {
    helper.checkAuth(response);
    next();
});

//Static data and Assets
router.use("/views", express.static("views"));
router.use("/assets", express.static("assets"));

//Get Resource ID and Course.
router.get("/:course/video/:resource", (request, response) => {
    const course = request.params.course;
    const resource = request.params.resource;
    const fcourse = course.replace(".", "Dot").replace("#", "Sharp");
    let user = firebase.auth().currentUser;
    let userName = user.displayName;
    let picURL = "https://firebasestorage.googleapis.com/v0/b/learn-634be.appspot.com/o/Profile%20Pictures%2F" + user.uid + '.jpg?alt=media';
    database.ref().child("links").child(fcourse).child("Videos").child(resource).once('value').then(function (snapshot) {
        response.render(path.resolve('./views/html/videoPage'), {
            name: userName,
            email: user.email,
            activeName: "Learn",
            course: course,
            profilePic: picURL,
            filter: snapshot,
            rating: helper.getRating(snapshot.child("rating").val()),
        });
    }).catch(function (error) {
        console.log(error.message);
    });
});

//Get Course.
router.get("/:course", (request, response) => {
    const course = request.params.course;
    const fcourse = course.replace(".", "Dot").replace("#", "Sharp");
    let user = firebase.auth().currentUser;
    let userName = user.displayName;
    let picURL = "https://firebasestorage.googleapis.com/v0/b/learn-634be.appspot.com/o/Profile%20Pictures%2F" + user.uid + '.jpg?alt=media';
    database.ref().child("links").child(fcourse).once('value').then(function (snapshot) { 
        response.render(path.resolve('./views/html/coursePage'), {
            name: userName,
            email: user.email,
            activeName: "Learn",
            course: course,
            profilePic: picURL,
            filter: snapshot,
        });
    }).catch(function (error) {
        console.log(error.message);
    });
});

//Export Router.
module.exports = router;