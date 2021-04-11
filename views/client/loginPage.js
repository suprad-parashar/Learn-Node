auth.onAuthStateChanged(user => {
    if (user) {
        // console.log("YES");
        // auth.signOut();
        window.location.replace("/dashboard");
    } else {
        // console.log("NO");
        let params = new URL(window.location.href);
        let isReg = params.searchParams.get("reg");
        let isReset = params.searchParams.get("reset");
        if (isReg) {
            let alertBox = document.getElementById("alerts");
            alertBox.innerHTML = "<div class=\"alert success\">" +
                "<span class=\"closebtn\" onclick=\"this.parentElement.style.display='none';\">&times;</span>" +
                "Registered Successfully! Check your inbox for a verification email." +
                "</div>";
        }
        if (isReset) {
            let alertBox = document.getElementById("alerts");
            alertBox.innerHTML = "<div class=\"alert success\">" +
                "<span class=\"closebtn\" onclick=\"this.parentElement.style.display='none';\">&times;</span>" +
                "Please check your inbox for password reset link." +
                "</div>";
        }
    }
});