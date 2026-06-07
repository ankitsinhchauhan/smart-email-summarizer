from transformers import pipeline
from src.preprocess import clean_text

# Lightweight model for free hosting platforms
MODEL_NAME = "sshleifer/distilbart-cnn-12-6"

# Load summarization pipeline
summarizer_pipeline = pipeline(
    task="summarization",
    model=MODEL_NAME
)


def summarize_text(
    text: str,
    max_length: int = 130,
    min_length: int = 30
) -> str:

    # Clean input text
    cleaned_text = clean_text(text)

    # Validate minimum text length
    if len(cleaned_text) < 100:
        return "Text is too short to summarize."

    try:
        # Generate summary
        result = summarizer_pipeline(
            cleaned_text,
            max_length=max_length,
            min_length=min_length,
            do_sample=False,
            truncation=True
        )

        # Return summary text
        return result[0]["summary_text"]

    except Exception as error:
        # Handle model/runtime errors
        return f"Summarization error: {str(error)}"