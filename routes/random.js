//Import Modules.
const firebase = require("../firebase");
const express = require("express");
const path = require("path");
const helper = require("../helper");

//Create Objects.
const router = express.Router();
const database = firebase.database();

// //Check Auth
// router.use((request, response, next) => {
//     helper.checkAuth(response);
//     next();
// });

//Static data and Assets
router.use("/assets", express.static("assets"));
router.use("/views", express.static("views"));

router.get("/", (request, response) => {
    // let user = firebase.auth().currentUser;
    // let userName = user.displayName;
    // let picURL = "https://firebasestorage.googleapis.com/v0/b/learn-634be.appspot.com/o/Profile%20Pictures%2F" + user.uid + '.jpg?alt=media';
    database.ref().child("links").child("Random").child('0').once('value').then(function(snapshot) {
        // getting error in the rating ( To be Resolved ).
        response.render(path.resolve('./views/html/videoPage'), {
            // name: userName,
            // email: user.email,
            activeName: "Learn",
            // profilePic: picURL,
            filter: snapshot,
            course: "Random Video Of The Day",
            rating: helper.getRating(snapshot.child("rating").val())
        });
    }).catch(function(error) {
        console.log(error.message);
        response.status(404).render(path.resolve('./views/html/404'), {
            // name: user.displayName,
            // email: user.email,
            // profilePic: picURL,
            activeName: "NONE",
        });
    });
});

//Export Router.
module.exports = router;