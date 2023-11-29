import db.crud
from fastapi import APIRouter, HTTPException, UploadFile, File, Form, Depends
import shutil
from pathlib import Path
import os
from router.endpoints.user import get_current_user
from typing import Annotated, Union


router = APIRouter()

@router.post("")
async def upload_file(
    current_user: Annotated[dict, Depends(get_current_user)],
    title: str = Form(...),
    author: str = Form(None),
    summary: str = Form(None),
    userid: int = Form(...),
    genre: str = Form(None),
    file: UploadFile = File(...)
):
    try:
        userid = current_user["UserId"]
        if not userid:
            raise HTTPException(status_code=400, detail="User auth faied")
        upload_folder = Path("./uploaded_files")
        upload_folder.mkdir(exist_ok=True)

        title = title + ".pdf"
        
        with (upload_folder / title).open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        if os.path.exists(upload_folder / title):
            print("file path exist")
            id = db.crud.create_book(
                name=title, author=author, summary=summary, userid=userid, genre=genre
            )
            return {"msg": "book uploaded", "bookid": id}
        
    except Exception as e:
        raise HTTPException(detail=f"An error occurred: {e}", status_code=400)


@router.get("/search")
async def searchBar(searchBook: str, genre: str):
    try:
        book = db.crud.get_book_by_name(searchBook, genre)
        if not book:
            raise HTTPException(status_code=404, detail="Book not found")
        return book
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"An error occurred: {e}")
    

@router.get("/{bookId}")
async def getBook(bookId: int,current_user: Annotated[dict, Depends(get_current_user)]):
    try:
        userid = current_user["UserId"]
        if not userid:
            raise HTTPException(status_code=400, detail="User auth faied")
        print(userid)
        book = db.crud.get_book_by_id(bookId)
        print(book)
        if not book:
            raise HTTPException(status_code=404, detail="Book not found")
        return book
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"An error occurred: {e}")
    

@router.get("")
async def getBooks():
    try:
        books = db.crud.get_books()
        # print(books["BookId"])
        return books
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"An error occurred: {e}")