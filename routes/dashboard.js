//Import Modules.
const firebase = require("../firebase");
const express = require("express");
const helper = require("../helper");
const path = require("path");

//Create Router Object.
const router = express.Router();
const database = firebase.database();

//Check Authentication.
router.use((request, response, next) => {
    helper.checkAuth(response);
    next();
});

//Dashboard
router.get("/", (request, response) => {
    let user = firebase.auth().currentUser;
    let userName = user.displayName;
    let picURL = "https://firebasestorage.googleapis.com/v0/b/learn-634be.appspot.com/o/Profile%20Pictures%2F" + user.uid + '.jpg?alt=media';
    database.ref().child("users").child(user.uid).child("activity").once('value').then(function (snapshot) {
        let n = snapshot.numChildren();
        const data = [];
        for (let i = n - 1; i >= n - 3; i--)
            data.push(snapshot.child(i.toString()).val());
        response.render(path.resolve('./views/html/dashboard'), {
            name: userName,
            email: user.email,
            activeName: "Dashboard",
            profilePic: picURL,
            filter: data,
        });
    }).catch(function (error) {
        console.log(error.message);
    });
    // storage.ref().child('Profile Pictures').child(user.uid + '.jpg').getDownloadURL().then(function (url) {
    //     console.log("PIC:" + url);
    // }).catch(function (error) {
    //     console.log(error);
    //     response.render(path.resolve('./views/html/dashboard'), {
    //         name: userName,
    //         email: user.email,
    //         activeName: "Dashboard",
    //         profilePic: "https://firebasestorage.googleapis.com/v0/b/learn-634be.appspot.com/o/Profile%20Pictures%2FXIwC8t459hYayACtaoft1KXIfX93.jpg?alt=media&token=cfd3e848-718f-4430-98b1-ec6e6578f595"
    //     });
    // });
    // response.render(path.resolve('./views/html/dashboard'), {
    //     name: userName,
    //     email: user.email,
    //     activeName: "Dashboard",
    //     profilePic: "https://firebasestorage.googleapis.com/v0/b/learn-634be.appspot.com/o/Profile%20Pictures%2FXIwC8t459hYayACtaoft1KXIfX93.jpg?alt=media&token=cfd3e848-718f-4430-98b1-ec6e6578f595"
    // });
    // path.getDownloadURL().then(function (url) {
    //     axios.get(url,{
    //         responseType : 'blob',
    //         method : 'GET',
    //     }).then(function (res) {
    //         response.render(path.resolve('./views/html/dashboard'), {
    //             name: userName,
    //             profilePic: res.data
    //         });
    //     }).catch(function (error) {
    //         response.render(path.resolve('./views/html/dashboard'), {
    //             name: userName,
    //             profilePic: url
    //         });
    //         console.log(error.message);
    //     })
    // }).catch(function (error) {
    //     response.render(path.resolve('./views/html/dashboard'), {
    //         name: userName,
    //         profilePic: "views/home/img/playstore.png"
    //     });
    //     console.log(error.message);
    // })
});

//Export Router.
module.exports = router;