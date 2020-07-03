//Import Modules.
const firebase = require("../firebase");
const express = require("express");
const axios = require('axios').default;
let Blob = require('blob');
const path = require("path");

//Create Router Object.
const router = express.Router();

const database = firebase.database();
const storage = firebase.storage();

//Dashboard
router.get("/", (request, response) => {
    let user = firebase.auth().currentUser;
    console.log(user.displayName);
    let userName = user.displayName;
    let path = storage.ref().child('Profile Pictures').child('CvDqQf12tGP0Pgs6iZeMyqX3nNA3.jpg');
    path.getDownloadURL().then(function (url) {
        axios.get(url,{
            responseType : 'blob',
            method : 'GET',
        }).then(function (res) {
            response.render(path.resolve('./views/html/dashboard'), {
                name: userName,
                profilePic: res.data
            });
        }).catch(function (error) {
            response.render(path.resolve('./views/html/dashboard'), {
                name: userName,
                profilePic: url
            });
            console.log(error.message);
        })
    }).catch(function (error) {
        response.render(path.resolve('./views/html/dashboard'), {
            name: userName,
            profilePic: "views/home/img/playstore.png"
        });
        console.log(error.message);
    })
});

//Export Router.
module.exports = router;