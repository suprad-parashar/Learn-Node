function signInUserWithEmail() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, password).then(ignored => {
        let user = firebase.auth().currentUser;
        if (user.emailVerified)
            window.location.replace("/dashboard");
        else {
            auth.signOut();
            let alertBox = document.getElementById("alerts");
            alertBox.innerHTML = "<div class=\"alert\">" +
                "<span class=\"closebtn\" onclick=\"this.parentElement.style.display='none';\">&times;</span>" +
                "Please click on the verification link sent to your email" +
                "</div>";
        }
    }).catch(ignored => {
        let alertBox = document.getElementById("alerts");
        alertBox.innerHTML = "<div class=\"alert\">" +
            "<span class=\"closebtn\" onclick=\"this.parentElement.style.display='none';\">&times;</span>" +
            "Invalid Credentials" +
            "</div>";
    });
}

function signInUserWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(ignored => {
        window.location.replace("/dashboard");
    }).catch(function (error) {
        console.log(error.message);
    });
}

function createNewUser() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("pass").value;
    auth.createUserWithEmailAndPassword(email, password).then(ignored => {
        let user = auth.currentUser;
        database.ref().child("users").child(user.uid).child("data").set({
            points: 100,
            moderator: false,
            type: "Student"
        }).catch(error => {
            console.log(error.message);
        });
        user.updateProfile({
            displayName: name
        }).catch(error => {
            console.log(error.message);
        });
        user.sendEmailVerification().then(() => {
            console.log("Verification Email Sent!");
            window.location.replace("/login?reg=true");
        }).catch(error => {
            console.log(error.message);
        });
    }).catch(error => {
        console.log(error.message);
        let alertBox = document.getElementById("alerts");
        alertBox.innerHTML = "<div class=\"alert\">" +
            "<span class=\"closebtn\" onclick=\"this.parentElement.style.display='none';\">&times;</span>" +
            "Email already registered. Please Login." +
            "</div>";
    });
}

function forgotPassword() {
    let emailAddress = document.getElementById("email").value;
    firebase.auth().sendPasswordResetEmail(emailAddress).then(() => {
        window.location.replace("/login?reset=true");
    }).catch(function (error) {
        console.log(error.message);
    });
}