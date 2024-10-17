# Use official Python image
FROM python:3.12-slim

# Set the working directory
WORKDIR /app

# Install system dependencies for building chroma-hnswlib
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    libgomp1 \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --use-deprecated=legacy-resolver -r requirements.txt

RUN pip install psycopg2

RUN pip install torch torchvision

COPY ./backend .

COPY ./backend/.env ./backend/.env

ENV PYTHONPATH=/app/backend/apps

# Expose port 8000
EXPOSE 8000


# Command to run the FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
