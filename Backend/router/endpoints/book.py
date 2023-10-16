import db
from fastapi import APIRouter, HTTPException, UploadFile, File, Form

router = APIRouter()

@router.post("/books")
async def upload_file(
    title: str = Form(...),
    author: str = Form(None),
    summary: str = Form(None),
    userid: int = Form(None),
    file: UploadFile = File(...),
):
    try:
        id = db.crud.create_book(
            name=title, author=author, summary=summary, userid=userid
        )
        return {"msg": "book uploaded", "bookid": id}
    except Exception as e:
        raise HTTPException(detail=f"An error occurred: {e}", status_code=400)