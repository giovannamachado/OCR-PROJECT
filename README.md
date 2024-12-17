# OCR Project - Processamento de Boletos com OCR e GPT

Este projeto realiza o **upload de boletos**, processa o texto usando **OCR (Tesseract.js)** e permite ao usuário fazer perguntas sobre o conteúdo extraído com um modelo de **LLM (GPT)**. Também oferece funcionalidades para baixar o conteúdo extraído e listar os documentos carregados.

---

## 🚀 Funcionalidades

- **📑 Upload de boletos** com extração de texto via OCR.
- **🤖 Interação com GPT** para perguntas baseadas no texto extraído.
- **⬇️ Download do conteúdo extraído** do boleto em formato `.txt`.
- **📋 Listagem de documentos carregados** com informações detalhadas.

---

## 🛠️ Tecnologias Utilizadas

- **NestJS**: Framework backend para construção de APIs.
- **Tesseract.js**: Biblioteca de OCR para extração de texto.
- **Express**: Middleware para rotas HTTP.
- **TypeScript**: Tipagem estática.
- **Multer**: Middleware para upload de arquivos.
- **Node.js**: Ambiente de execução.

---

## 📝 Pré-requisitos

Antes de iniciar, certifique-se de ter os seguintes itens instalados:

- **Node.js** (Versão 18 ou superior)
- **npm** (Gerenciador de pacotes)
- **Git** (Para clonar o repositório)

---

## 📦 Instalação e Configuração

### 1. Clone o Repositório

Clone o repositório para sua máquina:

```bash
git clone https://github.com/giovannamachado/OCR-Project.git
```

### 2. Instale Dependências

Dentro da pasta raiz do projeto (**./OCR-Project/**), execute o comando para instalar as dependências principais do projeto:

```bash
npm install
```

Em seguida, navegue para as pastas do backend e frontend para instalar as dependências específicas de cada parte:

- **Backend**: Navegue até o diretório do backend (**./OCR-Project/backend/**) e instale as dependências necessárias:

```bash
npm install tsconfig-paths --save-dev
```

- **Frontend**: Navegue até o diretório do frontend (**./OCR-Project/frontend/**) e instale o pacote **@mui/icons-material** para os ícones da interface:

```bash
npm install @mui/icons-material
```

### 4. Inicie o Servidor Backend

Navegue até o diretório do backend (**./OCR-Project/backend/**) e, então, execute:

```bash
npm run start
```

### 5. Inicie o Servidor Frontend

Navegue até o diretório do frontend (**./OCR-Project/frontend/**) e, então, execute:

```bash
npm run start
```

- 💻 Agora você pode acessar a aplicação no seu navegador.

### ⚙️ Estrutura do Projeto

- **Backend**: Contém a API para **processamento do OCR** e **interação com GPT**.

- **Frontend**: Interface de usuário para **upload de boletos**, **interação com GPT** e **exibição dos resultados**.