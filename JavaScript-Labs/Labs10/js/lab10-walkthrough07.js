function removePreview() {
    $(this).removeClass("gray");
    $("#preview").remove();
}

function movePreview(event) {
    $("#preview")
        .css("top", event.pageY - 10 + "px")
        .css("left", event.pageX + 30 + "px");
}

$(function () {
    $("figure img")
        .on("mouseover", function (event) {
            var source = $(this).attr("src");
            var alt = $(this).attr("alt");
            var previewImage = $("<img>")
                .attr("src", source.replace("/small/", "/medium/"))
                .attr("alt", alt);
            var preview = $("<div>", { id: "preview" });

            preview.append(previewImage, $("<p>").text(alt));
            $("body").append(preview);
            $(this).addClass("gray");
            movePreview(event);
            preview.fadeIn(1000);
        })
        .on("mousemove", movePreview)
        .on("mouseleave", removePreview);
});

