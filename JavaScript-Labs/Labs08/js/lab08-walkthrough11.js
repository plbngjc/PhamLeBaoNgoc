// define constructor function for Country objects
function Country(name, iso, capital, population) {
    this.name = name;
    this.iso = iso;
    this.capital = capital;
    this.population = population;
}

// create an array of country objects
var countries = [
    new Country("Bahamas", "BS", "Nassau", 301790),
    new Country("Canada", "CA", "Ottawa", 33679000),
    new Country("Germany", "DE", "Berlin", 81802257),
];

// you can also push each new country object onto the end of the array
countries.push(new Country("Spain", "ES", "Madrid", 46505963));
countries.push(new Country("United Kingdom", "GB", "London", 62348447));

var countryList = document.createElement("main");
countryList.setAttribute("aria-label", "Country details");
document.body.appendChild(countryList);

for (var i = 0; i < countries.length; i++) {
    var country = countries[i];
    var box = document.createElement("section");
    box.className = "box";

    var flag = document.createElement("img");
    flag.src = "flags/" + encodeURIComponent(country.iso) + ".png";
    flag.alt = country.name + " flag";
    flag.className = "boxImg";
    box.appendChild(flag);

    for (var propertyName in country) {
        if (Object.prototype.hasOwnProperty.call(country, propertyName)) {
            var row = document.createElement("div");
            var label = document.createElement("strong");
            label.textContent = propertyName + ": ";
            row.appendChild(label);
            row.appendChild(document.createTextNode(country[propertyName]));
            box.appendChild(row);
        }
    }

    countryList.appendChild(box);
}
