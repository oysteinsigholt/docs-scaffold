function updateSidebar() {
    const sidebarNodes = document.querySelectorAll(".docs-nav .docs-nav__li");

    const openNodes = document.querySelectorAll(".docs-nav__ul--open");

    Array.from(openNodes).forEach(function(node) {
        node.classList.remove("docs-nav__ul--open");
    });

    Array.from(sidebarNodes).forEach(function(li) {
        const item = li.querySelector(".docs-nav__item");
        if (item.href === location.href) {
            li.classList.add("docs-nav__li--active");

            let parent = li.parentElement;
            while (parent) {
                if (parent.classList.contains("docs-nav__ul")) {
                    parent.classList.add("docs-nav__ul--open");
                    parent = parent.parentElement.parentElement;
                } else {
                    break;
                }
            }

            parent.classList.add("docs-nav__ul--open");

            let child = li.querySelector(".docs-nav__ul");
            if (child) {
                child.classList.add("docs-nav__ul--open");
            }
        } else {
            li.classList.remove("docs-nav__li--active");
        }
    });
}

export { updateSidebar };
