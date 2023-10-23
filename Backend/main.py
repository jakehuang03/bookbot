from fastapi import FastAPI, HTTPException, Request
from Backend.db.crud import get_book_by_name
from router.api import api_router
from fastapi.middleware.cors import CORSMiddleware

import shutil
from pathlib import Path
from fastapi import FastAPI, HTTPException, Request, UploadFile,File
from fastapi.middleware.cors import CORSMiddleware
from Backend.api.preLLM.refactorexp import store_tensor_in_db
from Backend.db.database import SessionLocal

app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)





