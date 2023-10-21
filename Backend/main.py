from fastapi import FastAPI
from router.api import api_router
from fastapi.middleware.cors import CORSMiddleware

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