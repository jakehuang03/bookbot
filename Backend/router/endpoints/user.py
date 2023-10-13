import db.crud
from datetime import datetime, timedelta
from utils.user import hash_password, verify_password
from typing import Annotated, Union
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/user/token")

def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@router.post("/token")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user = db.crud.get_user_by_email(form_data.username)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    user = user.__dict__

    if not verify_password(form_data.password,user["UserPassword"]):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["UserEmail"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


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
    return {"msg":"signup successed"}

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.crud.get_user_by_email(username)
    user = user.__dict__
    return user

@router.get("/me")
async def read_users_me(current_user: Annotated[dict, Depends(get_current_user)]):
    return current_user
