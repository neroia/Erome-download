@echo off
cd /d "%~dp0"

if not exist ".venv\Scripts\python.exe" (
    echo Configurando o aplicativo pela primeira vez...
    py -m venv .venv
    .venv\Scripts\python.exe -m pip install -r requirements.txt
    .venv\Scripts\python.exe -m pip install -e .
)

echo Erome Downloader iniciado. Deixe esta janela aberta.
.venv\Scripts\erome-web.exe
pause