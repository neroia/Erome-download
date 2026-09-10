const SIDEBAR_ID = "erome-downloader-sidebar";
const CONTENT_ID = "erome-downloader-page-content";
const PAGE_CLASS = "erome-downloader-page-open";
const STYLE_ID = "erome-downloader-sidebar-style";

function addSidebarStyle() {
    if (document.getElementById(STYLE_ID)) {
        return;
    }
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
        #${SIDEBAR_ID} {
            position: fixed !important;
            top: 0 !important;
            right: 0 !important;
            width: 380px !important;
            height: 100vh !important;
            min-height: 100vh !important;
            z-index: 2147483647 !important;
            border-left: 1px solid #454045 !important;
            background: #262626 !important;
            box-shadow: -5px 0 20px rgba(0, 0, 0, .35) !important;
        }
        html.${PAGE_CLASS} body {
            width: calc(100% - 380px) !important;
            max-width: calc(100% - 380px) !important;
            margin-right: 380px !important;
        }
        html.${PAGE_CLASS} #${CONTENT_ID} {
            width: 100% !important;
            min-width: 0 !important;
        }
        #${SIDEBAR_ID} iframe {
            display: block !important;
            width: 100% !important;
            height: 100% !important;
            border: 0 !important;
        }
    `;
    document.documentElement.appendChild(style);
}

function openSidebar() {
    if (document.getElementById(SIDEBAR_ID)) {
        return;
    }

    const content = document.createElement("div");
    content.id = CONTENT_ID;
    while (document.body.firstChild) {
        content.appendChild(document.body.firstChild);
    }
    document.body.appendChild(content);

    const sidebar = document.createElement("aside");
    addSidebarStyle();
    sidebar.id = SIDEBAR_ID;
    sidebar.setAttribute("aria-label", "Erome Downloader");
    const frame = document.createElement("iframe");
    frame.title = "Erome Downloader";
    const pageUrl = new URL(location.href);
    const albumUrl = pageUrl.pathname.startsWith("/a/")
        ? `${pageUrl.origin}${pageUrl.pathname}`
        : "";
    frame.src = `${chrome.runtime.getURL("popup.html")}?pageUrl=${encodeURIComponent(albumUrl)}`;
    sidebar.appendChild(frame);
    document.body.appendChild(sidebar);
    document.documentElement.classList.add(PAGE_CLASS);
}

function closeSidebar() {
    const current = document.getElementById(SIDEBAR_ID);
    if (!current) {
        return;
    }

    const content = document.getElementById(CONTENT_ID);
    while (content.firstChild) {
        document.body.insertBefore(content.firstChild, current);
    }
    content.remove();
    current.remove();
    document.documentElement.classList.remove(PAGE_CLASS);
}

function toggleSidebar() {
    const isOpen = Boolean(document.getElementById(SIDEBAR_ID));
    if (isOpen) {
        closeSidebar();
    } else {
        openSidebar();
    }
    chrome.storage.local.set({ sidebarEnabled: !isOpen });
}

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "toggle-sidebar") {
        toggleSidebar();
    }
});

chrome.storage.local.get("sidebarEnabled", ({ sidebarEnabled }) => {
    if (sidebarEnabled) {
        openSidebar();
    }
});