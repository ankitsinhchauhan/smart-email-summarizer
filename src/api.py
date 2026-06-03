from fastapi import FastAPI, UploadFile, File, Form
from pydantic import BaseModel
from src.summarizer import summarize_text

app = FastAPI(title="Smart Email Summarizer")

class SummaryRequest(BaseModel):
    text: str
    max_length: int = 130
    min_length: int = 30

@app.get("/")
def home():
    return {"message": "Smart Email Summarizer Running"}

@app.post("/summarize")
def summarize(request: SummaryRequest):
    summary = summarize_text(
        request.text,
        request.max_length,
        request.min_length
    )

    return {
        "original_length": len(request.text),
        "summary": summary
    }

@app.post("/summarize-file")
async def summarize_file(
    file: UploadFile = File(...),
    max_length: int = Form(130),
    min_length: int = Form(30)
):
    content = await file.read()
    text = content.decode("utf-8", errors="ignore")

    summary = summarize_text(text, max_length, min_length)

    return {
        "filename": file.filename,
        "summary": summary
    }