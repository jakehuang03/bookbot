import os

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, constr
from ToLLM.localLLMCall import localcall
from preLLM.KeyWordHuggingFace import extract
from preLLM.WordSearch import WordSearch
from typing import List

call = FastAPI()

class Question(BaseModel):
    file: constr(strict=True)
    questions: List[constr(strict=True)]

def callwithquestions(file, question):
    try:
        # initialize tensor and word finding
        bookname = file
        word2 = extract(question[0])
        word = word2[0]
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
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@call.get("/ask/")
def ask_question(question: Question):
    current_directory = os.path.dirname(__file__)
    folder_name = "upload_files"  # Replace with the name of your folder
    folder_path = os.path.join(current_directory, folder_name).replace('\\', '\\\\')
    s = question.book
    path = folder_path + '\\\\' +s
    return callwithquestions(path, question.questions)

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
@call.get("/ask2")
async def answer(book: str, question: str):
    # print(book, question)
    # answer = book + question + "answer"
    # # wording finding
    # result = {}
    # result['answer'] = answer
    # result['book'] = book
    # result['question'] = question
    return callwithquestions(book, question)
