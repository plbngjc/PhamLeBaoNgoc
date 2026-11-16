function renderList(listId, items, activeItem) {
    var list = document.getElementById(listId);

    items.forEach(function (item) {
        var listItem = document.createElement("li");
        listItem.className = "list-group-item";

        if (item === activeItem) {
            listItem.classList.add("active");
            listItem.setAttribute("aria-current", "true");
            listItem.textContent = item;
        } else {
            var link = document.createElement("a");
            link.href = "#";
            link.textContent = item;
            listItem.appendChild(link);
        }

        list.appendChild(listItem);
    });
}

function renderPost(post) {
    var row = document.createElement("div");
    row.className = "row";

    var imageColumn = document.createElement("div");
    imageColumn.className = "col-md-2";

    var imageLink = document.createElement("a");
    imageLink.href = "post.php?id=" + encodeURIComponent(post.id);

    var image = document.createElement("img");
    image.src = "images/travel/" + post.thumb;
    image.alt = post.title;
    image.className = "img-thumbnail";
    imageLink.appendChild(image);
    imageColumn.appendChild(imageLink);

    var contentColumn = document.createElement("div");
    contentColumn.className = "col-md-10";

    var title = document.createElement("h2");
    title.textContent = post.title;
    contentColumn.appendChild(title);

    var details = document.createElement("div");
    details.className = "details";
    details.appendChild(document.createTextNode("Posted by " + post.user));

    var date = document.createElement("span");
    date.className = "pull-right";
    date.textContent = post.postdate;
    details.appendChild(date);
    contentColumn.appendChild(details);

    var excerpt = document.createElement("p");
    excerpt.className = "excerpt";
    excerpt.textContent = post.excerpt;
    contentColumn.appendChild(excerpt);

    var readMore = document.createElement("a");
    readMore.href = "post.php?id=" + encodeURIComponent(post.id);
    readMore.className = "btn btn-primary btn-sm";
    readMore.textContent = "Read more";
    contentColumn.appendChild(readMore);

    row.appendChild(imageColumn);
    row.appendChild(contentColumn);
    return row;
}

function renderPagination(listId, pageCount, currentPage) {
    var list = document.getElementById(listId);

    function addPage(label, page, options) {
        var item = document.createElement("li");
        var link = document.createElement("a");
        link.href = "#";
        link.textContent = label;

        if (options && options.label) {
            link.setAttribute("aria-label", options.label);
        }
        if (page === currentPage) {
            item.className = "active";
            link.setAttribute("aria-current", "page");
        }

        item.appendChild(link);
        list.appendChild(item);
    }

    addPage("\u00ab", currentPage - 1, { label: "Previous page" });
    for (var page = 1; page <= pageCount; page++) {
        addPage(String(page), page);
    }
    addPage("\u00bb", currentPage + 1, { label: "Next page" });
}

document.addEventListener("DOMContentLoaded", function () {
    renderList("continentList", continents);
    renderList("countryList", countries, "Canada");

    var postList = document.getElementById("postList");
    posts.forEach(function (post, index) {
        postList.appendChild(renderPost(post));
        if (index < posts.length - 1) {
            postList.appendChild(document.createElement("hr"));
        }
    });

    renderPagination("pagination", 9, 4);
});
