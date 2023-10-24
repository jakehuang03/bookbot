

from fastapi import APIRouter, HTTPException

from db.crud import get_book_by_name

router = APIRouter()

@router.get("/search")
async def searchBar(searchBook: str, genre: str):
    try:
        book = get_book_by_name(searchBook, genre)
        if not book:
            raise HTTPException(status_code=404, detail="Book not found")
        return book
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"An error occurred: {e}")