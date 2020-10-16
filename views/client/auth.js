function signInUserWithEmail() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, password).then(arg => {
        let user = firebase.auth().currentUser;
        if (user.emailVerified)
            window.location.replace("/dashboard");
        else
            window.location.replace("/login");
    }).catch(error => {
        console.log(error.message);
    });
}

function signInUserWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(result => {
        window.location.replace("/dashboard");
    }).catch(function(error) {
        console.log(error.message);
    });
}

function createNewUser() {
    auth.createUserWithEmailAndPassword(email, password).then(arg => {
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
            window.location.replace("/login");
        }).catch(error => {
            console.log(error.message);
        });
    }).catch(error => {
        console.log(error.message);
    });
}

function forgotPassword() {
    let emailAddress = document.getElementById("email").value;
    firebase.auth().sendPasswordResetEmail(emailAddress).then(() => {
        window.location.replace("/login");

    }).catch(function(error) {
        console.log(error.message);
    });
}