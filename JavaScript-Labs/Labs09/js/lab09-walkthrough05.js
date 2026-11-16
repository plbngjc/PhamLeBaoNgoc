
// this variable has global scope
var boxClass = 'movingDiv';

function outputBox(num) {
   var box = "<div class='" + boxClass + "' id='div" + num + "'>";
   box += "This is div " + num;
   box += "</div>";
   return box;
}

window.addEventListener("load", function () {
    var firstDiv = document.getElementById("div1");
    alert(firstDiv.innerHTML);

    var divs = document.querySelectorAll(".movingDiv");
    for (var i = 0; i < divs.length; i++) {
        divs[i].addEventListener("mouseover", function (event) {
            alert("triggered by " + event.target.id);
        });
    }
});