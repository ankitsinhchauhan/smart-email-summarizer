from src.summarizer import summarize_text


def test_summarize_text_returns_summary():
    text = """
    Artificial Intelligence is transforming industries by automating tasks
    and improving efficiency. Many companies are adopting AI technologies
    for better productivity and decision making.
    """

    summary = summarize_text(text)

    assert isinstance(summary, str)
    assert len(summary) > 0


def test_summarize_short_text():
    text = "Hello"

    summary = summarize_text(text)

    assert summary == "Text is too short to summarize."