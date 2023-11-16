import db.crud
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
import shutil
from pathlib import Path
import os
router = APIRouter()

@router.post("")
async def upload_file(
    title: str = Form(...),
    author: str = Form(None),
    summary: str = Form(None),
    userid: int = Form(...),
    genre: str = Form(None),
    file: UploadFile = File(...),
):
    try:
        upload_folder = Path("./uploaded_files")
        upload_folder.mkdir(exist_ok=True)


        with (upload_folder / title).open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        if os.path.exists(upload_folder / title):
            print("file path exist")
            id = db.crud.create_book(
                name=title, author=author, summary=summary, userid=userid, genre=genre
            )
            return {"msg": "book uploaded", "bookid": id}
        
    except Exception as e:
        raise HTTPException(detail=f"An error occurred: {e}", status_code=400)

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

@router.get("/search")
async def searchBar(searchBook: str, genre: str):
    try:
        book = db.crud.get_book_by_name(searchBook, genre)
        if not book:
            raise HTTPException(status_code=404, detail="Book not found")
        return book
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"An error occurred: {e}")
    

@router.get("/{bookId}")
async def getBook(bookId: int):
    try:
        book = db.crud.get_book_by_id(bookId)
        print(book)
        if not book:
            raise HTTPException(status_code=404, detail="Book not found")
        return book
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"An error occurred: {e}")
    

@router.get("")
async def getBooks():
    try:
        books = db.crud.get_books()
        # print(books["BookId"])
        return books
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"An error occurred: {e}")