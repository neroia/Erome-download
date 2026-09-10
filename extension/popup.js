const API = "http://127.0.0.1:8765/api";
const form = document.querySelector("#download-form");
const status = document.querySelector("#status");
const start = document.querySelector("#start");
const connections = document.querySelector("#connections");
const connectionsValue = document.querySelector("#connections-value");
const progressBar = document.querySelector("#progress-bar");
const progressLabel = document.querySelector("#progress-label");
const filesLabel = document.querySelector("#files-label");
const urlInput = document.querySelector("#url");
const useCurrentPage = document.querySelector("#use-current-page");
const pageUrl = new URLSearchParams(window.location.search).get("pageUrl") || "";

useCurrentPage.addEventListener("change", () => {
    if (useCurrentPage.checked && pageUrl) {
        urlInput.value = pageUrl;
    }
});

connections.addEventListener("input", () => { connectionsValue.textContent = connections.value; });

function showStatus(message, kind = "idle") {
    status.textContent = message;
    status.dataset.kind = kind;
}

async function refreshStatus() {
    try {
        const response = await fetch(`${API}/status`);
        const data = await response.json();
        const kind = data.status === "error" ? "error" : data.status === "completed" ? "success" : "idle";
        showStatus(data.message, kind);
        const progress = Math.round(data.progress || 0);
        progressBar.style.width = `${progress}%`;
        progressLabel.textContent = `${progress}%`;
        filesLabel.textContent = `${data.completed || 0}/${data.total || 0} arquivos`;
        start.disabled = data.status === "downloading";
    } catch {
        showStatus("Abra o servidor local antes de usar a extensão.", "error");
        start.disabled = false;
    }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    start.disabled = true;
    showStatus("Iniciando download...");
    try {
        const response = await fetch(`${API}/start`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                url: urlInput.value,
                connections: Number(connections.value),
                skipVideos: document.querySelector("#skip-videos").checked,
                skipImages: document.querySelector("#skip-images").checked
            })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Não foi possível iniciar.");
        showStatus("Download em andamento...");
    } catch (error) {
        showStatus(error.message, "error");
        start.disabled = false;
    }
});

refreshStatus();
setInterval(refreshStatus, 2000);