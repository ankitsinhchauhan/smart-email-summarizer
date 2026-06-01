from fastapi import FastAPI
from pydantic import BaseModel

from summarizer import summarizer_text

app =FastAPI()

class EmailRequest(BaseModel):
    text : str

@app.get("/")
def home():
    return {"message": "Smart Email Summarizer Running"}

@app.post("/summarize")
def summarize(request: EmailRequest):
    
    summary = summarizer_text(request.text)

    return {
        "summary" : summary
    }

