var msg = document.getElementById("msgArea");
msg.value = "Here is some text";

var title = document.getElementById("pageTitle");
title.innerHTML = "New Title";
title.innerHTML = "Even newer title";

msg.value = document.getElementById("first").innerHTML;
msg.value = document.getElementById("first").innerText;
msg.value = "My class is " + msg.getAttribute("class");

var textareas = document.getElementsByTagName("textarea");
textareas[0].value = "selected by tag name";

var spans = document.getElementsByTagName("span");
msg.value = "";
for (var i = 0; i < spans.length; i++) {
    msg.value += "\n" + spans[i].innerText;
}

var counts = document.getElementsByClassName("count-number");
msg.value = "";
for (var j = 0; j < counts.length; j++) {
    msg.value += "\n" + counts[j].innerText;
}

var firstParagraph = document.querySelector("#first p");
msg.value = firstParagraph.innerHTML;

var paragraphs = document.querySelectorAll("#first p");
msg.value = "";
for (var k = 0; k < paragraphs.length; k++) {
    msg.value += paragraphs[k].innerHTML + "\n";
}

msg.setAttribute("class", "hidden");
document.getElementById("features").style.backgroundColor = "green";