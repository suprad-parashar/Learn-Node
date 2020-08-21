//Import Modules.
const firebase = require("../firebase");
const express = require("express");

//Create Router Object.
const router = express.Router();

//Forgot Password
router.get("/", (request, response) => {
    response.render("html/forgotPassword");
});

//Send Reset Password Mail
router.post("/", (request, response) => {
    let emailAddress = request.body.email;
    firebase.auth().sendPasswordResetEmail(emailAddress).then(() => {
        response.redirect("/login");
    }).catch(function (error) {
        response.send(error);
    });
})

//Export Router.
module.exports = router;