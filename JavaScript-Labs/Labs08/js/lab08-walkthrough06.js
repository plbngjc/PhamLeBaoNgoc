var stringOne = new String("Test");
var stringTwo = "Test";
var stringThree = "Test";
var stringFour = new String("Test");

document.write(stringOne);
document.write("<br>typeof stringOne = " + typeof stringOne);
document.write("<br>typeof stringThree = " + typeof stringThree);

if (stringOne == stringTwo) {
    document.write("<br>stringOne has the same value as stringTwo");
}
if (stringOne == stringFour) {
    document.write("<br>stringOne has the same value as stringFour");
}
if (stringOne === stringTwo) {
    document.write("<br>stringOne has the same value and type as stringTwo");
}
if (stringTwo === stringThree) {
    document.write("<br>stringTwo has the same value and type as stringThree");
}
if (stringTwo === stringFour) {
    document.write("<br>stringTwo has the same value and type as stringFour");
}

var dateOne = new Date();
document.write("<p>" + dateOne + "</p>");
document.write("Math.PI = " + Math.PI + "<br>");
document.write("Math.sqrt(4) = " + Math.sqrt(4) + "<br>");
document.write("Math.random() = " + Math.random() + "<br>");

