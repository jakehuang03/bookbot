import os
import re
import string
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import PyPDF2
from sqlalchemy import create_engine, Column, Integer, String, LargeBinary
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import pickle

DATABASE_URL = "sqlite:///./books.db"

Base = declarative_base()
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)


class BookTensor(Base):
    __tablename__ = "book_tensors"
    bookname = Column(String, primary_key=True, index=True)
    tensor = Column(LargeBinary)
    tokenizer = Column(LargeBinary)


Base.metadata.create_all(bind=engine)


class BookToTensor:
    def __init__(self, bookname):
        self.bookname = bookname
        self.pages = self.pdf_to_string()
        self.book_as_continuous_text = ''.join(self.pages)
        self.maxvocab = self.max_vocab()
        self.tensor, self.tokenizer = self.book_to_tensor()

        session = SessionLocal()
        store_tensor_in_db(self.bookname, self.tensor, self.tokenizer, session)
        session.close()

    def pdf_to_string(self):
        script_dir = os.path.dirname(os.path.abspath(__file__))
        api_dir = os.path.dirname(script_dir)
        filepath = os.path.join(api_dir, 'uploaded_files', self.bookname)

        with open(filepath, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            pages_text = [reader.pages[page_num].extract_text() for page_num in range(len(reader.pages))]

        return pages_text

    def max_vocab(self):
        translator = str.maketrans('', '', string.punctuation)
        book_clean = self.book_as_continuous_text.translate(translator)
        words = book_clean.lower().split()
        unique_words = set(words)
        return len(unique_words)

    def book_to_tensor(self):
        tokenizer = Tokenizer(num_words=self.maxvocab, oov_token='<OOV>')
        tokenizer.fit_on_texts([self.book_as_continuous_text])

        sequences = tokenizer.texts_to_sequences([self.book_as_continuous_text.split()])[0]
        tensor = tf.convert_to_tensor(sequences, dtype=tf.int32)

        return tensor, tokenizer


class WordSearchFromDB:
    def __init__(self, bookname):
        self.bookname = bookname
        session = SessionLocal()
        self.tensor, self.tokenizer = retrieve_tensor_from_db(self.bookname, session)
        session.close()
        self.book_as_continuous_text = ''.join(self.pages)  # Required for the following methods

    def find_word(self, word):
        word_token = self.tokenizer.word_index.get(word, None)
        if not word_token:
            return []

        tensor_indices = tf.where(self.tensor == word_token).numpy().flatten().tolist()
        return tensor_indices

    def sentences_around_index(self, indices, x=2):
        sentences = re.split('(?<=[.!?])\s+', self.book_as_continuous_text)
        context_sentences = {}
        for index in indices:
            sentence_start_positions = [self.book_as_continuous_text.find(sentence) for sentence in sentences]
            sentence_containing_word_index = next(
                i for i, start_pos in enumerate(sentence_start_positions) if start_pos > index) - 1
            start = max(0, sentence_containing_word_index - x)
            end = min(sentence_containing_word_index + x + 1, len(sentences))
            context_sentences[index] = sentences[start:end]

        return context_sentences


def store_tensor_in_db(bookname, tensor, tokenizer, session):
    tensor_binary = pickle.dumps(tensor)
    tokenizer_binary = pickle.dumps(tokenizer)

    book_tensor = BookTensor(
        bookname=bookname,
        tensor=tensor_binary,
        tokenizer=tokenizer_binary
    )
    session.add(book_tensor)
    session.commit()


def retrieve_tensor_from_db(bookname, session):
    book_tensor = session.query(BookTensor).filter(BookTensor.bookname == bookname).first()
    if book_tensor:
        tensor = pickle.loads(book_tensor.tensor)
        tokenizer = pickle.loads(book_tensor.tokenizer)
        return tensor, tokenizer
    return None, None

def main():
    # Example usage:
    # Convert a PDF to a tensor and store it in the database
    # change sample_book.pdf to the ones we do not have in database
    book_processor = BookToTensor("sample_book.pdf")

    # Retrieve the tensor from the database and perform word searches
    word_search = WordSearchFromDB("sample_book.pdf")
    word_positions = word_search.find_word("example")
    context_sentences = word_search.sentences_around_index(word_positions)
    print(context_sentences)

if __name__ == "__main__":
    main()
