# import shutil
# from pathlib import Path
# from fastapi import APIRouter, HTTPException, Request, UploadFile, File

# # from utils.preLLM import store_tensor_in_db, SessionLocal
# from utils.testFunction import ask_questions
# import tensorflow as tf
# from tensorflow.keras.preprocessing.text import Tokenizer
# import PyPDF2

# router = APIRouter()


# @router.get("/ask")
# async def ask_question(request: Request):
#     try:
#         book = request.query_params.get("book")
#         question = request.query_params.get("question")
#         # print(book)
#         # print(question)
#         res = ask_questions(book, question)
#         return res
#     except KeyError as e:
#         raise HTTPException(status_code=400, detail=f"Missing field: {e}")


# @router.post("/books2")
# async def upload_file(file: UploadFile = File(...)):
#     try:
#         upload_folder = Path("./uploaded_files")
#         upload_folder.mkdir(exist_ok=True)

#         with (upload_folder / file.filename).open("wb") as buffer:
#             shutil.copyfileobj(file.file, buffer)

#         return {"filename": file.filename, "content_type": file.content_type}
#     except Exception as e:
#         raise HTTPException(detail=f"An error occurred: {e}", status_code=400)


# @router.post("/books")
# async def upload_file(file: UploadFile = File(...)):
#     try:
#         # Save the uploaded file locally
#         upload_folder = Path("uploaded_files")
#         upload_folder.mkdir(exist_ok=True)

#         filepath = upload_folder / file.filename
#         with filepath.open("wb") as buffer:
#             shutil.copyfileobj(file.file, buffer)

#         # Convert PDF to string
#         with filepath.open("rb") as pdf_file:
#             reader = PyPDF2.PdfReader(pdf_file)
#             pages_text = [
#                 reader.pages[page_num].extract_text()
#                 for page_num in range(len(reader.pages))
#             ]

#         book_as_continuous_text = "".join(pages_text)

#         # Convert the string to a tensor
#         maxvocab = len(set(book_as_continuous_text.split()))
#         tokenizer = Tokenizer(num_words=maxvocab, oov_token="<OOV>")
#         tokenizer.fit_on_texts([book_as_continuous_text])
#         sequences = tokenizer.texts_to_sequences([book_as_continuous_text.split()])[0]
#         tensor = tf.convert_to_tensor(sequences, dtype=tf.int32)

#         # Store tensor and tokenizer to the database
#         session = SessionLocal()
#         store_tensor_in_db(file.filename, tensor, tokenizer, session)
#         session.close()

#         return {"filename": file.filename, "content_type": file.content_type}

#     except Exception as e:
#         raise HTTPException(detail=f"An error occurred: {e}", status_code=400)
