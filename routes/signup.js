//Import Modules.
const firebase = require("../firebase");

const express = require("express");
const path = require("path");

//Create Router Object.
const router = express.Router();

//Main Signup Page (GET)
router.get("/", (request, response) => {
    response.sendFile(path.resolve("./views/html/signup.html"));
});

// //Main Signup Page (POST)
// router.post("/", (request, response) => {
//     let name = request.body.name;
//     let email = request.body.email;
//     let pass = request.body.pass;
//     console.log(name);
//     console.log(email);
//     try {
//         firebase.auth().createUserWithEmailAndPassword(email, pass).then(() => {
//             let user = firebase.auth().currentUser;
//             let database = firebase.database();
//             database.ref().child("users").child(user.uid).child("data").set({
//                 points: 100,
//                 moderator: false,
//                 type: "Student"
//             }).catch(error => {
//                 console.log(error.message);
//             });
//             user.updateProfile({
//                 displayName: name
//             }).catch(error => {
//                 response.send("<h1>Firebase User Profile Cannot be updated</h1>");
//             });
//             user.sendEmailVerification().then(() => {
//                 console.log('Verification Mail Has been sent Please Verify Before you login.');
//             }).catch(error => {
//                 console.log(error.message);
//             });
//         }).catch(error => {
//             response.send("<h1>Email Already Exists!</h1>");
//         });
//     } catch (error) {
//         console.log(error.message);
//     }
//     firebase.auth().signOut().then(function () {
//         response.sendFile(path.resolve("./views/html/login.html"));
//     }).catch(error => {
//         response.send("<h1>Logout failed</h1>");
//     });
// });

//Export Router.
module.exports = router;