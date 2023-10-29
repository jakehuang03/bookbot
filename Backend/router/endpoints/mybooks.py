import db.crud
from fastapi import APIRouter, HTTPException, UploadFile, File, Form

router = APIRouter()

@router.get("")
async def getMyBooks(userId):
    try:
        books = db.crud.get_my_books(userId)
        # print(books["BookId"])
        return books
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"An error occurred: {e}")