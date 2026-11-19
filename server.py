import os
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


ROOT = Path(__file__).resolve().parent
PORT = int(os.environ.get("PORT", "8080"))
handler = partial(SimpleHTTPRequestHandler, directory=str(ROOT))


if __name__ == "__main__":
    with ThreadingHTTPServer(("0.0.0.0", PORT), handler) as server:
        print(f"Serving manga reader on port {PORT}", flush=True)
        server.serve_forever()
