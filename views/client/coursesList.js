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

function getCardHTML(branch, image, domain) {
    return '<div class="col-md-4" onclick="window.location.href=' + "'/learn/" + domain + "/" + branch + '">' +
        '<div class="card contain img-fluid au-card"  onMouseOver="this.style.opacity=0.8" onMouseOut="this.style.opacity=1"  style="width:100%;padding:0; opacity: 1; height: 250px;cursor: pointer;border-radius: 15px;position:relative">' +
        '<img src="' + image + '" alt="Card image" class="image" style=" opacity: 1;display: block;width: 100%;height: 250px;transition: .5s ease;backface-visibility: hidden;">' +
        '<div class="middle" onMouseOver="this.style.opacity=1" onMouseOut="this.style.opacity=0" style="  transition: .5s ease;opacity: 0;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%);text-align: center;">' +
        '<div class="text" style=" background-color: #fff;color:#8C54A1;font-size: 16px;padding: 28px 40px;">' +
        '<h2 style="font-weight:bold">' + branch + '</h2>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<h5 style="text-align:center">' + branch + '</h5>' +
        '</div>';
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
        n = userNameTags.length;
        for (let i = 0; i < n; i++) {
            userNameTags[i].innerHTML = user.displayName;
        }
        document.getElementById("emailSpan").innerHTML = user.email;

        // let frame = document.getElementById("branch_frame");
        // let domain = window.location.href.split("/").slice(-1)[0];
        // database.ref().child("domain").child(domain).once("value").then(snapshot => {
        //     let i = 0;
        //     let isClosed = true;
        //     snapshot.forEach(child => {
        //         if (child.key !== "image") {
        //             if (i % 3 === 0) {
        //                 frame.innerHTML += "<div class='row'>";
        //                 isClosed = false
        //             }
        //             frame.innerHTML += getCardHTML(child.key, child.child("image").val(), domain);
        //             if (i % 2 === 0) {
        //                 frame.innerHTML += "</div>";
        //                 isClosed = true;
        //             }
        //             i++;
        //         }
        //     })
        //     if (!isClosed)
        //         frame.innerHTML += "</div>";
        // })
    } else {
        window.location.replace("/login");
    }
})