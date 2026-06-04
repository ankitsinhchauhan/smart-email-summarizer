from src.preprocess import clean_text

def test_clean_text_removes_extra_spaces():
    text = "Hello     world"
    assert clean_text(text) == "Hello world"

def test_clean_text_empty():
    assert clean_text("") == ""

def test_clean_text_removes_url():
    text = "Read this https://example.com now"
    result = clean_text(text)
    assert "https://example.com" not in result