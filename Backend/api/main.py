import os
import shutil
from pathlib import Path
import uvicorn
from fastapi import FastAPI, HTTPException, Request, UploadFile,File
from fastapi.middleware.cors import CORSMiddleware
from testFunction import ask_questions

# Create FastAPI app
app = FastAPI()

# Configure CORS (Cross-Origin Resource Sharing)
origins = ["*"]  # Replace with your frontend URL
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ask")
async def ask_question(request: Request):
    try:
        # Access the "book" and "questions" fields from the request_data dictionary
        book = request.query_params.get("book")
        question = request.query_params.get("question")
        print(book)
        print(question)
        res = ask_questions(book, question)
        return res
    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Missing field: {e}")

@app.post("/books")
async def upload_file(file: UploadFile = File(...)):
    try:

        upload_folder = Path("api/uploaded_files")
        upload_folder.mkdir(exist_ok=True)

        with (upload_folder / file.filename).open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return {
            "filename": file.filename,
            "content_type": file.content_type
        }
    except Exception as e:
        raise HTTPException(detail=f"An error occurred: {e}", status_code=400)

    
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
