## Visão Geral 🌟

O RAGify é uma aplicação de geração aumentada por recuperação que utiliza
Langchain e Ollama para processar entradas em linguagem natural em português. O
aplicativo consiste em uma interface de usuário Next.js baseada em TypeScript,
integrada com um servidor API FastAPI. Os usuários podem preencher e anotar
variáveis através da interface, acionando tarefas em segundo plano para
processar os dados e extrair insights.

## Arquitetura 🏗️

### Componentes 🧩

1. **Interface Next.js (TypeScript)**: Interface frontend para os usuários
   interagirem com o sistema, preencher formulários e acionar tarefas em segundo
   plano.
2. **Servidor FastAPI**: Serviço backend que lida com requisições de API,
   gerencia tarefas em segundo plano e interage com o pipeline de processamento.
3. **Pipeline Langchain e Ollama**:
   - **Langchain**: Utilizado para criar embeddings e processar texto.
   - **Ollama**: Usado para gerar e refinar respostas com base nos dados
     processados.
4. **Gerenciador de Tarefas em Segundo Plano**: Processa tarefas de forma
   assíncrona para garantir uma experiência de usuário responsiva.

### Fluxo de Dados 🔄

1. Os usuários interagem com o frontend Next.js para enviar dados.
2. O backend FastAPI processa a solicitação, acionando uma tarefa em segundo
   plano.
3. A tarefa em segundo plano utiliza Langchain e Ollama para processar os dados
   e gerar embeddings ou respostas.
4. Os resultados são armazenados ou enviados de volta para o frontend para
   revisão do usuário.

## Pré-requisitos 📋

Antes de instalar o RAGify, certifique-se de que possui os seguintes
pré-requisitos instalados:

- **Node.js** (>= 18.x): Para rodar o frontend Next.js.
- **Python** (>= 3.10): Para rodar o servidor FastAPI e processar tarefas em
  segundo plano.
- **Docker**: Recomendado para containerizar e gerenciar dependências.
- **PostgreSQL**: A aplicação requer um banco de dados PostgreSQL para armazenar
  resultados processados e informações das tarefas em segundo plano.
- **Chroma**: Certifique-se de ter o pacote `chroma==0.4.0` disponível no seu
  ambiente Python.

## Instalação 🛠️

### 1. Clonar o Repositório 📂

```bash
git clone https://github.com/isabellaaquino/ragify-app-portuguese.git
cd ragify-app-portuguese
```

### 2. Configurando o Frontend Next.js 🌐

Instale as dependências:

```bash
pnpm install
```

Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

O aplicativo Next.js estará disponível em `http://localhost:3000`.

### 3. Configurando o Backend FastAPI 🔧

Crie um ambiente virtual e instale as dependências:

```bash
python -m venv venv
source venv/bin/activate # No Windows use `venv\Scripts\activate`
pip install -r requirements.txt
```

Navegue para o diretório `api`:

```bash
cd backend/apps/api/src
```

Inicie o servidor FastAPI:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

O aplicativo FastAPI estará disponível em `http://localhost:8000`.

### 4. Configurando o Banco de Dados 🗄️

1. Certifique-se de que o PostgreSQL está rodando na porta 5433 (conforme
   configuração do Docker).
2. Crie um banco de dados e configure as tabelas utilizando `SQLAlchemy` e
   `alembic`.

### 5. Executando a Aplicação Completa com Docker 🐳

A aplicação também pode ser containerizada utilizando Docker. Um arquivo
`docker-compose.yml` é fornecido para este propósito.

Construa e inicie os containers:

```bash
docker-compose up --build
```

Acesse a interface em `http://localhost:3000` e a API em
`http://localhost:8000`.

P.S.: Se estiver utilizando MacOS e deseja usar MPS para gerar embeddings mais
rápidos, é necessário executar o servidor fora do container.

## Configuração ⚙️

### Variáveis de Ambiente 🌍

Defina as seguintes variáveis de ambiente para a API:

```.env
DOCUMENTS_DIR={caminho_para_sua_aplicação}/backend/apps/extractor/documentos-pdf

SENTENCE_TRANSFORMER_MODELS_DIR={caminho_para_seus_modelos_sentence_transformer}

ABS_PATH={caminho_para_sua_aplicação}/backend/apps/extractor

DATABASE_URL=postgresql://postgres:postgres@localhost:5433/postgres
```

## Uso 🚀

### Frontend 🖥️

1. Acesse `http://localhost:3000` para acessar a interface do usuário.
2. Preencha os campos do formulário com as informações relevantes. Os campos
   podem incluir variáveis que podem ser anotadas e avaliadas.
3. Envie o formulário para acionar tarefas em segundo plano para processamento
   dos dados.

### Backend 🔙

O backend FastAPI fornece os seguintes endpoints:

- `GET /api/jobs/`: Recupera o status e os resultados de uma tarefa.
- `POST /api/extract`: Aciona a extração de variáveis dos dados submetidos.

### Tarefas em Segundo Plano 🕒

As tarefas são gerenciadas em segundo plano para evitar bloquear a interface. Os
status das tarefas incluem:

- `IN_QUEUE`
- `IN_PROGRESS`
- `COMPLETED`
- `FAILED`

Você pode monitorar o status através do endpoint `/api/jobs/`, que é chamado na
página de Resultados na interface.

## Contribuição 🤝

1. Faça um fork do repositório.
2. Crie um novo branch para sua funcionalidade ou correção de bug.
3. Realize as alterações e faça commits com mensagens descritivas.
4. Abra um pull request para o branch principal.
