
var daysOfWeek = new Array("Mon", "Tues", "Wed", "Thur", "Fri");
daysOfWeek.push("Sat");
daysOfWeek.unshift("Sun");

document.write("<table border='1'>");
document.write("<thead><tr>");
for (var i = 0; i < daysOfWeek.length; i++) {
    var dayName = daysOfWeek[i];
    if (dayName.length > 3) {
        dayName = "<em>" + dayName + "</em>";
    }
    document.write("<th>" + dayName + "</th>");
}
document.write("</tr></thead><tbody>");

for (var day = 1; day <= 30; day++) {
    if ((day - 1) % 7 === 0) {
        document.write("<tr>");
    }
    document.write("<td>" + day + "</td>");

    if (day % 7 === 0) {
        document.write("</tr>");
    }
}

var emptyCells = 7 - (30 % 7);
for (var blank = 0; blank < emptyCells; blank++) {
    document.write("<td></td>");
}
document.write("</tr></tbody></table>");

