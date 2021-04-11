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

let hasImageChanged = false;
const profile_image = document.getElementById('profileImage');
const profile_image_upload = document.getElementById('profile_image_upload');
const getImage = document.getElementById('imageInput');
profile_image.addEventListener('click', function (ignored) {
    $("#profile_image_upload").click();
});
profile_image_upload.addEventListener('change', function () {
    fasterPreview(this);
    console.log("Changed");
});

function fasterPreview(uploader) {
    if (uploader.files && uploader.files[0]) {
        console.log(document.querySelector('#profile_image_upload').files[0]);
        profile_image.src = window.URL.createObjectURL(uploader.files[0]);
        console.log(profile_image.src);
        hasImageChanged = true;
    }
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

        document.getElementById("name").value = user.displayName;
        database.ref().child("users").child(user.uid).child("data").once("value").then(snapshot => {
            if (snapshot.hasChild("institution"))
                document.getElementById("institution").value = snapshot.child("institution").val();
        });
    } else {
        window.location.replace("/login");
    }
});

function saveProfile() {
    // alert("Hello");
    let user = firebase.auth().currentUser;
    let updatedName = document.getElementById("name").value;
    let updatedInstitution = document.getElementById("institution").value;
    // let profileImage = request.body.profileImage;
    // let imageInput = request.body.imageInput;

    console.log(updatedName);
    user.updateProfile({
        displayName: updatedName
    }).catch(error => {
        console.log(error.message);
        // response.send("<h1>Firebase User Profile Cannot be updated</h1>");
    });

    database.ref().child("users").child(user.uid).child("data").update({
        institution: updatedInstitution
    }, a => {
        if (a != null)
            console.log(a);
    });

    if (hasImageChanged) {
        let image = document.getElementById("profile_image_upload").files[0];

        storage.ref().child("Profile Pictures").child(auth.currentUser.uid + ".jpg").put(image).then(ignored => {
            console.log('Uploaded a blob or file!');
            window.location.replace("/profile");
        }).catch(error => {
            console.log(error.message);
        });
    } else {
        window.location.replace("/profile");
    }

    // storage.ref().child('Profile Pictures').child(user.uid + '.jpg').put(path.resolve("../home/img/dummy_profile_picture.jpeg")).then(snapshot => snapshot.ref.getDownloadURL()).then(url =>{
    //     console.log(url);
    //     console.log('success');
    // })
}