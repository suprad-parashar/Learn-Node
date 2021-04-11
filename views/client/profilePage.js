function getProfilePic() {
    return "https://firebasestorage.googleapis.com/v0/b/learn-634be.appspot.com/o/Profile%20Pictures%2F" + auth.currentUser.uid + '.jpg?alt=media';
}

function dummy() {
    document.getElementById("pimg1").src = "views/home/img/dummy_profile_picture.jpeg";
    document.getElementById("pimg2").src = "views/home/img/dummy_profile_picture.jpeg";
}

function getUserName() {
    return auth.currentUser.displayName;
}

auth.onAuthStateChanged(user => {
    if (user) {
        let imageTags = document.getElementsByClassName("profilePicImages");
        let n = imageTags.length;
        for (let i = 0; i < n; i++) {
            imageTags[i].src = getProfilePic();
            imageTags[i].alt = user.displayName;
        }
        let userNameTags = document.getElementsByClassName("userNameSpans");
        // console.log(userNameTags);
        n = userNameTags.length;
        for (let i = 0; i < n; i++) {
            userNameTags[i].innerHTML = user.displayName;
        }
        document.getElementById("emailSpan").innerHTML = user.email;

        document.getElementById("userNameHeading").innerHTML = user.displayName;
        document.getElementById("emailHeading").innerHTML = user.email;
        database.ref().child("users").child(user.uid).child("data").once("value").then(snapshot => {
            if (snapshot.hasChild("institution"))
                document.getElementById("institutionHeading").innerHTML = snapshot.child("institution").val();
        });
    } else {
        window.location.replace("/login");
    }
});