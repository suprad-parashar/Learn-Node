//Import Modules and Set References.
const express = require("express");
const firebase = require("firebase/app");
const app = express();

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

app.get("/about-me", (request, response) => {
    response.redirect("/about");
})
