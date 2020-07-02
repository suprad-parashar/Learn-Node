//Import Modules.
const firebaseVariables = require("../firebase");
const firebase = firebaseVariables.firebase;
const database = firebaseVariables.database;
const express = require("express");
const path = require("path");
//Create Router Object.
const router = express.Router();

//Main Signup Page (GET)
router.get("/", (request, response) => {
    response.render(path.resolve('./views/html/dashboard'));
});

//Export Router.
module.exports = router;