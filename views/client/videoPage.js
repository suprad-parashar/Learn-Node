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

function change(link) {
    document.getElementById("player").src = link.replace("watch?v=", "embed/");
    return false;
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

        const coll = document.getElementsByClassName("collapsible");
        let i;
        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function () {
                this.classList.toggle("active");
                const content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }
            });
        }

        let parts = window.location.href.split("/");
        let index = parts[parts.length - 1];
        let course = parts[parts.length - 3];
        let fcourse = course.replace(".", "Dot").replace("#", "Sharp").replace("%20", " ");
        console.log(parts);
        console.log(fcourse);
        database.ref().child("links").child(fcourse).child("Videos").child(index).once("value").then(snapshot => {
            console.log(snapshot.child("name").val());
            let reference = database.ref().child("users").child(user.uid).child("activity");
            reference.once("value").then(activity => {
                let last = activity.numChildren();
                let exists = false;
                for (let i = 1; i < 3; i++) {
                    console.log("Looop");
                    if (activity.child((last - i).toString()).child("name").val() === snapshot.child("name").val()) {
                        exists = true;
                        break;
                    }
                }
                console.log(exists);
                if (!exists) {
                    console.log("Hello");
                    let date = new Date().toDateString().split(" ");
                    let dateString = date[2] + " " + date[1] + ", " + date[3];
                    reference.child(activity.numChildren().toString()).update({
                        date: dateString,
                        done: false,
                        from: snapshot.child("from").val(),
                        index: 0,
                        link: snapshot.child("link").val(),
                        name: snapshot.child("name").val(),
                        playlist: snapshot.child("playlist").val(),
                        reference: snapshot.ref.toString(),
                        time: 0,
                        type: "VIDEO"
                    }).catch(error => {
                        // console.log(error.message);
                        console.log("Alpha");
                    });
                }
            }).catch(error => {
                console.log(error.message)
            });
        });

        // let reference = database.ref().child("users").child(user.uid).child("activity");
        // reference.once("value").then(activity => {
        //     let last = activity.numChildren();
        //     let exists = false;
        //     for (let i = 1; i < 3; i++) {
        //         if (activity.child((last - i).toString()).child("name").val() === snapshot.child("name").val()) {
        //             exists = true;
        //             break;
        //         }
        //     }
        //     if (!exists) {
        //         let date = new Date().toDateString().split(" ");
        //         let dateString = date[2] + " " + date[1] + ", " + date[3];
        //         reference.child(activity.numChildren().toString()).update({
        //             date: dateString,
        //             done: false,
        //             from: snapshot.child("from").val(),
        //             index: 0,
        //             link: snapshot.child("link").val(),
        //             name: snapshot.child("name").val(),
        //             playlist: snapshot.child("playlist").val(),
        //             reference: snapshot.ref.toString(),
        //             time: 0,
        //             type: "VIDEO"
        //         }).catch(error => {
        //             console.log(error.message);
        //         });
        //     }
        // }).catch(error => {
        //     console.log(error.message)
        // });
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