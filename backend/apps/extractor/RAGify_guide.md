# 📚 RAGify - O guia

## 🌟 Introdução

Bem-vindo ao guia de utilização do **RAGify**, uma ferramenta que utiliza a
técnica RAG e bibliotecas como **Langchain** para implementação de um validador
de extração automatizada de informações numa seleção de arquivos.

##### 🤔 O que significa RAG?

RAG, ou **Retrieval Augmented Generation**, representa uma nova técnica dentro
da Inteligência Artificial que combina técnicas de **retrieval** e **geração de
texto** com modelos de linguagem para diferentes objetivos. No nosso caso,
utilizamos essas técnicas para extrair informações específicas em diversos
documentos PDFs.

##### 💡 Como RAG e o RAGify podem ser úteis no projeto?

Nosso projeto conta com uma vastidão de documentos a serem varridos,
inspecionados e anotados. Essa tarefa é facilitada e automatizada com uma
implementação de RAG, que permite interagir com esses documentos através de
perguntas textuais.

A ferramenta, então, entra como um validador que implementa tais tecnologias, e
elenca as melhores opções de prompt, estratégias de embeddings e escolha de
modelo para essa tarefa.

---

## 🪐 Instalação do ambiente no Jupyter

Antes de começar a escolher seus parâmetros e escopo de teste, é necessário
baixar os pacotes python que são utilizados pela ferramenta.

Num terminal Jupyter, rode o seguinte script:

```bash
conda create -n extracao python=3.11.1 --y && conda activate extracao && pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu117 && pip install langchain pypdf optimum accelerate bitsandbytes chromadb==0.4 sentence-transformers==2.2.2 openpyxl InstructorEmbedding sqlalchemy==2.0.0 -U --no-cache-dir && env PYTORCH_CUDA_ALLOC_CONF=garbage_collection_threshold:0.6,max_split_size_mb:128
```

Esse script criará um ambiente virtual utiliando o conda e instalará os pacotes
necessários com o pip. Ao final, também seta a variável de ambiente
`PYTORCH_CUDA_ALLOC_CONF` para evitar possíveis transtornos com VRAM alocada.

OBS.: Se você também tiver interesse em testar partes do código com o Jupyter
Notebooks, você pode rodar esse comando, que criará um kernel com o ambiente
virtual criado pelo conda.

```bash
conda install ipykernel --y && python -m ipykernel install --user --name extracao --display-name "nome-do-seu-kernel"
```

---

## 🚀 Como utilizar eficientemente a ferramenta

Agora, é hora de preparar seus diretórios. Primeiramente, puxe o repositório
hospedado no códigos.ufsc.br, da seguinte maneira:

```bash
git clone https://codigos.ufsc.br/ceos/geral/linha2/llms.git
git checkout isabella
```

Após isso, ande até o caminho da pasta `extractor/`. Aqui, é necessário colocar
os seus documentos PDF onde serão feito as buscas por prompt na pasta
`documentos-pdf/`.

#### 🛠️ Ajustando os parâmetros

Finalizada a preparação dos diretórios e documentos, por fim, você deve escolher
a configuração de parâmetros para sua extração. Nesse momento, você deve
preencher o documento `import.xlsx` (que deve permanecer no diretório geral) com
os IDs de documentos presentes na pasta `documentos-pdf/` que você quer que faça
parte da rotina de extração, junto com os valores esperados para um determinado
prompt que você escolher.

Exemplo:

| ID     | Nome de coluna   |
| ------ | ---------------- |
| 123341 | valor_esperado_x |
| 145555 | valor_esperado_y |
| ...    | ...              |

Por fim, escolha o set de parâmetros preenchendo e/ou modificando-os no arquivo
`variables.json`.

> 🔑 **Chaves obrigatórias:** "prompts" e "model". O restante pode ser um
> dicionário vazio, mas ainda deve ser declarado.

```JSON
// Examplo de configuração de parâmetros
{
    "prompts": [{
        "key": "zero_shot",
        "question": "Qual é o número do processo licitatório desse processo?",
    }],
    "model": "llama-2-7b-chat-hf",
    "embeddings": {
        "bert_model": "bert-large-portuguese-cased",
        "chunk_size": 512,
        "chunk_overlap": 20,
        "embedding_model": "HuggingFaceBgeEmbeddings",
        "vector_db": "Chroma",
        "text_splitter": "RecursiveCharacterTextSplitter"
    },
    "retrieval":  {
        "chain_type": "stuff",
        "top_k": 3,
        "device_map": {"device": "cuda:0"}
    }
}
```

ℹ️ Sobre a chave `"prompts"`: Será sempre uma lista de dicionários com chaves
`"key"` e `"question".` A chave `"key"` representará seu **identificador**
listado na página de resultados no arquivo de saída.

> 🛑 **Atenção:** Apesar de suportar múltiplos prompts diferentes, estes devem
> se referir a uma mesma variável, uma vez que a comparação e validação será
> feita em relação aos resultados anotados no arquivo de entrada.

---

## 🧮 Gerando resultados de extração

Tudo pronto! Hora de gerar resultados. Em um terminal com o ambiente virtual
ativado, rode o comando:

```bash
python multiple_files_routine.py
```

A tempo de execução rotina completa depende do tamanho dos PDFs e da quantidade
de documentos envolvidos na extração. Por exemplo, uma extração de duas
variáveis em 40 documentos geralmente demora em torno de 15min.

Ao final da execução, você deve ver um novo documento excel de saída começando
por RESULTADOS*EXTRACAO*\* , onde estará armezando a validação dos resultados.

_/fin/_
