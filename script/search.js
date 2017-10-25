import { closeSidebar } from "./script";

let searchIndex = null;
let searchFiles = null;

function initSearch() {
    loadSearchIndex();
    initHandlers();
}

function initHandlers() {
    // focus search box on icon click
    document.getElementById("docs-search-area-toggle").addEventListener("click", function(e) {
        focusSearchBox();
    });

    // search close button
    document.getElementById("docs-search-close").addEventListener("click", function(e) {
        e.preventDefault();
        hideSearchResults(true);
        clearSearchBox();
    });

    // search on input change
    document.getElementById("docs-search-box").addEventListener("input", function(e) {
        search(document.getElementById("docs-search-box").value);
    });

    // search on enter
    document.getElementById("docs-search-box").addEventListener("keydown", function(e) {
        const charCode = e.which || e.keyCode;
        const key = e.key;

        if (key === "Enter" || charCode === "13") {
            search(document.getElementById("docs-search-box").value);
        }
    });

    // hide search results on esc key
    document.addEventListener("keydown", function(e) {
        const charCode = e.which || e.keyCode;
        const key = e.key;

        if (key === "Escape" || charCode === "27") {
            hideSearchResults(true);
            clearSearchBox();
        }
    });

    // hide search results on click outside
    document.addEventListener("click", function(e) {
        if (e.path.includes(document.getElementById("docs-search"))) {
            return;
        }
        if (e.path.includes(document.getElementById("docs-search-box"))) {
            return;
        }
        if (e.path.includes(document.getElementById("docs-search-area-toggle"))) {
            return;
        }
        hideSearchResults(true);
    });
}


function loadSearchIndex() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const index = JSON.parse(this.responseText);
            searchIndex = lunr.Index.load(index);
            searchFiles = index.files;
        }
    };
    xhttp.open("GET", document.getElementById("searchIndex").getAttribute("href"), true);
    xhttp.send();
}

function search(text) {
    if (searchIndex === null || text === "") {
        hideSearchResults(false);
        return;
    }
    closeSidebar();

    const results = searchIndex.search(text);
    document.getElementById("docs-search-results").innerHTML = "";

    if (results.length < 1) {
        const result = document.createElement("li");
        result.innerHTML = "<h2>No results for <em></em><small> (search requires whole words)</small></h2>";
        result.querySelector("em").appendChild(document.createTextNode(text));

        document.getElementById("docs-search-results").appendChild(result);
    }

    let i = 1;
    for (const key in results) {
        i++;
        const result = document.createElement("li");
        result.className = "docs-search-result";

        const resultLink = document.createElement("a");
        resultLink.setAttribute("href", results[key].ref);
        resultLink.setAttribute("tabindex", i);
        resultLink.innerHTML = searchFiles[results[key].ref].title;
        result.appendChild(resultLink);

        const details = document.createElement("p");
        details.className = "docs-search-result__details";

        if (typeof searchFiles[results[key].ref].description === "string") {
            details.innerHTML = searchFiles[results[key].ref].description;
        }

        result.appendChild(details);
        document.getElementById("docs-search-results").appendChild(result);
    }
    showSearchResults();
}

function showSearchResults() {
    document.getElementById("docs-search").style.display = "block";
    document.getElementById("docs-search-close").style.opacity = "1";
    document.getElementById("docs-search-close").style.pointerEvents = "auto";
    document.getElementById("docs-search-area-toggle").checked = true;
}

function hideSearchResults(hideInputBox) {
    document.getElementById("docs-search").style.display = "none";
    document.getElementById("docs-search-close").style.opacity = "0";
    document.getElementById("docs-search-close").style.pointerEvents = "none";

    if (hideInputBox) {
        document.getElementById("docs-search-area-toggle").checked = false;
    }
}


function focusSearchBox() {
    document.getElementById("docs-search-box").focus();
}

function clearSearchBox() {
    document.getElementById("docs-search-box").value = "";
}

export { initSearch, hideSearchResults };
