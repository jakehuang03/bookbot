from sqlalchemy.orm import Session
from . import database

db = database.SessionLocal()

def create_user(name:str, passw:str, email:str):
    db_user = database.User(UserName=name, UserPassword=passw, UserEmail=email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_id(id: int):
    return db.query(database.User).filter(database.User.UserId == id).first()

def get_user_by_email(email: str):
    return db.query(database.User).filter(database.User.UserEmail == email).first()

def create_user_profile(userid:int, bio:str, avatar:str, gender:str):
    user = get_user_by_id(userid)
    user.UserBio = bio
    user.Avatar = avatar
    user.Gender = gender
    db.commit()
    db.refresh(user)
    return userid

def create_book(name:str, author:str, summary:str, userid:str, genre:str):
    db_book = database.Book(BookName=name, Author=author, BookContent=summary, UserId=userid, Genre=genre)
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book.BookId

def get_book_by_id(bookid: int):
    return db.query(database.Book).filter(database.Book.BookId == bookid).first()

def get_book_by_name(bookname: str, genre:str):
    query1 = db.query(database.Book).filter(database.Book.Genre.like('%' + genre + '%'))
    query2 = db.query(database.Book).filter(database.Book.BookName.like('%' + bookname + '%'))
    query3 = db.query(database.Book).all()
    if bookname is None:
        return query1.all()
    elif genre is None:
        return query2.all()
    elif bookname is None and genre is None:
        return query3
    else:
        combined_query = query1.union(query2)
        return combined_query.all()

def create_question(userid:int, bookid:int, content:str, answer:str):
    db_question = database.Question(UserId=userid, BookId=bookid, QuestionContent=content, QuestionAnswer=answer)
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question.QuestionId
