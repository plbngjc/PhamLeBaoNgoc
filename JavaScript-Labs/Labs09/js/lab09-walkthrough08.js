function init() {
    document.getElementById("sampleForm").addEventListener("submit", checkForEmptyFields);
}

window.addEventListener("load", init);

function checkForEmptyFields(event) {
    var errorArea = document.getElementById("errors");
    errorArea.className = "hidden";
    errorArea.textContent = "";

    var fields = document.querySelectorAll('input[type="text"], input[type="password"]');
    var emptyFields = [];

    for (var i = 0; i < fields.length; i++) {
        if (fields[i].value.trim() === "") {
            event.preventDefault();
            emptyFields.push(fields[i]);
        }
    }

    if (emptyFields.length > 0) {
        var fieldNames = [];
        for (var j = 0; j < emptyFields.length; j++) {
            fieldNames.push(emptyFields[j].id);
        }
        errorArea.textContent = "The following fields can't be empty: " + fieldNames.join(", ") + ".";
        errorArea.className = "visible";
        emptyFields[0].focus();
    }
}

