FROM tiangolo/uvicorn-gunicorn-fastapi:python3.11

WORKDIR /app

# If you have additional dependencies in a requirements.txt file, copy it first
COPY ./requirements.txt /app/requirements.txt

# Install any dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the contents of the local directory where the Dockerfile resides to /app
COPY . /app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]