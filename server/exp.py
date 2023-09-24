import string

import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import PyPDF2


def book_to_tensor(book, max_vocab_size, max_sequence_length=None):
    """
    Convert a book (string) into a tensor.

    :parameter
    - book (str): The book text.
    - max_vocab_size (int): Maximum number of words in the vocabulary.
    - max_sequence_length (int or None): Maximum length of the sequences. If None, the length of the longest sequence will be used.

    :return
    - tensor (tf.Tensor): A tensor representation of the book.
    - tokenizer (Tokenizer): The tokenizer used for the conversion (useful for inverse mapping).
    """

    # Initialize tokenizer
    tokenizer = Tokenizer(num_words=max_vocab_size, oov_token='<OOV>')
    tokenizer.fit_on_texts([book])

    # Convert book to sequences of integers
    sequences = tokenizer.texts_to_sequences([book])[0]

    # Pad sequences if max_sequence_length is given
    if max_sequence_length:
        sequences = pad_sequences([sequences], maxlen=max_sequence_length, padding='post', truncating='post')[0]

    # Convert sequences to tensor
    tensor = tf.convert_to_tensor(sequences, dtype=tf.int32)

    return tensor, tokenizer


def find_word_in_tensor(word, tokenizer, tensor):
    """
    Find a word in a tensor.

    :parameter
    - word (str): The word to search for.
    - tokenizer (Tokenizer): The tokenizer used to create the tensor.
    - tensor (tf.Tensor): The tensor representation of the text.

    :return
    - indices (list): List of indices where the word was found.
    """
    # Convert word to token ID
    word_token = tokenizer.word_index.get(word, None)

    # If word not in vocabulary, return an empty list
    if not word_token:
        return []

    # Find indices in tensor
    indices = tf.where(tensor == word_token).numpy().flatten().tolist()

    return indices


def pdf_to_string(pdf_filename):
    """
    Extracts text from a PDF file and returns it as a string.

    :parameter
    - pdf_filename (str): The name of the PDF file in the 'upload files' folder.

    :return
    - text (str): The extracted text from the PDF file.
    """

    folder_path = "uploaded_files"
    filepath = f"{folder_path}/{pdf_filename}"

    with open(filepath, 'rb') as file:
        # Initialize PDF reader
        reader = PyPDF2.PdfReader(file)

        # Extract text from each page and combine it
        text = ""
        for page_num in range(len(reader.pages)):
            text += "\n"
            text += reader.pages[page_num].extract_text()

    return text


def max_vocab(book_text):
    """
    Find out the max number of vocabulary in a book

    :parameter:
    - book_text (str): The string from the converted pdf.

    :return:
    - int: The max number of vocabulary in a book
    """

    # delete , .
    translator = str.maketrans('', '', string.punctuation)
    book_clean = book_text.translate(translator)

    # make all words and to lower case
    words = book_clean.lower().split()

    # remove duplicates
    unique_words = set(words)
    return len(unique_words)


def find(word, bookname):
    """
    Find out where the given word showed up in the book

    :parameter
    - word (str): The string from the converted pdf.
    - bookname (str): The name of the pdf file

    :return
    - indices (list of ints): the indices of the word that showed up
    """

    # initialize tensor
    bk = pdf_to_string(bookname)
    maxvocab = max_vocab(bk)
    tensor, tokenizer = book_to_tensor(bk, maxvocab)

    # find indices
    indices = find_word_in_tensor(word, tokenizer, tensor)
    print(f"'{word}' found at positions: {indices}")
    return indices


if __name__ == "__main__":
    # Example usage:
    find("time", "b.pdf")

    """book_content = pdf_to_string("b.pdf")
    maxvocab = max_vocab(book_content)
    tensor1, tokenizer1 = book_to_tensor(book_content, maxvocab)
    #print(tensor1)
    word_to_search = "time"
    indices2 = find_word_in_tensor(word_to_search, tokenizer1, tensor1)
    print(f"'{word_to_search}' found at positions: {indices2}")"""
