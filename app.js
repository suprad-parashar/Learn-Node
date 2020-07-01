//Import Modules and Set References.
const express = require("express");
const firebaseVariables = require("./firebase");
const firebase = firebaseVariables.firebase;
const app = express();

//Import Routes
const loginRoutes = require("./routes/login");
const signUpRoutes = require("./routes/signup");

//App Related Stuff
app.listen(3000);
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'pug');

//Static data and Assets
app.use("/assets", express.static("assets"))
app.use("/views", express.static("views"));

//Landing Page
app.get("/", (request, response) => {
    if (firebase.auth().currentUser == null)
        response.sendFile("./views/html/home.html", {root: __dirname});
    else
        response.redirect("/home");
});

//About Page
app.get("/about", (request, response) => {
    response.sendFile("./views/html/about.html", {root: __dirname});
});

//Login Page
app.use("/login", loginRoutes);

//Signup Page
app.use("/signup", signUpRoutes);

//Home Page (Dashboard)
app.get("/home", (request, response) => {
    response.send("<h1>HOME</h1>");
})