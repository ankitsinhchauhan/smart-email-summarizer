import re

def clean_text(text: str) -> str:
    if not text:
        return ""

    text = text.strip()
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"[\r\n]+", " ", text)

    return text