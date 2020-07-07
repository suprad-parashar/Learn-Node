//Import Modules and Set References.
const express = require("express");
const firebase = require("./firebase");
const app = express();

//Import Routes
const loginRoutes = require("./routes/login");
const signUpRoutes = require("./routes/signup");
const dashboardRoutes = require("./routes/dashboard");
const profileRoutes = require("./routes/profile");
const learnRoutes = require("./routes/learn");
const forgotPasswordRoutes = require("./routes/forgotPassword");

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

//Profile.
app.use("/profile", profileRoutes);

//Learn
app.use('/learn', learnRoutes);

//Forgot Password
app.use("/forgot", forgotPasswordRoutes);

//Logout
app.get("/logout", (request, response) => {
    firebase.auth().signOut();
    response.redirect("/");
});