import os
from ToLLM.localLLMCall import localcall
from preLLM.KeyWordHuggingFace import extract
from preLLM.WordSearch import WordSearch

def callwithquestions(file, question):
    # initialize tensor and word finding
    bookname = file
    word2 = extract(question)
    print(word2[0])
    word = word2[0]
    word_search = WordSearch(bookname)
    word_positions = word_search.find_word(word)
    context = word_search.sentences_around_index(word_positions, 2)

    # wording finding
    for pos, surrounding_sentences in context.items():
        page_num = word_search.position_to_page_number(pos)
        print(f"At position {pos} (Page {page_num + 1}):")
        for sentence in surrounding_sentences:
            print(sentence)
        print("\n")

    # asking the llm
    response = localcall(context, question)
    print(response)

def ask_question(book, question):

        # Access the "book" and "questions" fields from the request_data dictionary
        s = book
        print(book)

        current_directory = os.path.dirname(__file__)
        folder_name = "upload_files"  # Replace with the name of your folder
        folder_path = os.path.join(current_directory, folder_name).replace('\\', '\\\\')

        path = os.path.join(folder_path, s)
        print(path)

        result = callwithquestions(path, question)
        return result

if __name__ == "__main__":
    question = "what do the director do?"
    ask_question("b.pdf", question)