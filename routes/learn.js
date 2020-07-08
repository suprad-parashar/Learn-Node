//Import Modules.
const firebase = require("../firebase");
const express = require("express");
const path = require("path");
const helper = require("../helper");
let List = require("collections/list");

//Create Router Object.
const router = express.Router();

const database = firebase.database();
const storage = firebase.storage();

router.use((request, response, next) => {
    helper.checkAuth(response);
    next();
});

router.get('/', (request, response) =>{
    let user = firebase.auth().currentUser;
    let userName = user.displayName;
    let picURL = "https://firebasestorage.googleapis.com/v0/b/learn-634be.appspot.com/o/Profile%20Pictures%2F" + user.uid + '.jpg?alt=media';
    const defaultPicURL = "views/home/img/playstore.png";
    let domains = [];
    let dict = {};
    database.ref().child("domain").once('value').then(function (snapshot) {
        snapshot.forEach( function (domainSnapshot) {
            domains.push(domainSnapshot.key);
            dict[domainSnapshot.key] = domainSnapshot.val();
        })
        response.render(path.resolve('./views/html/learn'), {
            name: userName,
            email: user.email,
            activeName: "Learn",
            profilePic: picURL,
            filter : dict,
            domain : domains,
        });
    }).catch(function (error) {
        console.log(error.message);
    });
});

//Export Router.
module.exports = router;