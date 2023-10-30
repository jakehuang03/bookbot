import db.crud
from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.get("")
async def getMyBooks(userId: int):
    try:
        print(userId)
        books = db.crud.get_my_books(userId)
        print(books)
        return books
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"An error occurred: {e}")