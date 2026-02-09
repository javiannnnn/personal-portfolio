"""
Portfolio Local Server
Run: python app.py
Open: http://localhost:8000
"""

import http.server
import socketserver
import webbrowser
import os
import shutil

PORT = 8000
BASE = os.path.dirname(os.path.abspath(__file__))
os.chdir(BASE)

# Auto-fix folder structure if files are flat
PROJECT_FILES = [
    "stock-predictor.html",
    "sentiment-analysis.html",
    "bridgegen.html",
    "sustainability-dashboard.html",
    "rl-trading.html",
]

projects_dir = os.path.join(BASE, "projects")
if not os.path.isdir(projects_dir):
    flat_files = [f for f in PROJECT_FILES if os.path.isfile(os.path.join(BASE, f))]
    if flat_files:
        os.makedirs(projects_dir, exist_ok=True)
        for f in flat_files:
            shutil.move(os.path.join(BASE, f), os.path.join(projects_dir, f))
        print(f"  Moved {len(flat_files)} project files into projects/ subfolder.")

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"\n  Portfolio running at http://localhost:{PORT}")
    print(f"  Press Ctrl+C to stop\n")
    webbrowser.open(f"http://localhost:{PORT}")
    httpd.serve_forever()
