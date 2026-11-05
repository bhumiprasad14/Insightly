# 🔍 Insightly – AI-Powered Research Assistant

**Turn Information into Intelligence.**

An AI-powered Chrome Extension that helps users understand, explore, and organize online content using Google's Gemini API.

Insightly allows users to select text from any webpage, generate concise summaries, discover related topics and further reading, and receive AI-generated responses in their preferred language.

---

## 🚀 Project Overview

Insightly is a browser-based AI research assistant designed to make online research faster and more efficient.

While browsing websites, users frequently encounter lengthy articles, technical documentation, research papers, and other information that can be difficult to understand manually.

Insightly simplifies this process by providing an AI-powered assistant directly inside Google Chrome.

Users can select text from a webpage and perform different AI-powered operations, including summarization and related topic suggestions. They can also choose their preferred response language and save important research notes for future reference.

The application uses a Chrome Extension as its frontend, a Spring Boot backend for request processing, Google's Gemini API for AI-powered text generation, and LibreTranslate as the external language source.

## 🎯 Project Objectives

- Simplify the process of understanding lengthy online content.
- Generate concise summaries using Artificial Intelligence.
- Suggest related topics and further reading resources.
- Support multilingual AI-generated responses.
- Provide a convenient way to save research notes.
- Integrate AI capabilities into the Chrome browsing experience.
- Develop a full-stack application using Java, Spring Boot, JavaScript, and REST APIs.

## ✨ Features

### 1. AI-Powered Text Summarization

- Select text from any webpage.
- Click the **Summarize** button in the extension.
- Send the selected content to the Spring Boot backend.
- Generate concise summaries using the Gemini API.
- Display the generated summary inside the extension.

### 2. AI-Powered Related Topic Suggestions

- Select content from any webpage.
- Click the **Suggest** button.
- Generate relevant topics related to the selected content.
- Discover additional learning resources and further reading materials.
- Receive website links for exploring topics in greater depth.
- Display suggestions with formatted headings and content.

### 3. Multilingual Support

- Dynamically retrieve available languages using the LibreTranslate Languages API.
- Display available languages in a dropdown menu.
- Select a preferred language for AI-generated responses.
- Generate summaries and suggestions in the selected language.
- English is selected as the default language when no other language is chosen.

### 4. Research Notes

- Write important research notes directly inside the extension.
- Save notes using Chrome's local storage.
- Retrieve previously saved notes when reopening the extension.

### 5. Loading Indicator

- Display a loading animation while the AI processes a request.
- Disable the corresponding action button during processing.
- Prevent accidental repeated submissions.

### 6. Browser Integration

- Built using Chrome Extension Manifest V3.
- Uses Chrome's scripting API to access selected webpage text.
- Provides a side-panel interface for easy access.
- Allows users to research content without leaving the current webpage.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Java | Backend programming language |
| Spring Boot | Backend application framework |
| Spring Web | REST API development |
| Spring WebFlux | WebClient for external API communication |
| Lombok | Reduces boilerplate Java code |
| Google Gemini API | AI-powered text generation |
| LibreTranslate API | Dynamic language list |
| JavaScript | Frontend functionality |
| HTML5 | Extension structure |
| CSS3 | Extension styling |
| Chrome Extension API | Browser integration |
| Chrome Storage API | Local note storage |
| Maven | Backend dependency management |
| Postman | REST API testing |

---

## 🏗️ System Architecture

The application follows a client-server architecture.

```text
                  USER
                    |
              Google Chrome
                    |
             Insightly Extension
                (HTML/CSS/JS)
                    |
              Selected Text
                    |
             HTTP POST Request
                    |
            Spring Boot Backend
                    |
             ResearchController
                    |
              ResearchService
                    |
               Gemini API
                    |
             AI-Generated Response
                    |
             Chrome Extension UI
                    |
               Display Result
```

The language selection feature uses a separate flow:

```text
          LibreTranslate API
                    |
             LanguageService
                    |
            LanguageController
                    |
             Language List
                    |
          Insightly Dropdown
                    |
           Selected Language
                    |
              ResearchService
                    |
               Gemini API
```

---

## 📁 Project Structure

```text
ResearchAssistant/
│
├── Research-Assistant-Extension/
│   ├── background.js
│   ├── manifest.json
│   ├── sidepanel.css
│   ├── sidepanel.html
│   └── sidepanel.js
│
├── assistant/
│   ├── .mvn/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── research/
│   │   │   │           └── assistant/
│   │   │   │               ├── AssistantApplication.java
│   │   │   │               ├── GeminiResponse.java
│   │   │   │               ├── ResearchController.java
│   │   │   │               ├── ResearchRequest.java
│   │   │   │               ├── ResearchService.java
│   │   │   │               ├── Language.java
│   │   │   │               ├── LanguageController.java
│   │   │   │               ├── LanguageService.java
│   │   │   │               └── WebClientConfig.java
│   │   │   │
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   │
│   │   └── test/
│   │
│   ├── pom.xml
│   └── ...
│
├── .gitattributes
├── .gitignore
└── README.md
```

---

## ⚙️ Backend Setup

### Prerequisites

Install the following:

- Java Development Kit (JDK).
- Maven.
- IntelliJ IDEA or another Java IDE.
- Google Gemini API key.
- Postman (optional, for API testing).

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/ResearchAssistant.git
```

Navigate to the backend directory:

```bash
cd ResearchAssistant/assistant
```

### Step 2: Configure Gemini API

Obtain an API key through Google AI Studio.

Configure the following properties in `application.properties`:

```properties
server.port=8080

