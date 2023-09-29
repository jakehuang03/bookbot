from sqlalchemy.orm import Session
from . import database

db = database.SessionLocal()

def create_user(name:str, passw:str, email:str):
    db_user = database.User(UserName=name, UserPassword=passw, UserEmail=email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
