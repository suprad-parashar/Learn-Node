//Import Modules.
const firebaseVariables = require("../firebase");
const firebase = firebaseVariables.firebase;
const database = firebaseVariables.database;
const storage = firebaseVariables.storage;
const express = require("express");
const path = require("path");
//Create Router Object.
const router = express.Router();

//Dashboard
router.get("/", (request, response) => {
    let name = firebase.auth().currentUser.displayName;
    let imageUrl =
    response.render(path.resolve('./views/html/dashboard'));

});

//Export Router.
module.exports = router;