# SCRIPT PARA CRIAÇÃO DE VIRTUAL ENV E INSTALAÇÃO DE PACOTES NECESSÁRIOS PARA EXTRAÇÃO

conda create -n extracao python=3.11 --y && conda activate extracao && pip
install torch torchvision torchaudio --index-url
https://download.pytorch.org/whl/cu117 && pip install langchain pypdf optimum
accelerate bitsandbytes chromadb==0.4 sentence-transformers==2.2.2 openpyxl
InstructorEmbedding sqlalchemy==2.0.0 -U --no-cache-dir && conda install
ipykernel --y && python -m ipykernel install --user --name extracao
--display-name "Python 3.11 - Extração" && export
PYTORCH_CUDA_ALLOC_CONF=garbage_collection_threshold:0.6,max_split_size_mb:128

# COMANDO PARA MONITORAR GPUs

watch -n 0.5 nvidia-smi
