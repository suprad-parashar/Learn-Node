//Import Modules and Set References.
const express = require("express");
const firebase = require("firebase");
const firebaseApp = require("firebase/app");
const app = express();

//App Related Stuff
app.listen(3000);
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

//Static data and Assets
app.use("/assets", express.static("assets"))
app.use("/views", express.static("views"));

app.get("/", (request, response) => {
    if (firebase.auth().currentUser == null)
        response.sendFile("./views/html/home.html", {root: __dirname});
    else
        response.redirect("/home");
});

app.get("/about", (request, response) => {
    response.sendFile("./views/html/about.html", {root: __dirname});
});

app.post("/login", (request, response) => {
    let email = request.body.email;
    let password = request.body.password;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(r => {
            let user = firebase.auth().currentUser;
            if (user.emailVerified)
                response.send("<h1>" + user.displayName + "</h1>");
            else
                response.send("<h1>Please Verify your email address.</h1>");
        })
        .catch(error => {
            response.send("<h1>Invalid Credentials</h1>");
        })
});

app.get("/login", (request, response) => {
    response.sendFile("./views/html/login.html", {root: __dirname})
})

app.get("/login/google", (request, response) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        let user = result.user;
        if (user == null)
            response.send("<h1>NULL</h1>");
        else
            response.redirect("/home");
    }).catch(function (error) {
        response.send("<h1>" + error.message + "</h1>");
    });
})

app.get("/signup", (request, response) => {
    response.sendFile("./views/html/signup.html", {root: __dirname})
})

app.post("/signup", (request, response) => {
    let name = request.body.name;
    let email = request.body.email;
    let pass = request.body.pass;
    let re_pass = request.body.re_pass;
    if (pass !== re_pass) {
        response.sendFile("./views/html/signup.html", {
            root: __dirname,
            validationMessage: "Password Mismatch at server."
        })
    }
    firebase.auth().createUserWithEmailAndPassword(email, pass).then(() => {
        let database = firebase.database();
        let user = firebase.auth().currentUser;
        database.ref().child("users").child(user.uid).child("data").set({
            points: 100,
            moderator: false,
            type: "Student"
        });
        user.updateProfile({
            displayName: name
        });
        user.sendEmailVerification().then(() => {
            console.log('Verification Mail Has been sent Please Verify Before you login.');
            window.location.replace('/login');
        }).catch(error => {
            console.log("Error Sending Verification Email");
            console.log(error.message);
        });
        firebase.auth().signOut();
    }).catch(error => {
        response.send("<h1>Email Already Exists!</h1>");
    });
})

app.get("/home", (request, response) => {
    response.send("<h1>HOME</h1>");
})
