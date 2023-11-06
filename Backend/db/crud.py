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


def create_book(name: str, author: str, summary: str, userid: str, genre: str, published=False):
    if genre is None:
        genre = "none"
    db_book = database.Book(
        BookName=name, Author=author, BookContent=summary, UserId=userid, Genre=genre, Published=published
    )
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book.BookId


def get_books():
    return db.query(database.Book).all()

def get_book_by_id(bookid: int):
    return db.query(database.Book).filter(database.Book.BooSkId == bookid).first()

def get_my_books(userId: int):
    return db.query(database.Book).filter(database.Book.UserId == userId).all()

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
        ).filter(database.Book.Genre == genre)
        return query1.all()

def get_mybook_by_name(bookname: str, genre: str, userId: int):
    if bookname == "none" and genre == "none" and userId == "none":
        query = db.query(database.Book).all()
        return query
    # single none
    elif genre == "none" and bookname != "none" and userId != "none":
        query = db.query(database.Book).filter(
            database.Book.BookName.like("%" + bookname + "%"),
            database.Book.UserId == userId
        )
        return query.all()
    elif bookname == "none" and genre != "none" and userId != "none":
        query = db.query(database.Book).filter(
            database.Book.Genre == genre,
            database.Book.UserId == userId)
        return query.all()
    elif userId == "none" and bookname != "none" and genre != "none":
        query = db.query(database.Book).filter(
            database.Book.BookName.like("%" + bookname + "%"),
            database.Book.Genre == genre
        )
        return query.all()
    # double none
    elif genre == "none" and bookname == "none" and userId != "none":
        query = db.query(database.Book).filter(
            database.Book.UserId == userId)
        return query.all()
    elif genre == "none" and userId == "none" and bookname != "none":
        query = db.query(database.Book).filter(
            database.Book.BookName.like("%" + bookname + "%")
        )
        return query.all()
    elif userId == "none" and bookname == "none" and genre != "none":
        query = db.query(database.Book).filter(
            database.Book.Genre == genre
        )
        return query.all()
    else:
        query1 = db.query(database.Book).filter(database.Book.BookName.like("%" + bookname + "%")).filter(database.Book.Genre == genre).filter(database.Book.UserId == userId)
        return query1.all()


def create_question(userid: int, bookid: int, content: str, answer: str):
    db_question = database.Question(
        UserId=userid, BookId=bookid, QuestionContent=content, QuestionAnswer=answer
    )
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question.QuestionId

def get_question_by_userid(userid:int):
    ques = db.query(database.Question).filter(database.Question.UserId == userid).all()
    quelis = []
    for i in ques:
        quelis.append(i.__dict__)
    return quelis

def get_question_by_bookid(bookid:int):
    ques = db.query(database.Question).filter(database.Question.BookId == bookid).all()
    quelis = []
    for i in ques:
        quelis.append(i.__dict__)
    return quelis

def get_question_by_questionid(questionid:int):
    ques = db.query(database.Question).filter(database.Question.QuestionId==questionid).first()
    return ques.__dict__

def get_question_all():
    ques = db.query(database.Question)
    quelis = []
    for i in ques:
        quelis.append(i.__dict__)
    return quelis

def create_comment(quesid: int, userid: int, content: str):
    db_comment = database.Comment(
        QuestionId=quesid, UserId=userid, Content=content
    )
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment.CommentId

def get_comment_by_questionid(questionid:int):
    comment = db.query(database.Comment).filter(database.Comment.QuestionId == questionid).all()
    commentlis = []
    for i in comment:
        commentlis.append(i.__dict__)
    return commentlis