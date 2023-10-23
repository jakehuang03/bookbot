import re
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from sqlalchemy import create_engine, Column, Integer, String, LargeBinary
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import pickle

DATABASE_URL = "mysql+pymysql://root:Bookbot123456!@104.198.232.175:3306/bookbot"

Base = declarative_base()
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

class BookTensor(Base):
    __tablename__ = "book_tensors"
    bookname = Column(String, primary_key=True, index=True)
    tensor = Column(LargeBinary)
    tokenizer = Column(LargeBinary)

Base.metadata.create_all(bind=engine)

class RetrieveBook:
    def __init__(self, bookname):
        self.bookname = bookname
        session = SessionLocal()
        self.tensor, self.tokenizer = self._retrieve_tensor_from_db(session)
        session.close()
        self.text = self._tensor_to_string()

    def _tensor_to_string(self):
        sequences = self.tensor.numpy().tolist()
        return self.tokenizer.sequences_to_texts([sequences])[0]

    def _retrieve_tensor_from_db(self, session):
        book_tensor = session.query(BookTensor).filter(BookTensor.bookname == self.bookname).first()
        if book_tensor:
            tensor = pickle.loads(book_tensor.tensor)
            tokenizer = pickle.loads(book_tensor.tokenizer)
            return tensor, tokenizer
        return None, None

class WordSearch:
    def __init__(self, text, tokenizer):
        self.text = text
        self.tokenizer = tokenizer

    def find_word(self, word):
        word_token = self.tokenizer.word_index.get(word, None)
        if not word_token:
            return []

        tensor = tf.convert_to_tensor(self.tokenizer.texts_to_sequences([self.text.split()])[0], dtype=tf.int32)
        tensor_indices = tf.where(tensor == word_token).numpy().flatten().tolist()
        return tensor_indices

    def sentences_around_index(self, indices, x=2):
        sentences = re.split('(?<=[.!?])\s+', self.text)
        context_sentences = {}
        for index in indices:
            sentence_start_positions = [self.text.find(sentence) for sentence in sentences]
            sentence_containing_word_index = next(
                i for i, start_pos in enumerate(sentence_start_positions) if start_pos > index) - 1
            start = max(0, sentence_containing_word_index - x)
            end = min(sentence_containing_word_index + x + 1, len(sentences))
            context_sentences[index] = sentences[start:end]
        return context_sentences

def main():
    bookname_in_db = "sample_book_name"  # Replace with a book name from your DB
    book = RetrieveBook(bookname_in_db)
    
    word_search = WordSearch(book.text, book.tokenizer)
    word_positions = word_search.find_word("example")
    context_sentences = word_search.sentences_around_index(word_positions)
    print(context_sentences)

if __name__ == "__main__":
    main()
