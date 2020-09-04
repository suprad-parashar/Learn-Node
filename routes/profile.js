//Import Modules.
const firebase = require("../firebase");
const express = require("express");
const helper = require("../helper");
const path = require("path");
const { fileLoader } = require("ejs");

//Create Router Object.
const router = express.Router();


//Static data and Assets
router.use("/assets", express.static("assets"));
router.use("/views", express.static("views"));

//Check Auth.
router.use((request, response, next) => {
    helper.checkAuth(response);
    next();
});

//Profile
router.get("/", (request, response) => {
    const user = firebase.auth().currentUser;
    const database = firebase.database();
    let picURL = "https://firebasestorage.googleapis.com/v0/b/learn-634be.appspot.com/o/Profile%20Pictures%2F" + user.uid + '.jpg?alt=media';
    database.ref().child("users").child(user.uid).child("data").once("value").then(snapshot => {
        response.render("html/profile", {
            name: user.displayName,
            email: user.email,
            profilePic: picURL,
            activeName: "Profile",
            institution: snapshot.child("institution").val(),
            brains: snapshot.child("points").val(),
        });
    });
});

//Edit Profile
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
});

//Save Edits
router.post("/edit", (request, response) => {
    let user = firebase.auth().currentUser;
    let database = firebase.database();
    let storage = firebase.storage();
    let updatedName = request.body.name;
    let updatedInstitution = request.body.institution;
    let profileImage = request.body.profileImage;
    let imageInput = request.body.imageInput;

    console.log("IMAGE: " + imageInput);

    user.updateProfile({
        displayName: updatedName
    }).catch(error => {
        response.send("<h1>Firebase User Profile Cannot be updated</h1>");
    });


    // storage.ref().child('Profile Pictures').child(user.uid + '.jpg').put(path.resolve("../home/img/dummy_profile_picture.jpeg")).then(snapshot => snapshot.ref.getDownloadURL()).then(url =>{
    //     console.log(url);
    //     console.log('success');
    // })

    database.ref().child("users").child(user.uid).child("data").update({
        institution: updatedInstitution
    }, a => {
        if (a != null)
            console.log(a);
    });
    response.redirect("/profile");
});

//Change Password
router.get("/password", (request, response) => {
    const user = firebase.auth().currentUser;
    const database = firebase.database();
    let picURL = "https://firebasestorage.googleapis.com/v0/b/learn-634be.appspot.com/o/Profile%20Pictures%2F" + user.uid + '.jpg?alt=media';
    const defaultPicURL = "views/home/img/playstore.png";
    database.ref().child("users").child(user.uid).child("data").once("value").then(snapshot => {
        response.render("html/changePassword", {
            name: user.displayName,
            email: user.email,
            profilePic: picURL,
            activeName: "Profile",
            institution: snapshot.child("institution").val()
        });
    });
});

//Save Changes
router.post("/password", (request, response) => {
    const user = firebase.auth().currentUser;
    let currentPassword = request.body.current;
    let newPassword = request.body.new;
    const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        currentPassword
    );
    user.reauthenticateWithCredential(credential).then(function () {
        user.updatePassword(newPassword).then(() => {
            response.redirect("/profile");
        }).catch((error) => {
            response.send(error);
        });
    }).catch(function (error) {
        response.send(error);
    });
});

//Export Router.
module.exports = router;