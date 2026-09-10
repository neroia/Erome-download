# Erome Downloader

Extensão para Chrome e Chromium que adiciona um downloader na lateral das
páginas do Erome.

Os arquivos são salvos automaticamente em:

```text
Vídeos/EromeDownload/Nome do álbum/
```

## Baixar o projeto

### Opção 1: baixar como ZIP

1. Abra o repositório no GitHub:
   [github.com/neroia/Erome-download](https://github.com/neroia/Erome-download)
2. Clique no botão **Code**.
3. Clique em **Download ZIP**.
4. Extraia o arquivo ZIP em uma pasta do computador.

### Opção 2: clonar com Git

Se o Git estiver instalado, execute:

```bash
git clone https://github.com/neroia/Erome-download.git
cd Erome-download
```

Depois de baixar ou clonar, siga as instruções de instalação da extensão e
inicialização do sistema abaixo.

## Instalação da extensão

Essa etapa precisa ser feita apenas uma vez:

1. Abra `chrome://extensions` no Chrome ou Chromium.
2. Ative **Modo do desenvolvedor**.
3. Clique em **Carregar sem compactação**.
4. Selecione a pasta `extension/` deste projeto.

## Iniciar no Windows

1. Abra a pasta do projeto.
2. Dê duplo clique em `iniciar-erome-windows.bat`.
3. Deixe a janela aberta enquanto estiver baixando.

Na primeira execução, o arquivo configura automaticamente o ambiente e instala
as dependências necessárias.

## Iniciar no Linux

Abra um terminal na pasta do projeto e execute:

```bash
chmod +x iniciar-erome-linux.sh
./iniciar-erome-linux.sh
```

Deixe o terminal aberto durante o download. Para encerrar o programa, pressione
`Ctrl+C`. O servidor será encerrado e a porta será liberada automaticamente.

## Como usar

1. Abra um álbum no Erome, neste formato:

   ```text
   https://www.erome.com/a/xxxxxxxx
   ```

2. Clique no ícone **Erome Downloader** do navegador.
3. A extensão aparecerá integrada na lateral direita da página.
4. Marque **Usar automaticamente o link desta página** para preencher o link
   atual sem copiar e colar.
5. Opcionalmente, marque **Não baixar vídeos** ou **Não baixar imagens**.
6. Clique em **Baixar álbum**.

Durante o download, a extensão mostra a porcentagem e a quantidade de arquivos,
por exemplo:

```text
75%
6/8 arquivos
```

A lateral continua disponível ao trocar de aba do Erome. Para fechá-la, clique
novamente no ícone da extensão.

## Observações

- O servidor local precisa estar aberto durante o download.
- A extensão aceita somente links de álbuns do domínio `www.erome.com`.
- Cada álbum é salvo em uma pasta própria dentro de `Vídeos/EromeDownload/`.
