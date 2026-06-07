from transformers import pipeline
from src.preprocess import clean_text

MODEL_NAME = "sshleifer/distilbart-cnn-12-6"

summarizer_pipeline = pipeline(
    "summarization",
    model=MODEL_NAME
)

def summarize_text(
    text: str,
    max_length: int = 130,
    min_length: int = 30
) -> str:
    cleaned_text = clean_text(text)

    if len(cleaned_text) < 100:
        return "Text is too short to summarize."

    result = summarizer_pipeline(
    cleaned_text,
    max_length=max_length,
    min_length=min_length,
    do_sample=False,
    truncation=True
    )

    return result[0]["summary_text"]