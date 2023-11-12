
import traceback
from fastapi.responses import JSONResponse
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

@router.get("/search")
async def searchBar(searchBook: str, genre: str, userId: int):
    try:
        book = db.crud.get_mybook_by_name(searchBook, genre, userId)
        if not book:
            empty = []
            return empty
        return book
    except HTTPException as http_exc:
        # Directly re-raise the HTTPException
        raise http_exc
    except Exception as e:
        # Log or handle other unexpected exceptions
        detail = f"An unexpected error occurred: {e}"
        raise HTTPException(status_code=500, detail=detail)
    
@router.patch("")
async def change_status(userId:int, bookId: int, published:bool):
    try:
        flag = db.crud.publishing_status(bookId, published)
        if flag == False:
            empty = []
            return empty
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"An error occurred: {e}")
        

@router.delete("")
async def delete_book(userId: int, bookId: int):
    try:
        flag = db.crud.delete_book(bookId)
        if flag == False:
            empty = []
            return empty
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"An error occurred: {e}")