gemini.api.url=https://generativelanguage.googleapis.com/v1beta/models/YOUR_MODEL:generateContent

gemini.api.key=${GEMINI_API_KEY}

languages.api.url=https://libretranslate.com/languages
```

Replace `YOUR_MODEL` with a supported Gemini model.

Set the environment variable containing your Gemini API key before running the application.

### Step 3: Install Dependencies

```bash
mvn clean install
```

### Step 4: Run the Spring Boot Application

```bash
mvn spring-boot:run
```

The backend will start at:

```text
http://localhost:8080
```

---

## 🌐 Chrome Extension Setup

### Step 1: Open Google Chrome

Navigate to:

```text
chrome://extensions/
```

### Step 2: Enable Developer Mode

Enable the Developer Mode option in the top-right corner.

### Step 3: Load the Extension

1. Click on **Load unpacked**.
2. Select the `Research-Assistant-Extension` folder.
3. The extension will appear in the installed extensions list.

### Step 4: Open the Extension

Click the extension icon and open its side panel.

Select text from any webpage, choose a language, and use the Summarize or Suggest action.

---

## 🔗 API Documentation

### 1. Process Research Content

**HTTP Method:** POST

**Endpoint:**

```text
/api/research/process
```

**Complete URL:**

```text
http://localhost:8080/api/research/process
```

**Request Headers:**

```http
Content-Type: application/json
```

**Request Body:**

```json
{
    "content": "Artificial Intelligence is transforming the technology industry.",
    "operation": "summarize",
    "language": "en"
}
```

**Supported Operations:**

| Operation | Description |
|---|---|
| `summarize` | Generates a concise summary of the provided content. |
| `suggest` | Suggests related topics and further reading resources. |

**Language Field:**

The `language` field contains the selected language code.

Examples:

| Language | Code |
|---|---|
| English | `en` |
| Hindi | `hi` |
| Bengali | `bn` |

The available languages are retrieved dynamically from the language provider rather than being maintained as a fixed list in the application.

If no language is selected, English is used as the default.

**Successful Response:**

```text
HTTP Status: 200 OK
```

The API returns the generated AI response as text.

### 2. Get Available Languages

**HTTP Method:** GET

**Endpoint:**

```text
/api/languages
```

**Complete URL:**

```text
http://localhost:8080/api/languages
```

**Description:**

Retrieves the available language codes and names from the external LibreTranslate language endpoint through the Spring Boot backend.

**Example Response:**

```json
[
    {
        "code": "en",
        "name": "English"
    },
    {
        "code": "hi",
        "name": "Hindi"
    },
    {
        "code": "bn",
        "name": "Bengali"
    }
]
```

The frontend uses this response to populate the language dropdown dynamically.

---

## 🤖 Gemini API Integration

Google Gemini is used as the AI engine of the application.

The backend communicates with Gemini through Spring WebClient.

### Why Gemini API?

- Provides AI-powered text generation.
- Processes user-provided textual content.
- Generates concise summaries.
- Suggests related topics and further reading.
- Generates responses according to the selected language.
- Supports integration through HTTP APIs.

### Dynamic Prompt Generation

The backend creates prompts based on the requested operation.

For summarization, the prompt instructs Gemini to generate a clear and concise summary.

For suggestions, the prompt instructs Gemini to recommend related topics, further reading materials, and relevant website links.

The selected language is also included in the prompt so that Gemini generates the response in the user's preferred language.

### Response Processing

The Gemini API returns a JSON response.

The backend uses the `GeminiResponse` model and Jackson ObjectMapper to deserialize the JSON and extract the generated text.

---

## 🌍 Multilingual Integration

Insightly uses the LibreTranslate Languages API to retrieve language information dynamically.

The backend's `LanguageService` communicates with the external API using WebClient.

The `LanguageController` exposes the available languages through the `/api/languages` endpoint.

The frontend fetches this endpoint and dynamically creates dropdown options using JavaScript.

When a user selects a language, its code is included in the research request. The `ResearchService` identifies the corresponding language name and adds it to the Gemini prompt.

This allows both summarization and topic suggestions to be generated in the selected language.

---

## 🔐 Security Considerations

- Never expose the Gemini API key in frontend JavaScript files.
- Keep API credentials in environment variables or secure configuration.
- Avoid committing API keys to GitHub.
- Restrict CORS origins in production.
- Validate incoming request data.
- Sanitize AI-generated content before rendering it as HTML.

---

## 🚀 Future Enhancements

The following features are planned for future development:

- **PDF Summarization:** Allow users to upload PDF documents and generate summaries.
- **Research History:** Maintain a history of previously generated summaries.
- **AI Chat:** Allow users to ask follow-up questions about selected content.
- **Export Notes:** Export saved notes as PDF or text files.
- **Bookmark Research:** Save useful webpages and their summaries.
- **Improved Markdown Rendering:** Display AI responses with properly formatted headings, lists, tables, and code blocks.
- **User Authentication:** Allow users to maintain personal research collections.

---

## 👩‍💻 Author

**Bhumi Prasad**

B.Tech – Computer Science and Engineering

Interests: Java Development, Spring Boot, Backend Development, and Artificial Intelligence.

---

## ⭐ Support

If you find this project interesting, consider giving the repository a star!

**Built with Java, Spring Boot, JavaScript, Chrome Extension APIs, LibreTranslate, and Google Gemini.**
