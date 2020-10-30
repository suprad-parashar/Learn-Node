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
    return '<div class="">' +
        '<div class="card" style="width: 20em; height: 210px;padding: 7px;box-shadow: 2px 4px 2px #8C54A1; margin-right:20px; border-radius: 10px;">' +
        '<div style="margin: 5px;">' +
        '<h5>' + title + ' watching ' + name + ' by ' + from + '</h5>' +
        '<p style = "padding-bottom: 5px;" >' + date + '</p>' +
        '<a href = "' + getLink(reference) + '">' +
        '<button class = "btn" style = "background-color: #8C54A1; bottom: 20px;color:white;position: absolute;">' + buttonText + '</button>' +
        '</a></div></div ></div>'
}

auth.onAuthStateChanged(user => {
    if (user) {
        let imageTags = document.getElementsByClassName("profilePicImages");
        let n = imageTags.length;
        for (let i = 0; i < n; i++) {
            imageTags[i].src = getProfilePic();
            imageTags[i].alt = user.displayName;
        }
        document.getElementById("userNameWelcome").innerHTML = getUserName().split(" ")[0];
        let userNameTags = document.getElementsByClassName("userNameSpans");
        n = userNameTags.length;
        for (let i = 0; i < n; i++) {
            userNameTags[i].innerHTML = user.displayName;
        }
        document.getElementById("emailSpan").innerHTML = user.email;
        let activitiesDiv = document.getElementById("recent_activities_div");
        activitiesDiv.innerHTML = "";
        database.ref().child("users").child(user.uid).child("activity").once("value").then(snapshot => {
            let n = snapshot.numChildren();
            if (n == 0) {
                activitiesDiv.innerHTML += "<h4>No Recent Activity</h4>";
            }
            for (let i = n - 1; i >= n - 3; i--) {
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
        window.location.replace("/login");
    }
});