import { initSearch, hideSearchResults } from "./search";

document.addEventListener("DOMContentLoaded", function(event) {
    initBarba();
    initSearch();
});

function initBarba() {
    Barba.Pjax.start();
    Barba.Prefetch.init();
    Barba.Dispatcher.on("newPageReady", function(currentStatus, oldStatus, container) {
        delete window.pageReady;
        hideSearchResults(true);
        scrollToTop();
        closeSidebar();

        const js = container.querySelector("script");
        if (js === null) {
            return;
        }

        // eslint-disable-next-line no-eval
        eval(js.innerHTML);

        if (typeof pageReady === "function") {
            pageReady(container);
        }
    });

    if (typeof pageReady === "function") {
        pageReady(document);
    }
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function closeSidebar() {
    document.getElementById("docs-sidebar-toggle").checked = false;
}

// hide sidebar on click outside
document.addEventListener("click", function(e) {
    if (e.x <= 260) {
        return;
    }

    document.getElementById("docs-sidebar-toggle").checked = false;
});

export { closeSidebar };
