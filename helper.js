//Import Files
const firebase = require("./firebase");

//Check if a user is logged in.
function checkAuth(response) {
    if (firebase.auth().currentUser == null)
        response.redirect("/login");
}

function getRating(ratings) {
    let sum = 0;
    let count = 0
    ratings.forEach(rating => {
        sum += rating;
        count += 1;
    });
    return sum / count;
}

module.exports = {checkAuth, getRating};