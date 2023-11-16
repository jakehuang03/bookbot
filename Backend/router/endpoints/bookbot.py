import shutil
from pathlib import Path
from fastapi import APIRouter, HTTPException, Request, UploadFile, File

# from utils.preLLM import store_tensor_in_db, SessionLocal
from utils.testFunction import ask_questions
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
import PyPDF2

router = APIRouter()


@router.get("/ask")
async def ask_question(request: Request):
    try:
        book = request.query_params.get("book")
        question = request.query_params.get("question")
        # print(book)
        # print(question)
        res = ask_questions(book, question)
        return res
    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Missing field: {e}")


