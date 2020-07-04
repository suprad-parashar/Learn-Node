//Import Modules and Set References.
const express = require("express");
const firebase = require("./firebase");
const app = express();

//Import Routes
const loginRoutes = require("./routes/login");
const signUpRoutes = require("./routes/signup");
const dashboardRoutes = require("./routes/dashboard");

//App Related Stuff
app.listen(3000);
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs');

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

//Dashboard
app.use('/dashboard', dashboardRoutes);

//Profile Page.
app.get("/profile", (request, response) => {
    checkAuth(response);
    const user = firebase.auth().currentUser;
    const database = firebase.database();
    let picURL = "https://firebasestorage.googleapis.com/v0/b/learn-634be.appspot.com/o/Profile%20Pictures%2F" + user.uid + '.jpg?alt=media';
    const defaultPicURL = "views/home/img/playstore.png";
    database.ref().child("users").child(user.uid).child("data").once("value").then(snapshot => {
        response.render("html/profile", {
            name: user.displayName,
            email: user.email,
            profilePic: picURL,
            activeName: "Profile",
            institution: snapshot.child("institution").val()
        });
    });
})

//Home Page (Dashboard)
app.get("/home", (request, response) => {
    response.send("<h1>HOME</h1>");
})

function checkAuth(response) {
    if (firebase.auth().currentUser == null)
        response.redirect("/login");
}