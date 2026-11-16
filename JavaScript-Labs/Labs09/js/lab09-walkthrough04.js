var button = document.getElementById("testButton");
var content = document.getElementById("content");
var image = document.getElementById("mainImage");
var hideTimer;
var showTimer;

function simpleHandler() {
    if (button.textContent === "Hide") {
        button.textContent = "Show";
        content.className = "makeItDisappear";
        window.clearTimeout(hideTimer);
        window.clearTimeout(showTimer);
        hideTimer = window.setTimeout(function () {
            content.style.display = "none";
        }, 1000);
    } else {
        button.textContent = "Hide";
        window.clearTimeout(hideTimer);
        window.clearTimeout(showTimer);
        content.style.display = "block";
        showTimer = window.setTimeout(function () {
            content.className = "makeItNormal";
        }, 500);
    }
}

button.addEventListener("click", simpleHandler);
image.addEventListener("mouseover", function () {
    image.className = "makeItGray";
});
image.addEventListener("mouseout", function () {
    image.className = "makeItNormal";
});

