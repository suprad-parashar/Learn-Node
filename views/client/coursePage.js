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

// function openPage(pageName, element, color) {
//     let i, tabContent, tabLinks;
//     tabContent = document.getElementsByClassName("tabcontent");
//     for (i = 0; i < tabContent.length; i++) {
//         tabContent[i].style.display = "none";
//     }
//     tabLinks = document.getElementsByClassName("tablink");
//     for (i = 0; i < tabLinks.length; i++) {
//         tabLinks[i].style.backgroundColor = "";
//     }
//     document.getElementById(pageName).style.display = "block";
//     element.style.backgroundColor = color;
// }

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

        // document.getElementById("defaultOpen").click();
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