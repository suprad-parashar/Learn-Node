function changePasswordPage() {
    const user = auth.currentUser;
    let newPassword = document.getElementById("new").value;
    let currentPassword = document.getElementById("current").value;
    const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        currentPassword
    );
    user.reauthenticateWithCredential(credential).then(function () {
        user.updatePassword(newPassword).then(() => {
            window.location.replace("/profile");
        }).catch((error) => {
            response.send(error);
        });
    }).catch(function (error) {
        response.send(error);
    });
}

function validatePassword() {
    let form = document.getElementById("change-password-form");
    let newPassword = document.getElementById("new").value;
    let confirmPassword = document.getElementById("confirm").value;
    if (newPassword.length < 8) {
        alert('Password must contain at least 8 characters');
    } else {
        let upperCase = false;
        let lowerCase = false;
        let number = /\d/.test(newPassword);
        let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        let hasSpecialCharacter = format.test(newPassword);
        for (let i = 0; i < newPassword.length; i++) {
            if (newPassword[i] === newPassword[i].toLowerCase()) {
                lowerCase = true;
            } else if (newPassword[i] === newPassword[i].toUpperCase()) {
                upperCase = true;
            }
        }
        if (!lowerCase) {
            alert('Password must contain at least 1 Lowercase character');
        } else if (!upperCase) {
            alert('Password must contain at least 1 Uppercase character');
        } else if (!number) {
            alert('Password must contain at least 1 Number');
        } else if (!hasSpecialCharacter) {
            alert('Password must contain at least 1 Special character');
        } else if (newPassword !== confirmPassword) {
            alert("Password do not match");
        } else {
            form.method = "POST";
            form.action = "javascript:changePasswordPage()";
            form.submit();
        }
    }
}

auth.onAuthStateChanged(user => {
    if (!user) {
        window.location.replace("/login");
    }
})