from fastapi import FastAPI, Request, HTTPException
from router.api import api_router
from fastapi.middleware.cors import CORSMiddleware
from db.crud import get_book_by_name

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

    
