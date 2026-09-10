# 📥 Erome-download

> Extensão para **Chrome** e **Chromium** que adiciona um painel lateral de download às páginas do Erome, permitindo baixar álbuns completos com um clique.

<p align="center">
  <img src=".github/img.png" alt="Erome-download em funcionamento" width="600">
</p>

Os arquivos são salvos automaticamente em:

```text
Vídeos/EromeDownload/Nome do álbum/
```

---

## 📋 Requisitos

- Navegador **Chrome** ou **Chromium** (com suporte a extensões não compactadas)
- **Git** (opcional, apenas para clonar o repositório)

---

## 📦 Baixando o projeto

### Opção 1 — Baixar como ZIP

1. Acesse o repositório: [github.com/neroia/Erome-download](https://github.com/neroia/Erome-download)
2. Clique no botão **Code**
3. Clique em **Download ZIP**
4. Extraia o arquivo em uma pasta do computador

### Opção 2 — Clonar com Git

```bash
git clone https://github.com/neroia/Erome-download.git
cd Erome-download
```

Após baixar ou clonar o projeto, siga as etapas de instalação abaixo.

---

## 🧩 Instalação da extensão

> Esta etapa é feita apenas **uma vez**.

1. Abra `chrome://extensions` no navegador
2. Ative o **Modo do desenvolvedor** (canto superior direito)
3. Clique em **Carregar sem compactação**
4. Selecione a pasta `extension/` deste projeto

---

## ▶️ Iniciando o servidor local

A extensão depende de um servidor local para gerenciar os downloads. Escolha o guia correspondente ao seu sistema operacional.

<details>
<summary><strong>🪟 Windows</strong></summary>

1. Abra a pasta do projeto
2. Dê duplo clique em `iniciar-erome-windows.bat`
3. Mantenha a janela aberta enquanto estiver baixando

> Na primeira execução, o script configura automaticamente o ambiente e instala as dependências necessárias.

</details>

<details>
<summary><strong>🐧 Linux</strong></summary>

Abra um terminal na pasta do projeto e execute:

```bash
chmod +x iniciar-erome-linux.sh
./iniciar-erome-linux.sh
```

Mantenha o terminal aberto durante o download. Para encerrar, pressione `Ctrl+C` — o servidor será finalizado e a porta liberada automaticamente.

</details>

---

## 🚀 Como usar

1. Abra um álbum no Erome, no formato:

   ```text
   https://www.erome.com/a/xxxxxxxx
   ```

2. Clique no ícone **Erome Downloader** na barra do navegador
3. O painel será exibido integrado à lateral direita da página
4. Marque **Usar automaticamente o link desta página** para preencher o link atual sem copiar e colar
5. *(Opcional)* Marque **Não baixar vídeos** ou **Não baixar imagens** conforme sua necessidade
6. Clique em **Baixar álbum**

Durante o processo, a extensão exibe o progresso em tempo real:

```text
75%
6/8 arquivos
```

> 💡 O painel lateral permanece disponível ao trocar de aba do Erome. Para fechá-lo, basta clicar novamente no ícone da extensão.

---

## 📝 Observações

| | |
|---|---|
| 🖥️ | O servidor local precisa estar aberto durante o download |
| 🔗 | A extensão aceita apenas links de álbuns do domínio `www.erome.com` |
| 📁 | Cada álbum é salvo em uma pasta própria dentro de `Vídeos/EromeDownload/` |

---

## 🙏 Créditos

Este projeto é baseado no repositório original [M4p4/EromeDownloader](https://github.com/M4p4/EromeDownloader). Créditos ao autor pela base do projeto.

---

<p align="center">
  <sub>Feito para facilitar o download de álbuns do Erome de forma simples e organizada.</sub>
</p>