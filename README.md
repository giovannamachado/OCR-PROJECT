# OCR Project - Processamento de Boletos com OCR e GPT

Este projeto realiza o **upload de boletos**, processa o texto usando **OCR (Tesseract.js)** e permite ao usuário realizar perguntas relacionadas ao conteúdo extraído utilizando um modelo de **LLM (GPT)**. Ele também fornece funcionalidades para baixar o conteúdo extraído e listar os documentos carregados.

---

## 🚀 Funcionalidades

1. **Upload de boletos** com extração de texto via OCR.
2. **Interação com GPT** para perguntas baseadas no texto extraído.
3. Download do conteúdo extraído do boleto em formato `.txt`.
4. Listagem de documentos carregados com informações detalhadas.

---

## 🛠️ Tecnologias Utilizadas

- **NestJS** - Framework backend para construção de APIs.
- **Tesseract.js** - Biblioteca de OCR para extração de texto.
- **Express** - Middleware para rotas HTTP.
- **TypeScript** - Tipagem estática.
- **Multer** - Middleware para upload de arquivos.
- **Node.js** - Ambiente de execução.

---

## 📝 Pré-requisitos

Antes de iniciar, certifique-se de ter os seguintes itens instalados:

1. **Node.js** - Versão 18 ou superior.
2. **npm** - Gerenciador de pacotes.
3. **Git** - Para clonar o repositório.

---

## 📦 Instalação e Configuração

### 1. Clonar o Repositório


git clone https://github.com/giovannamachado/OCR-Project
cd seu-repositorio

### 2. Instalar Dependências

Dentro da pasta do projeto, execute o comando abaixo para instalar todas as dependências necessárias:
** npm install**

### 3. Configuração do Ambiente

Crie um arquivo .env na raiz do projeto para configurar as variáveis de ambiente necessárias. Aqui está um exemplo de como deve ser o conteúdo do arquivo .env:


1. PORT=3000
2. GPT_API_KEY=your-gpt-api-key
3. TESSERACT_PATH=/path/to/tesseract
- PORT: Define a porta na qual o servidor backend estará escutando.
- GPT_API_KEY: Sua chave de API para interagir com o GPT.
- TESSERACT_PATH: Caminho para o executável do Tesseract no seu sistema.

### 4. Iniciar o Servidor
Na pasta Backend, rode: 

**npm run start**

### Para rodar o frontend do projeto localmente, siga as etapas abaixo:

npm install

Vá até a pasta do Frontend e no terminal execute:

**npm run start**










