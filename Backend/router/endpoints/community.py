import db.crud as crud
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
        id = crud.create_question(
            userid=userid, bookid=bookid, content=content, answer=answer
        )
        return {"msg": "question saved", "questionid": id}
    except Exception as e:
        raise HTTPException(detail=f"An error occurred: {e}", status_code=400)
    
@router.get("/getquesbyuser/{userid}")
async def get_ques_by_user(userid):
    return crud.get_question_by_userid(userid=userid)

@router.get("/getquesbybook/{bookid}")
async def get_ques_by_book(bookid):
    return crud.get_question_by_bookid(bookid=bookid)

@router.get("/getques")
async def get_ques_all():
    return crud.get_question_all()