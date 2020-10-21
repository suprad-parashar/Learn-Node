function validatePassword() {
    let form = document.getElementById("register-form");
    let password = document.getElementById("pass").value;
    let re_pass = document.getElementById("re_pass").value;
    if (password === re_pass) {
        if (password.length < 8) {
            alert('Password must contain 8 character');
        } else {
            let upperCase = false;
            let lowerCase = false;
            let number = /\d/.test(password);
            let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
            let hasSpecialCharacter = format.test(password);
            for (let i = 0; i < password.length; i++) {
                if (password[i] === password[i].toLowerCase()) {
                    lowerCase = true;
                } else if (password[i] === password[i].toUpperCase()) {
                    upperCase = true;
                }
            }
            console.log(number);
            console.log(lowerCase);
            console.log(upperCase);
            console.log(hasSpecialCharacter);
            if (!lowerCase) {
                alert('Password must contain at least 1 Lowercase character');
            } else if (!upperCase) {
                alert('Password must contain at least 1 Uppercase character');
            } else if (!number) {
                alert('Password must contain at least 1 Number');
            } else if (!hasSpecialCharacter) {
                alert('Password must contain at least 1 Special character');
            } else {
                form.method = "POST";
                form.action = "javascript:createNewUser()";
                form.submit();
            }
        }
    } else {
        alert("Password Mismatch");
    }
}

auth.onAuthStateChanged(user => {
    if (user) {
        window.location.replace("/dashboard");
    }
});