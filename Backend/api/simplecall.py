import os

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, constr
from ToLLM.localLLMCall import localcall
from preLLM.KeyWordHuggingFace import extract
from preLLM.WordSearch import WordSearch
from typing import List

app = FastAPI()

class Question(BaseModel):
    book: str
    question: str

def callwithquestions(file, question):

    # initialize tensor and word finding
    bookname = file
    word2 = extract(question)
    print(word2)
    word = word2[0]
    print(word)
    word_search = WordSearch(bookname)
    word_positions = word_search.find_word(word)
    context = word_search.sentences_around_index(word_positions, 2)

    # wording finding
    result = {}
    for pos, surrounding_sentences in context.items():
        page_num = word_search.position_to_page_number(pos)
        result[f"At position {pos} (Page {page_num + 1}):"] = surrounding_sentences

    # asking the llm
    response = localcall(context, question)
    result['response'] = response
    return result


@app.get("/ask/")
async def ask_question(book: str, question: str):
    try:
        # Access the "book" and "questions" fields from the request_data dictionary
        s = book

        current_directory = os.path.dirname(__file__)
        folder_name = "upload_files"  # Replace with the name of your folder
        folder_path = os.path.join(current_directory, folder_name).replace('\\', '\\\\')

        path = os.path.join(folder_path, s)

        result = callwithquestions(path, question)
        return result
    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Missing field: {e}")

"""testing_procedures:
    open postman
    set method to "POST"
    and the following url:"http://127.0.0.1:8000/ask/"
    and go to "BODY"
    then "RAW" with "JSON"
    with the following info:
    {
      "file": "C:\\file\\path\\of\\the\\book.pdf",
      "questions": ["What do the director do?","another one?"]
    }
    """
