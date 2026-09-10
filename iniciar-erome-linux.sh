#!/usr/bin/env bash
set -e

finish() {
  status=$?
  echo
  if [ "$status" -ne 0 ]; then
    echo "Não foi possível iniciar o Erome Downloader."
    echo "Leia a mensagem acima para identificar o problema."
  else
    echo "Erome Downloader encerrado."
  fi
  read -r -p "Pressione Enter para fechar esta janela..." _
}

trap finish EXIT

cd "$(dirname "$0")"

if ! command -v python3 >/dev/null 2>&1; then
  echo "Python 3 não foi encontrado. Instale Python 3 e tente novamente."
  exit 1
fi

if [ ! -x ".venv/bin/erome-web" ]; then
  echo "Configurando o aplicativo pela primeira vez..."
  if [ ! -d ".venv" ]; then
    python3 -m venv .venv
  fi
  .venv/bin/pip install -r requirements.txt
  .venv/bin/pip install -e .
fi

echo "Erome Downloader iniciado. Deixe esta janela aberta."
./.venv/bin/erome-web