auth.onAuthStateChanged(user => {
    if (user) {
        // console.log("YES");
        // auth.signOut();
        window.location.replace("/dashboard");
    } else {
        // console.log("NO");
    }
});