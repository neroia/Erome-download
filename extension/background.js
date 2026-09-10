chrome.action.onClicked.addListener(async (tab) => {
    if (!tab.id || !tab.url?.startsWith("https://www.erome.com/")) {
        return;
    }

    try {
        await chrome.tabs.sendMessage(tab.id, { type: "toggle-sidebar" });
    } catch {
        try {
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["content.js"]
            });
            await chrome.tabs.sendMessage(tab.id, { type: "toggle-sidebar" });
        } catch {
            console.warn("Não foi possível abrir o Erome Downloader nesta página.");
        }
    }
});