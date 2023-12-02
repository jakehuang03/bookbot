from pathlib import Path
import os
import re
import string
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import PyPDF2


class WordSearch:
    def __init__(self, bookname):
        self.bookname = bookname
        self.pages = self.pdf_to_string()
        self.book_as_continuous_text = ''.join(self.pages)
        self.maxvocab = self.max_vocab()
        self.tensor, self.tokenizer, self.positions = self.book_to_tensor()

    def pdf_to_string(self):
        """
        Extract text from a PDF file and return it as a string.
        """
        #folder_path = "./uploaded_files"
        #filepath = f"{folder_path}/{self.bookname}"

        # endfile = self.bookname
        
        # # Get the current directory of the script
        # current_directory = Path(__file__).parent

        # # Move up to the 'backend' directory
        # backend_directory = current_directory.parent.parent
        
        # filepath =backend_directory / "uploaded_files" / endfile
        
        isDigit = is_number(self.bookname)
        
        if isDigit:
            
            filepath = './uploaded_files/' + str(self.bookname) + '.pdf'
            
    
        else:
            
            if self.bookname[-4:].lower() != '.pdf':
        
                filepath = './uploaded_files/' + self.bookname + '.pdf'
        
            else:
            
                filepath = './uploaded_files/' + self.bookname

        print(filepath)
        
        if os.path.exists(filepath):
            print("file path exist")
        else:
            print("file path exist")
            
        with open(filepath, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            pages_text = [reader.pages[page_num].extract_text() for page_num in range(len(reader.pages))]

        return pages_text

    def max_vocab(self):
        """
        Find the max number of vocabulary in a book.
        """
        translator = str.maketrans('', '', string.punctuation)
        book_clean = self.book_as_continuous_text.translate(translator)
        words = book_clean.lower().split()
        unique_words = set(words)
        return len(unique_words)

    def book_to_tensor(self, max_sequence_length=None):
        """
        Convert a book (string) into a tensor.
        """
        tokenizer = Tokenizer(num_words=self.maxvocab, oov_token='<OOV>')
        tokenizer.fit_on_texts([self.book_as_continuous_text])

        positions = []
        sequences = []
        words = self.book_as_continuous_text.split()
        for word in words:
            seq = tokenizer.texts_to_sequences([word])[0]
            if seq:
                sequences.append(seq[0])
                positions.append(self.book_as_continuous_text.find(word, positions[-1] if positions else 0))

        if max_sequence_length:
            sequences = pad_sequences([sequences], maxlen=max_sequence_length, padding='post', truncating='post')[0]

        tensor = tf.convert_to_tensor(sequences, dtype=tf.int32)
        return tensor, tokenizer, positions

    def find_word(self, word):
        """
        Find a word in a tensor.
        """
        word_token = self.tokenizer.word_index.get(word, None)
        if not word_token:
            return []

        tensor_indices = tf.where(self.tensor == word_token).numpy().flatten().tolist()
        positions_found = [self.positions[i] for i in tensor_indices]
        return positions_found

    def sentences_around_index(self, indices, x):
        """
        Get x sentences before and after (including) the sentence containing a word.
        """
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

    def position_to_page_number(self, position):
        """
        Convert a position in the continuous text to a page number.
        """
        running_total = 0
        for page_num, page_text in enumerate(self.pages):
            running_total += len(page_text)
            if position < running_total:
                return page_num
        return -1

def is_number(s):
    try:
        float(s)  # for float and int types
        return True
    except ValueError:
        return False


# print(is_number("123"))
# print(is_number("123.456"))
# print(is_number("abc"))


"""    for pos in word_positions:
        start = max(0, pos-30)
        end = min(len(bk), pos+30+4)  # adding 4 for the length of "come" (as an example)
        print(f"Excerpt around position {pos}: ...{bk[start:end]}...")"""