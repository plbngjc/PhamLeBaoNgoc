var first = document.getElementById("first");
console.log(first);
console.log(first.firstChild);
console.log(first.firstChild.nextSibling);
console.log(first.parentNode);

var stories = document.getElementById("stories");
for (var i = 0; i < stories.childNodes.length; i++) {
    var child = stories.childNodes[i];
    console.log("child " + i + " = " + child + " nodeType=" + child.nodeType);

    if (child.nodeType !== Node.TEXT_NODE) {
        child.style.backgroundColor = "green";
    }
}