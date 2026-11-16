$(function () {
    $(".animLoading").hide();

    $("#consume").on("click", function () {
        var url = "http://www.randyconnolly.com/funwebdev/services/travel/cities.php";
        $("#results").html("<ul></ul>");

        $(".animLoading").show();
        $.get(url)
            .done(function (data) {
                $.each(data, function (index, city) {
                    var item = $("<li>").text(city.name);
                    item.appendTo("#results ul");
                });
            })
            .fail(function (request, status, error) {
                var message = "failed loading data - status=" + status
                    + " error=" + error;
                alert(message);
            })
            .always(function () {
                $(".animLoading").fadeOut("slow");
            });
    });
});