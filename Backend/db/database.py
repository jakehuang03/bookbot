from sqlalchemy import create_engine, Column, ForeignKey, Integer, String, TIMESTAMP, Boolean
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.orm import sessionmaker
import datetime

SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:Bookbot123456!@104.198.232.175:3306/bookbot"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "user"

    UserId = Column(Integer, primary_key=True, index=True)
    UserEmail = Column(String, unique=True)
    UserName = Column(String)
    UserPassword = Column(String)
    UserBio = Column(String)
    Avatar = Column(String)
    Gender = Column(String)
    Google = Column(Boolean)
    

    book = relationship("Book", backref="user")
    question = relationship("Question", backref="question")
    comment = relationship("Comment", backref="bookcomment")
    # answer = relationship("Answer", backref="answer")


class Book(Base):
    __tablename__ = "book"

    BookId = Column(Integer, primary_key=True, index=True)
    BookName = Column(String)
    BookContent = Column(String)
    UserId = Column(Integer, ForeignKey("user.UserId"))
    Author = Column(String)
    Genre = Column(String)
    Published = Column(Boolean)
    CreateTime = Column(TIMESTAMP,default=datetime.datetime.now)

    question = relationship("Question", backref="book_question")

class Question(Base):
    __tablename__ = "question"

    QuestionId = Column(Integer, primary_key=True, index=True)
    QuestionContent = Column(String)
    QuestionAnswer = Column(String)
    UserId = Column(Integer, ForeignKey("user.UserId"))
    BookId = Column(Integer, ForeignKey("book.BookId"))
    CreateTime = Column(TIMESTAMP,default=datetime.datetime.now)

    comment = relationship("Comment", backref="book_comment")

class Comment(Base):
    __tablename__ = "comment"

    CommentId = Column(Integer, primary_key=True, index=True)
    Content = Column(String)
    UserId = Column(Integer, ForeignKey("user.UserId"))
    QuestionId = Column(Integer, ForeignKey("question.QuestionId"))
    CreateTime = Column(TIMESTAMP,default=datetime.datetime.now)

    # answer = relationship("Answer", backref="quest_answer")

# class Answer(Base):
#     __tablename__ = "answer"

#     AnswerId = Column(Integer, primary_key=True, index=True)
#     AnswerContent = Column(String)
#     Save = Column(Integer)
#     UserId = Column(Integer, ForeignKey("user.UserId"))
#     QuestionId = Column(Integer, ForeignKey("question.QuestionId"))

