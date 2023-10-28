from sqlalchemy.orm import Session
from . import database

db = database.SessionLocal()


def create_user(name: str, passw: str, email: str):
    db_user = database.User(UserName=name, UserPassword=passw, UserEmail=email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_user_by_id(id: int):
    return db.query(database.User).filter(database.User.UserId == id).first()


def get_user_by_email(email: str):
    return db.query(database.User).filter(database.User.UserEmail == email).first()


def create_user_profile(userid: int, name: str, bio: str, avatar: str, gender: str):
    user = get_user_by_id(userid)
    user.UserBio = bio
    user.Avatar = avatar
    user.Gender = gender
    user.UserName = name
    db.commit()
    db.refresh(user)
    return userid


def create_book(name: str, author: str, summary: str, userid: str, genre: str):
    db_book = database.Book(
        BookName=name, Author=author, BookContent=summary, UserId=userid, Genre=genre
    )
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book.BookId


def get_book_by_id(bookid: int):
    return db.query(database.Book).filter(database.Book.BookId == bookid).first()


def get_book_by_name(bookname: str, genre: str):
    if bookname == "none" and genre == "none":
        query = db.query(database.Book).all()
        return query
    elif genre == "none":
        query = db.query(database.Book).filter(
            database.Book.BookName.like("%" + bookname + "%")
        )
        return query.all()
    elif bookname == "none":
        query = db.query(database.Book).filter(database.Book.Genre == genre)
        return query.all()
    else:
        query1 = db.query(database.Book).filter(
            database.Book.BookName.like("%" + bookname + "%")
        )
        query2 = db.query(database.Book).filter(database.Book.Genre == genre)
        combined_query = query1.union(query2)
        return combined_query.all()


def create_question(userid: int, bookid: int, content: str, answer: str):
    db_question = database.Question(
        UserId=userid, BookId=bookid, QuestionContent=content, QuestionAnswer=answer
    )
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question.QuestionId
