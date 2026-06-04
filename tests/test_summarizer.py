from src.summarizer import summarize_text


def test_summarize_short_text():
    text = "Hello world."
    result = summarize_text(text)

    assert result == "Text is too short to summarize."


def test_summarize_valid_text():
    text = """
    Artificial intelligence is changing the way people work and learn.
    It helps users write, summarize, translate, and understand large amounts of information.
    Many companies use AI tools to save time and improve productivity.
    Students also use AI to understand difficult topics and prepare better notes.
    """

    result = summarize_text(text, max_length=60, min_length=20)

    assert isinstance(result, str)
    assert len(result) > 0