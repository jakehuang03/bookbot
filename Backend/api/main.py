import os
import uvicorn
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from simplecall import callwithquestions
from ToLLM.localLLMCall import localcall
from preLLM.KeyWordHuggingFace import extract
from preLLM.WordSearch import WordSearch
from typing import List

# Create FastAPI app
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

@app.get("/ask")
async def ask_question(request: Request):
    try:
        # Access the "book" and "questions" fields from the request_data dictionary
        book = request.query_params.get("book")
        question = request.query_params.get("question")
        print(question)
        s = book

        current_directory = os.path.dirname(__file__)
        folder_name = "upload_files"  # Replace with the name of your folder
        folder_path = os.path.join(current_directory, folder_name).replace('\\', '\\\\')

        path = os.path.join(folder_path, s)
        print(path)

        result = callwithquestions(path, question)
        
        res = {}
        res['answer'] = result['response']
        res['extractedpar'] = res['page']
        return result
    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Missing field: {e}")

    
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
