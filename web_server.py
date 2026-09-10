"""Local web API used by the browser extension."""

import asyncio
import json
import signal
import threading
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from types import SimpleNamespace
from urllib.parse import urlparse

import dump

HOST = "127.0.0.1"
PORT = 8765

_state_lock = threading.Lock()
_state = {
    "status": "idle",
    "message": "Pronto para baixar um álbum.",
    "stats": None,
    "progress": 0,
    "completed": 0,
    "total": 0,
}


def _set_state(**changes: object) -> None:
    with _state_lock:
        _state.update(changes)


def _get_state() -> dict[str, object]:
    with _state_lock:
        return dict(_state)


def _download_in_background(url: str, options: dict[str, object]) -> None:
    try:
        args = SimpleNamespace(
            connections=int(options.get("connections", 5)),
            skip_videos=bool(options.get("skipVideos", False)),
            skip_images=bool(options.get("skipImages", False)),
            retries=int(options.get("retries", 3)),
        )
        _set_state(
            status="downloading",
            message="Baixando o álbum...",
            stats=None,
            progress=0,
            completed=0,
            total=0,
        )

        def update_progress(completed: int, total: int) -> None:
            percentage = completed / total * 100 if total else 100
            _set_state(
                message=f"Baixando... {percentage:.0f}% ({completed}/{total} arquivos)",
                progress=percentage,
                completed=completed,
                total=total,
            )

        asyncio.run(dump._run([url], args, progress_callback=update_progress))
        _set_state(
            status="completed",
            message="Download concluído. Veja Vídeos/EromeDownload.",
            progress=100,
        )
    except Exception as error:
        _set_state(status="error", message=str(error))


class RequestHandler(BaseHTTPRequestHandler):
    """Small JSON API with no external web framework dependency."""

    def _send_json(self, payload: dict[str, object], status: int = HTTPStatus.OK) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self) -> None:
        self.send_response(HTTPStatus.NO_CONTENT)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.end_headers()

    def do_GET(self) -> None:
        if self.path == "/api/health":
            self._send_json({"ok": True})
            return
        if self.path == "/api/status":
            self._send_json(_get_state())
            return
        self._send_json({"error": "Endpoint não encontrado."}, HTTPStatus.NOT_FOUND)

    def do_POST(self) -> None:
        if self.path != "/api/start":
            self._send_json({"error": "Endpoint não encontrado."}, HTTPStatus.NOT_FOUND)
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
            data = json.loads(self.rfile.read(length))
            url = str(data.get("url", "")).strip()
            parsed = urlparse(url)
            if parsed.scheme not in {"http", "https"} or parsed.hostname != dump.HOST:
                raise ValueError(f"Use uma URL do domínio {dump.HOST}.")
            if _get_state()["status"] == "downloading":
                self._send_json({"error": "Já existe um download em andamento."}, HTTPStatus.CONFLICT)
                return
            options = {
                "connections": max(1, min(int(data.get("connections", 5)), 20)),
                "retries": max(0, min(int(data.get("retries", 3)), 10)),
                "skipVideos": bool(data.get("skipVideos", False)),
                "skipImages": bool(data.get("skipImages", False)),
            }
        except (ValueError, TypeError, json.JSONDecodeError) as error:
            self._send_json({"error": str(error)}, HTTPStatus.BAD_REQUEST)
            return
        thread = threading.Thread(target=_download_in_background, args=(url, options), daemon=True)
        thread.start()
        self._send_json({"ok": True}, HTTPStatus.ACCEPTED)

    def log_message(self, format: str, *args: object) -> None:
        return


def serve(host: str = HOST, port: int = PORT) -> None:
    try:
        server = ThreadingHTTPServer((host, port), RequestHandler)
    except OSError as error:
        if error.errno == 98:
            print(f"O Erome Downloader já está aberto em http://{host}:{port}.")
            print("Você pode fechar esta janela; não é necessário iniciar outro.")
            return
        raise

    def stop_server(signum: int, frame: object) -> None:
        raise KeyboardInterrupt

    signal.signal(signal.SIGINT, stop_server)
    signal.signal(signal.SIGTERM, stop_server)
    if hasattr(signal, "SIGHUP"):
        signal.signal(signal.SIGHUP, stop_server)

    print(f"Erome Downloader pronto em http://{host}:{port}")
    print("Deixe esta janela aberta enquanto usar a extensão.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor encerrado.")
    finally:
        server.server_close()


if __name__ == "__main__":
    serve()