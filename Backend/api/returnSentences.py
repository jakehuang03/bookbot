import re
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

    # Convert book to sequences of integers and keep positions
    positions = []
    sequences = []
    words = book.split()
    for word in words:
        seq = tokenizer.texts_to_sequences([word])[0]
        if seq:  # If the word is in the tokenizer's word index
            sequences.append(seq[0])
            positions.append(book.find(word, positions[-1] if positions else 0))

    # Pad sequences if max_sequence_length is given
    if max_sequence_length:
        sequences = pad_sequences([sequences], maxlen=max_sequence_length, padding='post', truncating='post')[0]

    # Convert sequences to tensor
    tensor = tf.convert_to_tensor(sequences, dtype=tf.int32)



    return tensor, tokenizer, positions


def find_word_in_tensor(word, tokenizer, tensor, positions):
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
    if not word_token:
        return []

    # Find positions in tensor
    tensor_indices = tf.where(tensor == word_token).numpy().flatten().tolist()
    positions_found = [positions[i] for i in tensor_indices]
    return positions_found


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
            #text += "\n"
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
    tensor, tokenizer, positions = book_to_tensor(bk, maxvocab)
    word_positions = find_word_in_tensor(word, tokenizer, tensor, positions)
    print(f"'{word}' found at positions: {word_positions}")
    return word_positions


def sentences_around_index(book, indices, x):
    """
    Get x sentences before and after (including) the sentence containing a word.

    :parameter
    - book (str): The book text.
    - indices (list): List of indices where the word was found.
    - x (int): Number of sentences before and after to retrieve.

    :return
    - context_sentences (dict): Dictionary where key is the index from indices and value is a list of sentences.
    """

    # Split the book into sentences
    sentences = re.split('(?<=[.!?])\s+', book)

    # For each index, find the sentence containing the word
    context_sentences = {}
    for index in indices:
        sentence_start_positions = [book.find(sentence) for sentence in sentences]
        sentence_containing_word_index = next(i for i, start_pos in enumerate(sentence_start_positions) if start_pos > index) - 1

        # Get x sentences before and after the current sentence
        start = max(0, sentence_containing_word_index - x)
        end = min(sentence_containing_word_index + x + 1, len(sentences))
        context_sentences[index] = sentences[start:end]

    return context_sentences


if __name__ == "__main__":
    bookname = "c.pdf"
    word = "come"
    word_positions = find(word, bookname)
    bk = pdf_to_string(bookname)
    """for pos in word_positions:
        start = max(0, pos-30)
        end = min(len(bk), pos+30+4)  # adding 4 for the length of "come" (as an example)
        print(f"Excerpt around position {pos}: ...{bk[start:end]}...")"""
    context = sentences_around_index(bk, word_positions, 2)
    for pos, surrounding_sentences in context.items():
        print(f"At position {pos}:")
        for sentence in surrounding_sentences:
            print(sentence)
        print("\n")
