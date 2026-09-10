function sendToggleMessage(tabId) {
    chrome.tabs.sendMessage(tabId, { type: "toggle-sidebar" }, () => {
        if (!chrome.runtime.lastError) {
            return;
        }

        chrome.scripting.executeScript(
            { target: { tabId }, files: ["content.js"] },
            () => {
                if (chrome.runtime.lastError) {
                    console.warn("Não foi possível abrir o Erome Downloader nesta página.");
                    return;
                }

                chrome.tabs.sendMessage(tabId, { type: "toggle-sidebar" }, () => {
                    if (chrome.runtime.lastError) {
                        console.warn("Não foi possível abrir o Erome Downloader nesta página.");
                    }
                });
            }
        );
    });
}

chrome.action.onClicked.addListener((tab) => {
    if (!tab.id || !tab.url?.startsWith("https://www.erome.com/")) {
        return;
    }
    sendToggleMessage(tab.id);
});