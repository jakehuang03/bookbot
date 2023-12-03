from fastapi import APIRouter, HTTPException, Request
import db.crud

# from utils.preLLM import store_tensor_in_db, SessionLocal
from utils.testFunction import ask_questions

router = APIRouter()


@router.get("/ask")
async def ask_question(request: Request):
    try:
        book = request.query_params.get("book")
        question = request.query_params.get("question")
        id = db.crud.get_bookid_by_name(book)
        # print(book)
        # print(question)
        res = ask_questions(id, question)
        return res
    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Missing field: {e}")


