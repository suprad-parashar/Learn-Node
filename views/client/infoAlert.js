const close = document.getElementsByClassName("closebtn");
for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        const div = this.parentElement;
        div.style.opacity = "0";
        setTimeout(function () {
            div.style.display = "none";
        }, 600);
    }
}