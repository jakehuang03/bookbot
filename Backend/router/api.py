from fastapi import APIRouter
from router.endpoints import user, community, bookbot, books, mybooks


api_router = APIRouter()

api_router.include_router(user.router, prefix="/user", tags=["user"])
api_router.include_router(books.router, prefix="/books", tags=["books"])
api_router.include_router(community.router, prefix="/com", tags=["com"])
api_router.include_router(bookbot.router, prefix="/bookbot", tags=["bookbot"])
api_router.include_router(mybooks.router, prefix="/mybooks", tags=["mybooks"])
