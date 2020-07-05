//Import Files
const firebase = require("./firebase");

//Check if a user is logged in.
function checkAuth(response) {
    if (firebase.auth().currentUser == null)
        response.redirect("/login");
}

module.exports = {checkAuth};