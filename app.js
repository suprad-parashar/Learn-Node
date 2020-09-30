//Import Modules and Set References.
const express = require("express");
const firebase = require("./firebase");
const app = express();
const helper = require("./helper");
const path = require("path");

//Import Routes
const loginRoutes = require("./routes/login");
const signUpRoutes = require("./routes/signup");
const dashboardRoutes = require("./routes/dashboard");
const profileRoutes = require("./routes/profile");
const learnRoutes = require("./routes/learn");
const forgotPasswordRoutes = require("./routes/forgotPassword");
const coursesRoutes = require("./routes/courses");
const randomRoutes = require("./routes/random");

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
        response.redirect("/dashboard");
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
app.use("/course", coursesRoutes);
app.use("/random/video",randomRoutes);

//Forgot Password
app.use("/forgot", forgotPasswordRoutes);

//My Activity
app.get("/activity", (request, response) => {
    helper.checkAuth(response);
    let user = firebase.auth().currentUser;
    let userName = user.displayName;
    let picURL = "https://firebasestorage.googleapis.com/v0/b/learn-634be.appspot.com/o/Profile%20Pictures%2F" + user.uid + '.jpg?alt=media';
    const database = firebase.database();
    database.ref().child("users").child(user.uid).child("activity").once('value').then(function (snapshot) {
        response.render(path.resolve('./views/html/myActivity'), {
            name: userName,
            email: user.email,
            activeName: "My Activity",
            profilePic: picURL,
            filter: snapshot,
        });
    }).catch(function (error) {
        console.log(error.message);
    });
});

app.get("/faq", (request, response) => {
    helper.checkAuth(response);
    let user = firebase.auth().currentUser;
    let userName = user.displayName;
    let picURL = "https://firebasestorage.googleapis.com/v0/b/learn-634be.appspot.com/o/Profile%20Pictures%2F" + user.uid + '.jpg?alt=media';
    const database = firebase.database();
    database.ref().child("faq").once('value').then(function (snapshot) {
        response.render(path.resolve('./views/html/faq'), {
            name: userName,
            email: user.email,
            activeName: "",
            profilePic: picURL,
            filter: snapshot,
        });
    }).catch(function (error) {
        console.log(error.message);
    });
});

app.get("/test", (request, response) => {
    response.render(path.resolve('./views/html/test'));
})

//Logout
app.get("/logout", (request, response) => {
    firebase.auth().signOut();
    response.redirect("/");
});