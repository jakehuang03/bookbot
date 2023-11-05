import db.crud
from fastapi import APIRouter, HTTPException, Request

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
    
@router.get("/search")
async def searchBar(request: Request):
    try:
        print(request)
        bookname = request.query_params.get("searchBook")
        genre = request.query_params.get("genre")

        return db.crud.get_book_by_name(bookname, genre)
    except Exception as e:
        raise HTTPException(detail=f"An error occurred: {e}", status_code=400)