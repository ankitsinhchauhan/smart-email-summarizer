const inputText = document.getElementById("inputText");
const fileInput = document.getElementById("fileInput");
const fileInfo = document.getElementById("fileInfo");

const textTab = document.getElementById("textTab");
const fileTab = document.getElementById("fileTab");
const textPanel = document.getElementById("textPanel");
const filePanel = document.getElementById("filePanel");

const charCount = document.getElementById("charCount");
const summaryResult = document.getElementById("summaryResult");
const summaryBox = document.getElementById("summaryBox");
const errorMessage = document.getElementById("errorMessage");
const summarizeBtn = document.getElementById("summarizeBtn");
const spinner = document.getElementById("spinner");
const themeToggle = document.getElementById("themeToggle");

let activeMode = localStorage.getItem("activeMode") || "text";

setActiveMode(activeMode);

inputText.addEventListener("input", () => {
  charCount.innerText = `${inputText.value.length} characters`;
  clearMessage();
});

fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    fileInfo.innerText = `Selected: ${fileInput.files[0].name}`;
  } else {
    fileInfo.innerText = "No file selected";
  }

  clearMessage();
});

textTab.addEventListener("click", () => {
  setActiveMode("text");
});

fileTab.addEventListener("click", () => {
  setActiveMode("file");
});

themeToggle.addEventListener("click", () => {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme");

  if (currentTheme === "dark") {
    html.setAttribute("data-theme", "light");
    themeToggle.innerText = "☀️ Light Mode";
    localStorage.setItem("theme", "light");
  } else {
    html.setAttribute("data-theme", "dark");
    themeToggle.innerText = "🌙 Dark Mode";
    localStorage.setItem("theme", "dark");
  }
});

summarizeBtn.addEventListener("click", () => {
  if (activeMode === "text") {
    summarizeText();
  } else {
    summarizeFile();
  }
});

function setActiveMode(mode) {
  activeMode = mode;
  localStorage.setItem("activeMode", mode);

  if (mode === "text") {
    textTab.classList.add("active");
    fileTab.classList.remove("active");

    textPanel.classList.remove("hidden");
    filePanel.classList.add("hidden");
  } else {
    fileTab.classList.add("active");
    textTab.classList.remove("active");

    filePanel.classList.remove("hidden");
    textPanel.classList.add("hidden");
  }

  clearMessage();
}

function loadSavedTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  const html = document.documentElement;

  html.setAttribute("data-theme", savedTheme);

  if (savedTheme === "light") {
    themeToggle.innerText = "☀️ Light Mode";
  } else {
    themeToggle.innerText = "🌙 Dark Mode";
  }
}

loadSavedTheme();

async function summarizeText() {
  const text = inputText.value.trim();
  const maxLength = getMaxLength();
  const minLength = getMinLength();

  if (!validateLengths(minLength, maxLength)) return;

  if (text.length < 200) {
    showError("Please enter at least 200 characters.");
    return;
  }

  startLoading();

  try {
    const response = await fetch(
      "https://smart-email-summarizer-1.onrender.com/summarize",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          max_length: maxLength,
          min_length: minLength,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Server error. Please check your FastAPI backend.");
    }

    const data = await response.json();

    showSummary(data.summary);
  } catch (error) {
    showError(error.message);
    showPlaceholder("Something went wrong. Try again.");
  } finally {
    stopLoading();
  }
}

async function summarizeFile() {
  const file = fileInput.files[0];
  const maxLength = getMaxLength();
  const minLength = getMinLength();

  if (!validateLengths(minLength, maxLength)) return;

  if (!file) {
    showError("Please select a .txt file.");
    return;
  }

  if (!file.name.toLowerCase().endsWith(".txt")) {
    showError("Only .txt files are supported.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("max_length", maxLength);
  formData.append("min_length", minLength);

  startLoading();

  try {
    const response = await fetch(
      "https://smart-email-summarizer-1.onrender.com/summarize-file",
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error("Server error. Please check your FastAPI backend.");
    }

    const data = await response.json();

    showSummary(data.summary);
  } catch (error) {
    showError(error.message);
    showPlaceholder("Something went wrong. Try again.");
  } finally {
    stopLoading();
  }
}

function getMaxLength() {
  return parseInt(document.getElementById("maxLength").value);
}

function getMinLength() {
  return parseInt(document.getElementById("minLength").value);
}

function validateLengths(minLength, maxLength) {
  clearMessage();

  if (Number.isNaN(minLength) || Number.isNaN(maxLength)) {
    showError("Please enter valid summary lengths.");
    return false;
  }

  if (minLength >= maxLength) {
    showError("Min length must be smaller than max length.");
    return false;
  }

  return true;
}

function startLoading() {
  summarizeBtn.disabled = true;
  summarizeBtn.innerText = "Summarizing...";
  spinner.classList.add("show");
  summaryBox.classList.remove("active");
  showPlaceholder("Generating summary, please wait...");
}

function stopLoading() {
  summarizeBtn.disabled = false;
  summarizeBtn.innerText = "Generate Summary";
  spinner.classList.remove("show");
}

function showSummary(summary) {
  summaryResult.className = "";
  summaryResult.innerText = summary || "No summary received.";
  summaryBox.classList.add("active");
}

function showPlaceholder(message) {
  summaryResult.className = "muted";
  summaryResult.innerText = message;
}

function showError(message) {
  errorMessage.innerText = message;
}

function clearMessage() {
  errorMessage.innerText = "";
}
