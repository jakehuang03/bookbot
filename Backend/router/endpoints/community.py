import db
from fastapi import APIRouter, HTTPException, UploadFile, File, Form

router = APIRouter()

@router.post("/saveques")
async def save_question(
    userid: int = Form(...),
    bookid: int = Form(...),
    content: str = Form(...),
    answer: str = Form(...)
):
    try:
        id = db.crud.create_question(
            userid=userid, bookid=bookid, content=content, answer=answer
        )
        return {"msg": "question saved", "questionid": id}
    except Exception as e:
        raise HTTPException(detail=f"An error occurred: {e}", status_code=400)
    