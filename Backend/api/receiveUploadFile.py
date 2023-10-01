from fastapi import FastAPI, UploadFile, File, HTTPException
import shutil
from pathlib import Path

app = FastAPI()


@app.post("/posts")
async def upload_file(file: UploadFile = File(...)):
    try:

        upload_folder = Path("uploaded_files")
        upload_folder.mkdir(exist_ok=True)

        with (upload_folder / file.filename).open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return {
            "filename": file.filename,
            "content_type": file.content_type
        }
    except Exception as e:
        raise HTTPException(detail=f"An error occurred: {e}", status_code=400)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
