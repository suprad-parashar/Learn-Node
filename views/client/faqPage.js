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

function getFAQ(question, answer) {
    return '<div class="accordion" style="background-color: #FFFFFF;border-radius: 0px;">' +
        '<button style="text-align: left;">' + question + '</button>' +
        '<img class="dropdown" src="views/dashboard/images/icon/chevron-down-outline.svg" style="width: 25px;height: 25px;float: right;">' +
        '</div>' +
        '<div class="panel" style="padding: 20px;background-color: #AF87D4;">' +
        '<p style="color: white">' + answer + '</p>' +
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
        // console.log(userNameTags);
        n = userNameTags.length;
        for (let i = 0; i < n; i++) {
            userNameTags[i].innerHTML = user.displayName;
        }
        document.getElementById("emailSpan").innerHTML = user.email;

        // let frame = document.getElementById("faq_frame");
        // database.ref().child("faq").once("value").then(snapshot => {
        //     snapshot.forEach(child => {
        //         let question = child.child("question").val();
        //         let answer = child.child("answer").val();
        //         frame.innerHTML += getFAQ(question, answer);
        //     });
        // });

        let acc = document.getElementsByClassName("accordion");
        let prev = -1;
        for (let i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                this.classList.toggle("active");
                const panel = this.nextElementSibling;
                const img = this.children[1];
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                    img.src = "views/dashboard/images/icon/chevron-down-outline.svg";
                } else {
                    panel.style.display = "block";
                    img.src = "views/dashboard/images/icon/chevron-up-outline.svg";
                }
            });
        }
    } else {
        window.location.replace("/login");
    }
});

