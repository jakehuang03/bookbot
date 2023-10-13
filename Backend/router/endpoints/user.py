import db.crud
from utils.user import hash_password, decode_token
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/token")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user = db.crud.get_user_by_email(form_data.username)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    user = user.__dict__

    hashed_password = hash_password(form_data.password)
    if not hashed_password == user["UserPassword"]:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    return {"access_token": user["UserEmail"], "token_type": "bearer"}


# @app.get("/users/me")
# async def read_users_me(
#     current_user: Annotated[User, Depends(get_current_active_user)]
# ):
#     return current_user

@router.post("/books")
async def upload_file(
    title: str = Form(...),
    author: str = Form(None),
    summary: str = Form(None),
    userid: int = Form(None),
    file: UploadFile = File(...)):
    try:
        id = db.crud.create_book(name=title,author=author,summary=summary,userid=userid)
        return {
            "msg": "book uploaded",
            "bookid": id
        }
    except Exception as e:
        raise HTTPException(detail=f"An error occurred: {e}", status_code=400)
    

@router.post("/signup")
async def signup(
    nickname: str = Form(),
    email: str = Form(),
    password: str = Form()):
    user = db.crud.get_user_by_email(email)
    if user:
        raise HTTPException(status_code=400, detail="Email exists")

    hashed_password = hash_password(password)
    db.crud.create_user(nickname,hashed_password,email)
    return {"msg":"signin successed"}

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    user = decode_token(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = user.__dict__
    return user
