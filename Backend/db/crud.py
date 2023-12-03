from . import database
from sqlalchemy import desc
db = database.SessionLocal()


def create_user(name: str, passw: str, email: str, isGoogle=False):
    db_user = database.User(UserName=name, UserPassword=passw, UserEmail=email, Google=isGoogle)
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

def publishing_status(bookid: int, isPublished: bool):
    book = db.query(database.Book).filter(database.Book.BookId == bookid).first()
    
    if book:
        book.Published = isPublished
        db.commit()
        return True
    else:
        return False  # Book not found
    
def delete_book(bookid: int):
    book = db.query(database.Book).filter(database.Book.BookId == bookid).first()

    if book:
        questions = db.query(database.Question).filter(database.Question.BookId == bookid).all()
        for question in questions:
            comments = db.query(database.Comment).filter(database.Comment.QuestionId == question.QuestionId).all()
            for comment in comments:  # Delete each comment related to the question
                db.delete(comment)
            db.delete(question)  # Delete the question after its comments
        db.delete(book)  # Delete the book after all its questions and comments
        db.commit()
        return True  # Book, questions, and comments successfully deleted
    else:
        return False  # Book not found



def create_book(name: str, author: str, summary: str, userid: str, genre="none", published=False):
    db_book = database.Book(
        BookName=name, Author=author, BookContent=summary, UserId=userid, Genre=genre, Published=published
    )
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book.BookId

def get_bookname_by_id(id: int):
    return db.query(database.Book).filter(database.Book.BookId == id).order_by(database.Book.CreateTime.desc()).first().BookName

def get_bookid_by_name(bkname:str):
    return db.query(database.Book).filter(database.Book.BookName == bkname and database.Book.Published == True).order_by(database.Book.CreateTime.desc()).first().BookId

def get_book_by_name(bkname: str):
    return db.query(database.Book).filter(database.Book.BookName == bkname and database.Book.Published == True).order_by(database.Book.CreateTime.desc()).first()

def get_books():
    return db.query(database.Book).filter(database.Book.Published == True).order_by(database.Book.CreateTime.desc()).all()

def get_book_by_id(bookid: int):
    return db.query(database.Book).filter(database.Book.BookId == bookid).order_by(database.Book.CreateTime.desc()).first()

def get_my_books(userId: int):
    return db.query(database.Book).filter(database.Book.UserId == userId).order_by(database.Book.CreateTime.desc()).all()

def get_book_by_name(bookname: str, genre: str):
    if bookname == "none" and genre == "none":
        query = db.query(database.Book).order_by(database.Book.CreateTime.desc()).all()
        return query
    elif genre == "none":
        query = db.query(database.Book).filter(
            database.Book.BookName.like("%" + bookname + "%")
        )
        return query.order_by(database.Book.CreateTime.desc()).all()
    elif bookname == "none":
        query = db.query(database.Book).filter(database.Book.Genre == genre)
        return query.order_by(database.Book.CreateTime.desc()).all()
    else:
        query1 = db.query(database.Book).filter(
            database.Book.BookName.like("%" + bookname + "%")
        ).filter(database.Book.Genre == genre)
        return query1.order_by(database.Book.CreateTime.desc()).all()

def get_mybook_by_name(bookname: str, genre: str, userId: int):
    if bookname == "none" and genre == "none" and userId == "none":
        query = db.query(database.Book).all()
        return query.order_by(database.Book.CreateTime.desc())
    # single none
    elif genre == "none" and bookname != "none" and userId != "none":
        query = db.query(database.Book).filter(
            database.Book.BookName.like("%" + bookname + "%"),
            database.Book.UserId == userId
        )
        return query.order_by(database.Book.CreateTime.desc()).all()
    elif bookname == "none" and genre != "none" and userId != "none":
        query = db.query(database.Book).filter(
            database.Book.Genre == genre,
            database.Book.UserId == userId)
        return query.order_by(database.Book.CreateTime.desc()).all()
    elif userId == "none" and bookname != "none" and genre != "none":
        query = db.query(database.Book).filter(
            database.Book.BookName.like("%" + bookname + "%"),
            database.Book.Genre == genre
        )
        return query.order_by(database.Book.CreateTime.desc()).all()
    # double none
    elif genre == "none" and bookname == "none" and userId != "none":
        query = db.query(database.Book).filter(
            database.Book.UserId == userId)
        return query.order_by(database.Book.CreateTime.desc()).all()
    elif genre == "none" and userId == "none" and bookname != "none":
        query = db.query(database.Book).filter(
            database.Book.BookName.like("%" + bookname + "%")
        )
        return query.order_by(database.Book.CreateTime.desc()).all()
    elif userId == "none" and bookname == "none" and genre != "none":
        query = db.query(database.Book).filter(
            database.Book.Genre == genre
        )
        return query.order_by(database.Book.CreateTime.desc()).all()
    else:
        query1 = db.query(database.Book).filter(database.Book.BookName.like("%" + bookname + "%")).filter(database.Book.Genre == genre).filter(database.Book.UserId == userId)
        return query1.order_by(database.Book.CreateTime.desc()).all()


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
        dict = i.__dict__
        quelis.append(dict)
    return quelis

def get_question_by_questionid(questionid:int):
    ques = db.query(database.Question).filter(database.Question.QuestionId==questionid).first()
    dict = ques.__dict__
    return dict

def get_question_count():
    count = db.query(database.Question).count()
    return count


def get_question_by_page(page: int, num_per_page: int):
    start = page
    end = page+ int(num_per_page)
    ques = (
        db.query(database.Question)
        .order_by(desc(database.Question.CreateTime))
        .slice(start, end)
        .all()
    )
    quelis = []
    for i in ques:
        dict = i.__dict__
        quelis.append(dict)
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
    comment = db.query(database.Comment).filter(database.Comment.QuestionId == questionid).order_by(desc(database.Comment.CreateTime)).all()
    commentlis = []
    for i in comment:
        dict = i.__dict__
        commentlis.append(dict)
    if commentlis.__len__() > 10:
        return commentlis[:10]
    return commentlis