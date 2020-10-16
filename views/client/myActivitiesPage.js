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

function getLink(ref) {
    let parts = ref.split("/");
    let n = parts.length;
    console.log(parts);
    return "/course/" + parts[n - 3] + "/video/" + parts[n - 1];
}

function getCardHTML(hasCompleted, name, from, date, reference) {
    let title, buttonText;
    if (hasCompleted) {
        title = "Completed";
        buttonText = "Watch Again";
    } else {
        title = "Started";
        buttonText = "Resume";
    }
    return '<div class="card" style="padding: 10px; border: 1px solid #8C54A1;">' +
            '<h4>' + title + ' watching ' + name + ' by ' + from + '</h4>' +
            '<p>' + date + '</p>' +
            '<a href="' + getLink(reference) + '">' +
            '<button class="btn" style="border: #8C54A1 solid 1px; float: right;color:#8C54A1;font-weight: bold;">' +
            buttonText + '</button></a>' + '</div>';
}

auth.onAuthStateChanged(user => {
    if (user) {
        console.log("HELLLLLLLLLLO");
        let imageTags = document.getElementsByClassName("profilePicImages");
        let n = imageTags.length;
        for (let i = 0; i < n; i++) {
            imageTags[i].src = getProfilePic();
            imageTags[i].alt = user.displayName;
        }
        let userNameTags = document.getElementsByClassName("userNameSpans");
        n = userNameTags.length;
        for (let i = 0; i < n; i++) {
            userNameTags[i].innerHTML = user.displayName;
        }
        document.getElementById("emailSpan").innerHTML = user.email;

        let activitiesDiv = document.getElementById("activities_list");
        database.ref().child("users").child(user.uid).child("activity").once("value").then(snapshot => {
            let n = snapshot.numChildren();
            for (let i = n - 1; i >= n - 10; i--) {
                let done = snapshot.child(i.toString()).child("done").val();
                let name = snapshot.child(i.toString()).child("name").val();
                let from = snapshot.child(i.toString()).child("from").val();
                let date = snapshot.child(i.toString()).child("date").val();
                let reference = snapshot.child(i.toString()).child("reference").val();
                activitiesDiv.innerHTML += getCardHTML(done, name, from, date, reference);
            }
        });
    } else {
        console.log(user);
        // window.location.replace("/login");
    }
});