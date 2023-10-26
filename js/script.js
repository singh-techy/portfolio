$(document).ready(function () {

    var pageUrls = {
        "home": "/portfolio/index.html #content-container",
        "education": "/portfolio/education.html",
        "projects": "/portfolio/projects.html",
        "contact": "/portfolio/contact.html",
    };

    function loadContentAndHandleHistory(page, addToHistory) {
        if (pageUrls[page]) {
            if (addToHistory) {
                history.pushState({ page: page }, null, "/portfolio/");
            }
            $("#content-container").load(pageUrls[page], function (response, status, xhr) {
                if (page == 'projects' && document.getElementById("dark-mode-toggle").textContent == 'Light Mode') {
                    const imageContainers = document.querySelectorAll(".image-container");
                    imageContainers.forEach(function (container) {
                        container.classList.toggle("dark-mode-img");
                    });
                }
                if (page == 'home') {
                    var typed = new Typed('#auto-type', {
                        strings: ["Hi, I'm Ayush Singh"],
                        typeSpeed: 50,
                    });
                }
                if (status == "error") {
                    $("#content-container").html("Page not found");
                }
            });
            $(".navbar-collapse").collapse("hide");
            $(".nav-link").removeClass("active");
            $("nav a[data-page='" + page + "']").addClass("active");
        } else {
            console.log("Page URL not defined.");
        }
    }
    
    function handleInitialLoad() {     
        var initialPage = getInitialPageFromURL();
        if (initialPage) {
            loadContentAndHandleHistory(initialPage, false);
        } else {
            loadContentAndHandleHistory("home", false);
        }
    }
    history.replaceState({ page: "home" }, null, "/portfolio");
    
    $("nav a").click(function (event) {
        var page = $(this).data("page");

        loadContentAndHandleHistory(page, true);

        if ($(this).hasClass("download-link")) {
            var confirmDownload = window.confirm("Do you want to download the resume?");
            if (!confirmDownload) {
                event.preventDefault();
            }
            $(".navbar-collapse").collapse("hide");
            $(".nav-link").removeClass("active");
            $(this).addClass("active");
        } else {
            event.preventDefault();
        }
    });

    window.onpopstate = function (event) {
        if (event.state) {
            loadContentAndHandleHistory(event.state.page, false);
        }
    };

    document.getElementById("dark-mode-toggle").addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        const button = document.getElementById("dark-mode-toggle");
        if (button.textContent === "Dark Mode") {
            button.textContent = "Light Mode";
            button.classList.remove("btn-outline-danger");
            button.classList.add("btn-danger");
        } else {
            button.textContent = "Dark Mode";
            button.classList.remove("btn-danger");
            button.classList.add("btn-outline-danger");
        }
        const imageContainers = document.querySelectorAll(".image-container");
        imageContainers.forEach(function (container) {
            container.classList.toggle("dark-mode-img");
        });
        $(".navbar-collapse").collapse("hide");
    });
    var typed = new Typed('#auto-type', {
        strings: ["Hi, I'm Ayush Singh"],
        typeSpeed: 50,
      });
    handleInitialLoad();
});
