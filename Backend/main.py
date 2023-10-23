from fastapi import FastAPI, HTTPException, Request
from Backend.db.crud import get_book_by_name
from router.api import api_router
from fastapi.middleware.cors import CORSMiddleware

import shutil
from pathlib import Path
from fastapi import FastAPI, HTTPException, Request, UploadFile,File
from fastapi.middleware.cors import CORSMiddleware
from Backend.api.preLLM.refactorexp import store_tensor_in_db
from Backend.db.database import SessionLocal
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
import PyPDF2

app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.get("/ask")
async def answer(book: str, question: str):
    # use bookid and userid 
    # find bookname with bookid in db
    # if no such book then return error
    # else proceed
    print(book, question)
    answer = [{'id': 1,
              'answer': book + question + "answer"}, 
                {'id': 2,
                'answer': book + question + "answer"}]
    extractedpar = "extracted book"
    # wording finding
    result = {}
    result['answer'] = answer
    result['extractedpar'] = extractedpar
    result['book'] = book
    result['question'] = question
    return result

@app.get("/books/search")
async def searchBar(request: Request):
    try:
        bookname = request.query_params.get("searchBook")
        genre = request.query_params.get("genre")

        return get_book_by_name(bookname, genre)
    except Exception as e:
        raise HTTPException(detail=f"An error occurred: {e}", status_code=400)
    
    
@app.post("/books")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Save the uploaded file locally
        upload_folder = Path("api/uploaded_files")
        upload_folder.mkdir(exist_ok=True)

        filepath = upload_folder / file.filename
        with filepath.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Convert PDF to string
        with filepath.open("rb") as pdf_file:
            reader = PyPDF2.PdfReader(pdf_file)
            pages_text = [reader.pages[page_num].extract_text() for page_num in range(len(reader.pages))]
        
        book_as_continuous_text = ''.join(pages_text)

        # Convert the string to a tensor
        maxvocab = len(set(book_as_continuous_text.split()))
        tokenizer = Tokenizer(num_words=maxvocab, oov_token='<OOV>')
        tokenizer.fit_on_texts([book_as_continuous_text])
        sequences = tokenizer.texts_to_sequences([book_as_continuous_text.split()])[0]
        tensor = tf.convert_to_tensor(sequences, dtype=tf.int32)

        # Store tensor and tokenizer to the database
        session = SessionLocal()
        store_tensor_in_db(file.filename, tensor, tokenizer, session)
        session.close()

        return {
            "filename": file.filename,
            "content_type": file.content_type
        }

    except Exception as e:
        raise HTTPException(detail=f"An error occurred: {e}", status_code=400)