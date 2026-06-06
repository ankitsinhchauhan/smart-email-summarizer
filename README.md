# Smart Email Summarizer

Smart Email Summarizer is a simple AI-based web application that summarizes long emails, articles, and text documents into short and meaningful summaries.

This project is developed using FastAPI, Python, HTML, CSS, and JavaScript.

---

# Features

- Text summarization
- File upload summarization (.txt)
- Dark and Light mode
- Responsive UI
- FastAPI backend
- AI summarization using BART model

---

# Technologies Used

## Frontend

- HTML
- CSS
- JavaScript

## Backend

- Python
- FastAPI
- Transformers
- Torch

---

# Project Structure

```text
smart-email-summarizer/
├── src/
├── tests/
├── scripts/
├── ui/
├── requirements.txt
├── pytest.ini
├── .gitignore
└── README.md
```

---

# Installation

## Create Virtual Environment

```bash
py -3.11 -m venv venv
```

---

## Activate Virtual Environment

```bash
venv\Scripts\activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

# Run Backend

```bash
uvicorn src.api:app --reload
```

---

# Run Frontend

```bash
cd ui
python -m http.server 5500
```

Open:

```text
http://127.0.0.1:5500
```

---

# Run Tests

```bash
pytest
```

---

# Supported File Type

- .txt

---

# Future Improvements

- PDF support
- DOCX support
- Download summary option

---
