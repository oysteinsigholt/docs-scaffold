import { initSearch, hideSearchResults } from "./search";
import { updateSidebar } from "./navigation";

document.addEventListener("DOMContentLoaded", function(event) {
    initBarba();
    initSearch();
    updateSidebar();
});

function initBarba() {
    Barba.Pjax.start();
    Barba.Prefetch.init();
    Barba.Dispatcher.on("newPageReady", function(currentStatus, oldStatus, container) {
        delete window.pageReady;
        hideSearchResults();
        updateSidebar();

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
