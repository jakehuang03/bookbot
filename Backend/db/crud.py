from sqlalchemy.orm import Session
from . import database

db = database.SessionLocal()

def create_user(name:str, passw:str, email:str):
    db_user = database.User(UserName=name, UserPassword=passw, UserEmail=email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_email(email: str):
    return db.query(database.User).filter(database.User.UserEmail == email).first()

def create_book(name:str, author:str, summary:str, userid:str):
    db_book = database.Book(BookName=name, Author=author, BookContent=summary, UserId=userid)
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book