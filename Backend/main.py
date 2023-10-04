import db.crud

from typing import Annotated, Union

from fastapi import Depends, FastAPI, HTTPException, status, UploadFile, File, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import shutil

app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def fake_hash_password(password: str):
    return "fakehashed" + password


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def fake_decode_token(token):
    # This doesn't provide any security at all
    # Check the next version
    user = db.crud.get_user_by_email(token)
    return user


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    user = fake_decode_token(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = user.__dict__
    return user


@app.post("/token")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user = db.crud.get_user_by_email(form_data.username)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    user = user.__dict__

    hashed_password = fake_hash_password(form_data.password)
    if not hashed_password == user["UserPassword"]:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    return {"access_token": user["UserEmail"], "token_type": "bearer"}


# @app.get("/users/me")
# async def read_users_me(
#     current_user: Annotated[User, Depends(get_current_active_user)]
# ):
#     return current_user

@app.post("/books")
async def upload_file(
    title: str = Form(...),
    author: str = Form(None),
    summary: str = Form(None),
    userid: int = Form(None),
    file: UploadFile = File(...)):
    id = db.crud.create_book(name=title,author=author,summary=summary,userid=userid)
    try:

        upload_folder = Path("api/uploaded_files")
        upload_folder.mkdir(exist_ok=True)

        with (upload_folder / file.filename).open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return {
            "msg": "book uploaded",
            "bookid": id
        }
    except Exception as e:
        raise HTTPException(detail=f"An error occurred: {e}", status_code=400)