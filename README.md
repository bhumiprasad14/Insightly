# 🔍 Research Assistant – AI-Powered Chrome Extension

An AI-powered Chrome Extension that helps users understand lengthy online content by generating AI-based summaries using Google's Gemini API.

Users can select text from any webpage, generate concise summaries, and save important research notes directly inside the browser.

---

## 🚀 Project Overview

Research Assistant is a browser-based AI research tool designed to make online research faster and more efficient.

While browsing websites, users frequently encounter lengthy articles, technical documentation, research papers, and other information that can be difficult to understand manually.

This project aims to simplify that process by providing an AI-powered assistant directly inside Google Chrome.

Users can select text from a webpage and request an AI-generated summary. They can also save important research notes for future reference.

The application uses a Chrome Extension as its frontend, a Spring Boot backend for request processing, and Google's Gemini API for AI-powered text generation.

## 🎯 Project Objectives

- Simplify the process of understanding lengthy online content.
- Generate concise summaries using Artificial Intelligence.
- Provide a convenient way to save research notes.
- Integrate AI capabilities into the Chrome browsing experience.
- Develop a full-stack application using Java, Spring Boot, JavaScript, and REST APIs.

## ✨ Features

### 1. AI-Powered Text Summarization

- Select text from any webpage.
- Click the Summarize button in the extension.
- Send the selected content to the Spring Boot backend.
- Generate a concise summary using the Gemini API.
- Display the generated result inside the extension.

### 2. Research Notes

- Write important research notes.
- Save notes using Chrome's local storage.
- Retrieve previously saved notes when reopening the extension.

### 3. Loading Indicator

- Display a loading animation while the AI processes a request.
- Disable the action button during processing.
- Prevent accidental repeated submissions.

### 4. Browser Integration

- Built using Chrome Extension Manifest V3.
- Uses Chrome's scripting API to access selected webpage text.
- Provides a side-panel interface for easy access.

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
| JavaScript | Frontend functionality |
| HTML5 | Extension structure |
| CSS3 | Extension styling |
| Chrome Extension API | Browser integration |
| Chrome Storage API | Local note storage |
| Maven | Backend dependency management |
| Postman | REST API testing |

---

## 🏗️ System Architecture

The project follows a layered architecture.

```text
                  USER
                    |
             Google Chrome
                    |
          Chrome Extension UI
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
          AI-Generated Summary
                    |
          Chrome Extension UI
                    |
             Display Result
```

---

## 📁 Project Structure

The GitHub repository is organized into two main folders: the Chrome Extension frontend and the Spring Boot backend.

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

## ⚙️ How the Application Works

1. **Text Selection:** The user selects text from a webpage and clicks the Summarize button in the Chrome Extension.

2. **Request Handling:** JavaScript captures the selected text and sends it as a JSON request to the Spring Boot backend.

3. **Backend Processing:** The `ResearchController` receives the request and passes it to `ResearchService`, which prepares the prompt.

4. **AI Processing:** The backend sends the prompt to Google's Gemini API using WebClient and receives the generated summary.

5. **Displaying Results:** The backend returns the summary to the Chrome Extension, where it is displayed to the user.

---

## 🔧 Backend Setup

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
```

Replace `YOUR_MODEL` with a supported Gemini model.

Set the environment variable containing your API key before running the application.

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

Select text from any webpage and use the Summarize action.

---

## 🔗 API Documentation

### Endpoint: Process Research Content

**HTTP Method:** POST

**Endpoint:**

```text
/api/research/process
```

**Base URL:**

```text
http://localhost:8080
```

**Complete URL:**

```text
http://localhost:8080/api/research/process
```

### Request Headers

```http
Content-Type: application/json
```

### Request Body

```json
{
    "content": "Artificial Intelligence is transforming the technology industry.",
    "operation": "summarize"
}
```

### Currently Implemented Operation

| Operation | Description |
|---|---|
| `summarize` | Generates a concise summary of the provided content. |

### Successful Response

```text
HTTP Status: 200 OK
```

Example response:

```text
Artificial Intelligence is transforming the technology
industry by improving automation, productivity, and
decision-making across different sectors.
```

---

## 🤖 Gemini API Integration

Google Gemini is used as the AI engine of the application.

The backend communicates with Gemini through Spring WebClient.

### Why Gemini API?

- Provides AI-powered text generation.
- Processes user-provided textual content.
- Generates summaries.
- Supports integration through HTTP APIs.

### Prompt Generation

The backend creates a prompt based on the requested operation.

For summarization:

```text
Provide a clear and concise summary of the following text.
```

The selected content is appended to the prompt before sending it to Gemini.

### Response Processing

The Gemini API returns a JSON response.

The backend uses the `GeminiResponse` model and Jackson ObjectMapper to deserialize the JSON and extract the generated text.

---

## ⚙️ Configuration

### Chrome Extension Permissions

The Manifest V3 configuration uses permissions such as:

| Permission | Purpose |
|---|---|
| `activeTab` | Access the active tab when permitted. |
| `storage` | Store research notes locally. |
| `sidePanel` | Display the extension side panel. |
| `scripting` | Execute scripts to retrieve selected text. |

### Backend Configuration

| Property | Description |
|---|---|
| `server.port` | Port on which Spring Boot runs. |
| `gemini.api.url` | Gemini API endpoint. |
| `gemini.api.key` | Gemini API authentication key. |

---

## ⚠️ Error Handling

| Error | Possible Reason | Suggested Solution |
|---|---|---|
| No text selected | User did not select webpage text. | Ask the user to select text first. |
| Connection refused | Backend is not running. | Start the Spring Boot application. |
| 404 Not Found | Incorrect API endpoint. | Verify the frontend URL and controller mapping. |
| 400 Bad Request | Invalid JSON request. | Verify request body fields. |
| 401 Unauthorized | Invalid API key or authentication issue. | Verify Gemini API credentials. |
| 429 Too Many Requests | Gemini API quota or rate limit exceeded. | Check API usage and retry when permitted. |
| CORS Error | Frontend origin is not allowed. | Configure appropriate backend CORS settings. |
| 500 Internal Server Error | Backend processing failure. | Check Spring Boot application logs. |

---

## 🔐 Security Considerations

- Never expose the Gemini API key in frontend JavaScript files.
- Keep API credentials in environment variables or secure configuration.
- Avoid committing API keys to GitHub.
- Restrict CORS origins in production.
- Validate incoming request data.
- Handle API errors without exposing sensitive internal information.
- Sanitize AI-generated content before rendering it as HTML.

---

## 🚀 Future Enhancements

The following features are planned for future development:

- **Related Topic Suggestions:** Generate relevant topics and further-reading suggestions based on selected webpage content.
- **PDF Summarization:** Allow users to upload PDF documents and generate summaries.
- **Research History:** Maintain a history of previously generated summaries.
- **AI Chat:** Allow users to ask follow-up questions about selected content.
- **Export Notes:** Export saved notes as PDF or text files.
- **Bookmark Research:** Save useful webpages and their summaries.
- **Multi-language Support:** Generate summaries in different languages.
- **Improved Markdown Rendering:** Display AI responses with properly formatted headings, lists, and code blocks.
- **User Authentication:** Allow users to maintain personal research collections.

---

## 👩‍💻 Author

**Bhumi Prasad**

B.Tech – Computer Science and Engineering

Interests: Java Development, Spring Boot, Backend Development, and Artificial Intelligence.

---

## ⭐ Support

If you find this project interesting, consider giving the repository a star!

**Built with Java, Spring Boot, JavaScript, Chrome Extension APIs, and Google Gemini.**
