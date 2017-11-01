function openSidebar() {
    document.getElementById("docs-sidebar").classList.add("docs-sidebar--open");
}

function closeSidebar() {
    document.getElementById("docs-sidebar").classList.remove("docs-sidebar--open");
}

function initSidebar() {
    document.getElementById("docs-menu-toggle").addEventListener("click", function(e) {
        if (document.getElementById("docs-sidebar").classList.contains("docs-sidebar--open")) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    // hide sidebar on click outside
    document.addEventListener("click", function(e) {
        if (e.x <= 260) {
            return;
        }

        closeSidebar();
    });
}

export { initSidebar, openSidebar, closeSidebar };
