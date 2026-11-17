var boxClass = "movingDiv";

function outputBox(num) {
    // Exercise 8.8 step 9: var box = "<div class='" + boxClass + "' id='div" + num + "'>";
    box = "<div class='" + boxClass + "' id='div" + num + "'>";
    box += "This is div " + num;
    box += "</div>";
    return box;
}

