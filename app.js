//Import Modules and Set References.
const express = require("express");
const firebase = require("firebase");
const firebaseApp = require("firebase/app");
const app = express();

//Firebase Config
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

//Express Middleware
app.use("/assets", express.static("assets"))
app.use("/views", express.static("views"));
app.use(express.urlencoded({extended: true}));

//Routes
app.get("/", (request, response) => {
    if (firebase.auth().currentUser == null)
        response.sendFile("./views/html/home.html", {root: __dirname});
    else
        response.redirect("/home");
});

app.get("/about", (request, response) => {
    response.send("<h1>Sandeep</h1>");
});

app.get("/login", (request, response) => {
    response.sendFile("./views/html/login.html", {root: __dirname});
})

app.get("/signup", (request, response) => {
    response.sendFile("./views/html/signup.html", {root: __dirname});
})

app.post("/login", (request, response) => {
    let email = request.body.email;
    let password = request.body.password;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(r => {
            let user = firebase.auth().currentUser;
            if (user == null)
                response.send("<h1>NULL</h1>");
            else
                response.redirect("/home");
        })
        .catch(error => {
            response.send("<h1>Invalid</h1>");
        })
})

app.get("/login/google", (request, response) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        let user = result.user;
        if (user == null)
            response.send("<h1>NULL</h1>");
        else
            response.redirect("/home");
    }).catch(function(error) {
        response.send("<h1>"+ error.message +"</h1>");
    });
})

app.get("/home", (request, response) => {
    response.send("<h1>HOME</h1>");
})
