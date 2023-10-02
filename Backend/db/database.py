from sqlalchemy import create_engine, Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.orm import sessionmaker

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

    book = relationship("Book", backref="user")
    question = relationship("Question", backref="question")
    answer = relationship("Answer", backref="answer")


class Book(Base):
    __tablename__ = "book"

    BookId = Column(Integer, primary_key=True, index=True)
    BookName = Column(String)
    BookContent = Column(String)
    UserId = Column(Integer, ForeignKey("user.UserId"))

    question = relationship("Question", backref="book_question")

class Question(Base):
    __tablename__ = "question"

    QuestionId = Column(Integer, primary_key=True, index=True)
    QuestionContent = Column(String)
    UserId = Column(Integer, ForeignKey("user.UserId"))
    BookId = Column(Integer, ForeignKey("book.BookId"))

    answer = relationship("Answer", backref="quest_answer")

class Answer(Base):
    __tablename__ = "answer"

    AnswerId = Column(Integer, primary_key=True, index=True)
    AnswerContent = Column(String)
    Save = Column(Integer)
    UserId = Column(Integer, ForeignKey("user.UserId"))
    QuestionId = Column(Integer, ForeignKey("question.QuestionId"))

