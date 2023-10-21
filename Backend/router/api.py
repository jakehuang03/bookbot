from fastapi import APIRouter

from router.endpoints import user, book, community


api_router = APIRouter()

api_router.include_router(user.router, prefix="/user", tags=["user"])
api_router.include_router(book.router, prefix="/book", tags=["book"])
api_router.include_router(community.router, prefix="/com", tags=["com"])