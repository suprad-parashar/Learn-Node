//Import Modules.
const firebase = require("../firebase");
const express = require("express");
const path = require("path");
//Create Router Object.
const router = express.Router();

//Dashboard
router.get("/", (request, response) => {
    response.render(path.resolve('./views/html/dashboard'));
});

//Export Router.
module.exports = router;