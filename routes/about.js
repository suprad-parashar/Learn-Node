//Import Modules.
const firebase = require("../firebase");
const express = require("express");
const path = require("path");
const { request, response } = require("express");
const bodyparser = require('body-parser');
const { rootCertificates } = require("tls");

//Create Router Object.
const router = express.Router();

router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());

//Main About Page (GET)
router.get("/", (request, response) => {
    response.sendFile(path.resolve("./views/html/about.html"));
});

router.post("/", (request, response) => {
    console.log(request.body.name);
})
//Export Router.
module.exports = router;