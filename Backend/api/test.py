import os
from fastapi import FastAPI, HTTPException, Request, UploadFile,File
from fastapi.middleware.cors import CORSMiddleware

from ToLLM.localLLMCall import localcall
from preLLM.KeyWordHuggingFace import extract
from preLLM.WordSearch import WordSearch

app = FastAPI()

# Configure CORS (Cross-Origin Resource Sharing)
origins = ["*"]  # Replace with your frontend URL
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def callwithquestions(file, question):
    # Your existing code for processing the question
    bookname = file
    word2 = extract(question)
    print(word2)
    word = word2[0]
    print(word)
    word_search = WordSearch(bookname)
    word_positions = word_search.find_word(word)
    context = word_search.sentences_around_index(word_positions, 2)

    # wording finding
    result = {"extractedpar": {}}

    for pos, surrounding_sentences in context.items():
        page_num = word_search.position_to_page_number(pos)
        result["extractedpar"][f"Page {page_num + 1}"] = surrounding_sentences
        print(f"At position {pos} (Page {page_num + 1}):")
        for sentence in surrounding_sentences:
            print(sentence)
        print("\n")

    # asking the llm
    response = localcall(context, question)
    result['response'] = response
    return result

def ask_questions(book, question):
    try:
        # Access the "book" and "questions" fields from the request_data dictionary
        s = book
        current_directory = os.path.dirname(__file__)
        folder_name = "upload_files"  # Replace with the name of your folder
        folder_path = os.path.join(current_directory, folder_name).replace('\\', '\\\\')
        path = os.path.join(folder_path, s)
        result = callwithquestions(path, question)

        res = {}
        res['answer'] = result['response']
        res['extractedpar'] = result['extractedpar']
        res['book'] = book[:-4]
        res['question'] = question

        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/ask")
async def ask_endpoint(request_data: Request):
    try:
        book = request_data.get("book")
        question = request_data.get("question")

        if not book or not question:
            raise HTTPException(status_code=400, detail="Both 'book' and 'question' fields are required.")

        response = ask_questions(book, question)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
