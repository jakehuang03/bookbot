import base64
import db.crud
from datetime import datetime, timedelta
from utils.user import hash_password, verify_password
from typing import Annotated, Union
from fastapi import APIRouter, Depends, HTTPException, File, Form, status, UploadFile, Header
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from utils import s3
from google.auth.transport import requests
from google.oauth2 import id_token

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/user/token")

GOOGLE_CLIENT_ID = "401905550825-3evij7gugc3cne4hg23p8s4lub8h6d3c.apps.googleusercontent.com"


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

    if user["Google"] == True:
        raise HTTPException(status_code=400, detail="Please use Google Signin")

    if not verify_password(form_data.password, user["UserPassword"]):
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["UserEmail"]}, expires_delta=access_token_expires
    )
    return {
        "userID": user["UserId"],
        "access_token": access_token,
        "name": user["UserName"],
        "token_type": "bearer",
    }

@router.post("/googleSignIn") 
async def googleLogin(token: str = Form(...)):
    try:
        id_info = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
        user = db.crud.get_user_by_email(id_info["email"])
        
        user = user.__dict__
        if not user:
            user = db.crud.create_user(name=id_info["name"], passw="google", email=id_info["email"], isGoogle=True)
        elif user["Google"] == False:
            raise HTTPException(status_code=400, detail="Please use BookBot Signin instead")

        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": id_info["email"]}, expires_delta=access_token_expires
        )
        return {
            "userID": user["UserId"],
            "access_token": access_token,
            "name": id_info["name"],
            "token_type": "bearer",
        }
    except (ValueError, IndexError):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    
@router.post("/signup")
async def signup(nickname: str = Form(), email: str = Form(), password: str = Form()):
    user = db.crud.get_user_by_email(email)
    if user:
        raise HTTPException(status_code=400, detail="Email exists")

    hashed_password = hash_password(password)
    db.crud.create_user(nickname, hashed_password, email)
    return {"msg": "signup successed"}


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


@router.post("/createprofile")
async def create_profile(
    current_user: Annotated[dict, Depends(get_current_user)],
    name: str = Form(),
    bio: str = Form(),
    avatar: str = Form(),
    gender: str = Form(),
):
    userid = current_user["UserId"]
    db.crud.create_user_profile(
        userid=userid, name=name, bio=bio, avatar=avatar, gender=gender
    )
    return {"msg": "profile created"}


@router.get("/getprofile/{userid}")
async def get_profile(userid):
    user = db.crud.get_user_by_id(userid).__dict__
    return {
        "nickname": user["UserName"],
        "gender": user["Gender"],
        "bio": user["UserBio"],
        "avatar": user["Avatar"],
    }


@router.get("/getprofile")
async def get_profile(current_user: Annotated[dict, Depends(get_current_user)]):
    return {
        "nickname": current_user["UserName"],
        "gender": current_user["Gender"],
        "bio": current_user["UserBio"],
        "avatar": current_user["Avatar"],
    }


# save image to s3
@router.put("/s3upload")
async def upload(
    current_user: Annotated[dict, Depends(get_current_user)],
    avatar: UploadFile = File(...),
):
    if avatar:
        s3.s3_upload(avatar.file, "user_image/" + str(current_user["UserId"]))
        return "file uploaded"
    else:
        return "error in uploading"


# get image from s3
@router.get("/s3get/{userid}")
async def get(userid):
    try:
        response = s3.s3_retrieve("user_image/" + str(userid))
        image_bytes = response["Body"].read()
        # Decode the bytes using UTF-8 encoding
        image_base64 = base64.b64encode(image_bytes).decode("utf-8")

        return image_base64

    except:
        print("An exception occurred")
