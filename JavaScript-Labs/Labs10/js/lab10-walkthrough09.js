$(function () {
    $("#consume").on("click", function () {
        var url = "http://www.randyconnolly.com/funwebdev/services/travel/cities.php";
        $("#results").html("<ul></ul>");

        $.get(url, function (data, status) {
            if (status === "success") {
                $.each(data, function (index, city) {
                    var item = $("<li>").text(city.name);
                    item.appendTo("#results ul");
                });
            }
        }).fail(function (request, status, error) {
            $("#results").text("Could not load cities: " + (error || status));
        });
    });
});