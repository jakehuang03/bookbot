import re
import PyPDF2


def pdf_to_string(pdf_filename):
    """
    Extracts text from a PDF file and returns it as a string.

    :parameter
    - pdf_filename (str): The name of the PDF file in the 'upload files' folder.

    :return
    - text (str): The extracted text from the PDF file.
    """

    folder_path = "../uploaded_files"
    filepath = f"{folder_path}/{pdf_filename}"

    with open(filepath, 'rb') as file:
        # Initialize PDF reader
        reader = PyPDF2.PdfReader(file)

        # Extract text from each page and combine it
        text = ""
        for page_num in range(len(reader.pages)):
            # text += "\n"
            text += reader.pages[page_num].extract_text()

    return text


def sentences_around_index(book, word, x):
    """
    Get x sentences before and after (including) the sentence containing a word.

    :parameter
    - book (str): The book text.
    - word (str): The word to search for.
    - x (int): Number of sentences before and after to retrieve.

    :return
    - context_sentences (dict): Dictionary where key is the index from indices and value is a list of sentences.
    """
    # Use regex to split the book into sentences
    sentences = re.split('(?<=[.!?])\s+', book)

    # Find the sentences containing the word
    indices_with_word = [i for i, sentence in enumerate(sentences) if word in sentence]

    context_sentences = {}
    for i in indices_with_word:
        start = max(0, i - x)
        end = min(i + x + 1, len(sentences))
        context_sentences[i] = sentences[start:end]

    return context_sentences


if __name__ == "__main__":
    bookname = "b.pdf"
    word = "director"
    bk = pdf_to_string(bookname)
    context = sentences_around_index(bk, word, 2)
    for i in context:
        print(context[i])
