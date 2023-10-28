from fastapi import APIRouter

from router.endpoints import user, book, community, bookbot


api_router = APIRouter()

api_router.include_router(user.router, prefix="/user", tags=["user"])
api_router.include_router(book.router, prefix="/book", tags=["book"])
api_router.include_router(community.router, prefix="/com", tags=["com"])
api_router.include_router(bookbot.router, prefix="/bookbot", tags=["bookbot"])