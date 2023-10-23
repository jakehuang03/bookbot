from fastapi import FastAPI, Request, HTTPException
from router.api import api_router
from fastapi.middleware.cors import CORSMiddleware

from temp370Project.Backend.db.crud import get_book_by_name

app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.get("/ask")
async def answer(book: str, question: str):
    # use bookid and userid 
    # find bookname with bookid in db
    # if no such book then return error
    # else proceed
    print(book, question)
    answer = [{'id': 1,
              'answer': book + question + "answer"}, 
                {'id': 2,
                'answer': book + question + "answer"}]
    extractedpar = "extracted book"
    # wording finding
    result = {}
    result['answer'] = answer
    result['extractedpar'] = extractedpar
    result['book'] = book
    result['question'] = question
    return result

@app.get("/books/search")
async def searchBar(request: Request):
    try:
        bookname = request.query_params.get("searchBook")
        genre = request.query_params.get("genre")

        return get_book_by_name(bookname, genre)
    except Exception as e:
        raise HTTPException(detail=f"An error occurred: {e}", status_code=400)
    
