//Import Modules and Set References.
const express = require("express");
const firebase = require("firebase")
const firebaseApp = require("firebase/app");
const firebseAuth = require("firebase/auth");
const app = express();
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'pug');
const firebaseConfig = {
    apiKey: "AIzaSyBasifU1_o2rfiptyJEA7GRoXszwySbHek",
    authDomain: "learn-634be.firebaseapp.com",
    databaseURL: "https://learn-634be.firebaseio.com",
    projectId: "learn-634be",
    storageBucket: "learn-634be.appspot.com",
    messagingSenderId: "172846432484",
    appId: "1:172846432484:web:d0ae995eeef4323f0fecf1",
    measurementId: "G-0W9LD4N2GM"
};
firebaseApp.initializeApp(firebaseConfig);

//App Related Stuff
app.listen(3000);

//Routes
app.use("/assets", express.static("assets"))

app.use("/views", express.static("views"));

app.get("/", (request, response) => {
    // response.send("<h1>hELLO</h1>");
    response.sendFile("./views/html/home.html", {root: __dirname});
});

app.get("/about", (request, response) => {
    response.send("<h1>Sandeep</h1>");
});

app.get("/login", (request, response) => {
    response.sendFile("./views/html/login.html", {root: __dirname})
})

app.get("/signup", (request, response) => {
    response.sendFile("./views/html/signup.html", {root: __dirname})
})

app.post("/signup", (request, response) => {
    let name = request.body.name;
    let email = request.body.email;
    let pass = request.body.pass;
    let re_pass = request.body.re_pass;
    if (pass === re_pass){
        console.log("Pss match");
    }

    else{
        response.sendFile("./views/html/signup.html",{root:__dirname,validationMessage:"Password Mismatch at server."})
    }
    // firebase.auth().createUserWithEmailAndPassword(email, pass).then(function () {
    //     let database = firebase.database();
    //     let user = firebase.auth().currentUser;
    //     database.ref().child("users").child(user.uid).child("data").set({
    //         points: 0,
    //         status: "Newbie",
    //         type: "Student"
    //     });
    //     user.updateProfile({
    //         displayName: name
    //     });
    //     user.sendEmailVerification().then(function () {
    //         console.log('Verification Mail Has been sent Please Verify Before you login.');
    //         window.location.replace('/login');
    //
    //     }).catch(function (error) {
    //         console.log("Error Send Verification EMail");
    //     });
    //     console.log(user.displayName);
    //     firebase.auth().signOut();
    // })
    //     .catch(function (error) {
    //         console.log("Error");
    //     });
})