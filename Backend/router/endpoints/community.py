from utils import s3
import base64
import db.crud as crud
from fastapi import APIRouter, HTTPException, Form

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

def get_avartar(userid):
    try:
        response = s3.s3_retrieve("user_image/" + str(userid))
        image_bytes = response["Body"].read()
        # Decode the bytes using UTF-8 encoding
        image_base64 = base64.b64encode(image_bytes).decode("utf-8")
        return image_base64
    except:
        print("An exception occurred")
        
def append_user(dict):
    userid = dict['UserId']
    dict['UserName'] = crud.get_user_by_id(userid).UserName
    dict['Avatar'] = get_avartar(userid)
    return dict

def append_book(dict):
    dict['BookName'] = crud.get_book_by_id(dict['BookId']).BookName
    return dict

@router.get("/getquesbyuser/{userid}")
async def get_ques_by_user(userid):
    return crud.get_question_by_userid(userid=userid)

@router.get("/getquesbybook/{bookid}")
async def get_ques_by_book(bookid):
    quelis = crud.get_question_by_bookid(bookid=bookid)
    for dict in quelis:
        dict = append_user(dict)
        dict = append_book(dict)
    return quelis

@router.get("/getquesbyques/{questionid}")
async def get_ques_by_ques(questionid):
    # print(questionid)
    dict = crud.get_question_by_questionid(questionid=questionid)
    # print(dict)
    dict = append_book(dict)
    dict = append_user(dict)
    # dict['Avatar'] = get_avartar(dict['UserId'])
    return dict

@router.get("/getquescount")
async def get_question_count():
    count = crud.get_question_count()
    return count


@router.get("/getquesbypage/{page}")
async def get_ques_by_page(page: int):
    quelis = crud.get_question_by_page(page=page, num_per_page=5)
    for dict in quelis:
        dict = append_book(dict)
        dict = append_user(dict)
    return quelis

@router.post("/savecomment")
async def save_comment(
    questionid: int = Form(...),
    userid: int = Form(...),
    content: str = Form(...)
):
    try:
        id = crud.create_comment(
            quesid=questionid, userid=userid, content=content
        )
        return {"msg": "comment saved", "commentid": id}
    except Exception as e:
        raise HTTPException(detail=f"An error occurred: {e}", status_code=400)

@router.get("/getcommentbyques/{questionid}")
async def get_comment_by_question(questionid):
    commentlis = crud.get_comment_by_questionid(questionid=questionid)
    for dict in commentlis:
        dict = append_user(dict)
    return commentlis
