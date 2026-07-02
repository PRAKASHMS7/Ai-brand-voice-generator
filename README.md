# 🚀 AI Brand Voice Generator

### Intelligent Brand Strategy Generation using **Retrieval-Augmented Generation (RAG), FastAPI, ChromaDB & Large Language Models**

<p align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![OpenRouter](https://img.shields.io/badge/OpenRouter-LLM-black?style=for-the-badge)
![RAG](https://img.shields.io/badge/RAG-Retrieval--Augmented--Generation-success?style=for-the-badge)
![ChromaDB](https://img.shields.io/badge/ChromaDB-VectorDB-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

</p>

<p align="center">

**An Enterprise-Grade AI Application that generates professional Brand Voice Guidelines using Retrieval-Augmented Generation (RAG), FastAPI, ChromaDB, Sentence Transformers, and OpenRouter-powered Large Language Models.**

</p>

---

# 🌐 Live Demo

> 🚧 **Coming Soon**

The application can be run locally using the installation guide below.

---

# 🎯 About the Project

Building a consistent brand identity is one of the biggest challenges for modern businesses.

Traditional AI generators often produce **generic responses** because they rely only on the pretrained knowledge of Large Language Models.

This project solves that challenge by implementing a **Retrieval-Augmented Generation (RAG)** pipeline.

Instead of relying only on the LLM, the application first gathers company-specific knowledge from multiple sources including:

- 🌐 Company Website
- 📄 PDF Documents
- 📝 DOCX Documents

The extracted knowledge is processed into semantic embeddings, stored inside **ChromaDB**, retrieved using similarity search, and injected into the AI prompt before generation.

This allows the AI model to produce:

- ✅ Personalized Brand Voice
- ✅ Accurate Brand Messaging
- ✅ Company-specific Marketing Assets
- ✅ Context-aware Customer Insights
- ✅ Strategic Brand Guidelines

---

# ✨ Why This Project?

This project demonstrates how modern **Generative AI** applications can combine:

- Retrieval-Augmented Generation (RAG)
- Vector Databases
- Semantic Search
- Prompt Engineering
- Full-Stack Development

to build an enterprise-ready AI solution instead of a simple chatbot.

It showcases practical implementation of modern AI engineering concepts used in production systems.

---

# 🌟 Key Highlights

- 🤖 AI-powered Brand Voice Generation
- 🧠 Retrieval-Augmented Generation (RAG)
- 🌐 Website Crawling using Playwright
- 📄 PDF & DOCX Knowledge Extraction
- 🔍 Semantic Search using ChromaDB
- 📐 Sentence Embeddings using **BAAI/bge-small-en-v1.5**
- ⚡ FastAPI Backend
- 🎨 Modern SaaS-inspired UI
- 📑 Professional PDF Export
- 📋 Copy Individual Sections
- 🔄 Automatic LLM Model Fallback
- 🛡 Robust JSON Validation
- 📊 Strategic Brand Analysis

---

# 🧠 Why Retrieval-Augmented Generation (RAG)?

Traditional Large Language Models generate responses only from their pretrained knowledge.

That means:

- Information can become outdated.
- Company-specific details are unavailable.
- Responses become generic.

Retrieval-Augmented Generation (RAG) solves this by retrieving relevant company information **before** calling the LLM.

The retrieved knowledge becomes the **primary source of truth** during generation.

This project retrieves knowledge from:

- Company Website
- PDF Files
- DOCX Files

The retrieved context is injected into the prompt, allowing the AI to generate responses that are:

- 🎯 Personalized
- 📚 Knowledge Grounded
- 🏢 Business Specific
- ✅ More Accurate
- 💡 Context Aware

---
## 📸 Application Preview

| Home Screen 1 | Home Screen 2 |
|--------------|---------------|
| ![Home Screen 1](./screenshots/home1.png) | ![Home Screen 2](./screenshots/home2.png) |


---

# 🏗️ High-Level System Architecture

```text
                         User
                           │
                           ▼
         React + TypeScript + Tailwind CSS
                           │
                           ▼
                    FastAPI Backend
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
 Website Crawler      PDF Parser       DOCX Parser
   (Playwright)        (PyPDF)       (python-docx)
        │                  │                  │
        └──────────────────┼──────────────────┘
                           ▼
                   Text Cleaning
                           ▼
                     Text Chunking
                           ▼
            Sentence Transformer Embeddings
                           ▼
                    ChromaDB Vector Store
                           ▼
                  Semantic Similarity Search
                           ▼
                    Retrieved Context
                           ▼
                     Prompt Builder
                           ▼
                      OpenRouter API
                           ▼
           Claude • GPT-4o • Gemini Models
                           ▼
                     Structured JSON
                           ▼
            Interactive Brand Dashboard
                           ▼
             Copy • Export PDF • Regenerate
```

---

# 📋 Architecture Components

| Component | Responsibility |
|-----------|----------------|
| React | Builds the interactive frontend |
| Tailwind CSS | Responsive SaaS UI |
| FastAPI | Backend API Layer |
| Playwright | Website Crawling |
| PyPDF | PDF Text Extraction |
| python-docx | DOCX Text Extraction |
| Chunker | Splits text into semantic chunks |
| Sentence Transformers | Converts text into embeddings |
| ChromaDB | Stores semantic vectors |
| Retriever | Finds relevant knowledge |
| Prompt Builder | Creates optimized AI prompt |
| OpenRouter | Routes requests to AI models |
| Claude / GPT / Gemini | Generates Brand Strategy |

---

# 🔄 End-to-End Workflow

The following workflow illustrates how the application processes user input and generates a personalized Brand Voice Guide.

```text
                      USER
                        │
                        ▼
      Enter Brand Details & Upload Documents
                        │
                        ▼
                 React Frontend (UI)
                        │
                        ▼
              FastAPI Backend Receives Request
                        │
        ┌───────────────┼────────────────┐
        ▼               ▼                ▼
 Website URL      PDF Document      DOCX Document
        │               │                │
        └───────────────┼────────────────┘
                        ▼
            Extract & Clean Raw Text
                        ▼
             Semantic Text Chunking
                        ▼
        Sentence Transformer Embeddings
                        ▼
         Store Embeddings in ChromaDB
                        ▼
         Semantic Similarity Retrieval
                        ▼
      Retrieve Company Knowledge Context
                        ▼
              Prompt Builder (.ts)
                        ▼
                OpenRouter Gateway
                        ▼
        Claude / GPT-4o / Gemini Models
                        ▼
            Structured JSON Response
                        ▼
             JSON Validation & Parsing
                        ▼
        Interactive Brand Voice Dashboard
                        ▼
       Copy • Export PDF • Regenerate
```

---

# 🚀 Core Features

## 🤖 AI Generation

Generate enterprise-quality brand strategies using state-of-the-art Large Language Models.

### Supported Models

- Claude
- GPT-4o
- Gemini

### AI Capabilities

- Prompt Engineering
- Automatic Model Fallback
- Structured JSON Generation
- Brand Strategy Generation
- Marketing Content Creation
- Customer Insight Analysis
- Brand Messaging Optimization

---

## 🧠 Retrieval-Augmented Generation (RAG)

Instead of relying solely on the AI model's pretrained knowledge, the application enriches every request using company-specific information.

### Knowledge Sources

- 🌐 Website Crawling
- 📄 PDF Documents
- 📝 DOCX Documents

### RAG Pipeline

- Website Crawling using Playwright
- Document Parsing
- Text Cleaning
- Semantic Chunking
- Embedding Generation
- ChromaDB Vector Storage
- Similarity Search
- Context Retrieval
- Prompt Augmentation

---

# 📈 Brand Strategy Generation

The application automatically generates:

### Brand Overview

- Company Summary
- Vision
- Mission
- Core Values
- Brand Story

### Brand Identity

- Personality
- Positioning
- Voice Characteristics
- Emotional Positioning
- Brand Promise

### Tone of Voice

- Communication Style
- Formality Level
- Vocabulary Style
- Messaging Consistency

### Customer Insights

- Target Audience
- Pain Points
- Buying Motivation
- Customer Expectations
- Behavioral Analysis

### Messaging Strategy

- Key Messaging
- Elevator Pitch
- Value Proposition
- Unique Selling Points
- Communication Framework

### Competitive Position

- Differentiators
- Strength Analysis
- Market Positioning
- Brand Advantages

---

# 📢 AI Marketing Asset Generation

Automatically creates ready-to-use marketing assets.

## Image Advertisement

Includes

- Hook Titles
- Hook Explanation
- Main Ad Copy
- CTA
- Visual Direction
- Voice Direction
- Hashtags

---

## UGC Advertisement

Generates

- Complete Script
- Storytelling Flow
- Hook
- CTA
- Creator Notes

---

## Short Video Script

Creates

- Hook
- Scene Flow
- Narration
- CTA
- Video Direction

---

## Long Video Script

Generates

- Introduction
- Storytelling
- Brand Positioning
- Customer Benefits
- Closing CTA

---

# 📊 Strategic Brand Analysis

Provides executive-level business insights.

## Executive Summary

- Overall Brand Analysis
- Business Overview
- Key Recommendations

---

## Brand Voice Strength

Evaluates

- Brand Consistency
- Communication Effectiveness
- Audience Alignment

---

## Competitive Analysis

Generates

- Competitive Position
- Differentiation Strategy
- Brand Advantage Analysis

---

## Emotional Positioning

Analyzes

- Emotional Triggers
- Customer Connection
- Trust Building
- Brand Personality

---

## Messaging Recommendations

Suggests

- Recommended Messaging
- Messaging to Avoid
- Tone Improvements
- Communication Strategy

---

## Actionable Next Steps

Provides practical recommendations for improving:

- Brand Identity
- Marketing Strategy
- Customer Engagement
- Digital Presence

---

# 📄 Productivity Features

Designed for real-world business usage.

### Copy Utilities

- Copy Individual Sections
- Copy Complete Report
- One-click Clipboard Support

---

### Export Features

- Professional PDF Export
- Structured Report Layout
- Print-ready Formatting

---

### User Experience

- Loading Skeleton
- Toast Notifications
- Smooth Animations
- Premium SaaS Design
- Responsive Layout
- Accessibility Support

---

# 💻 Complete Tech Stack

## Frontend

| Technology | Purpose |
|------------|----------|
| React 19 | User Interface |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| Vite | Build Tool |

---

## Backend

| Technology | Purpose |
|------------|----------|
| FastAPI | REST API |
| Python | Backend Logic |

---

## Artificial Intelligence

| Technology | Purpose |
|------------|----------|
| OpenRouter | AI Gateway |
| Claude | Brand Strategy Generation |
| GPT-4o | Content Generation |
| Gemini | Alternative LLM |
| Prompt Engineering | AI Instruction Design |

---

## RAG Technologies

| Technology | Purpose |
|------------|----------|
| Playwright | Website Crawling |
| PyPDF | PDF Parsing |
| python-docx | DOCX Parsing |
| Sentence Transformers | Embedding Generation |
| BAAI/bge-small-en-v1.5 | Embedding Model |
| ChromaDB | Vector Database |
| Semantic Search | Context Retrieval |

---

## Utilities

| Library | Purpose |
|----------|----------|
| jsPDF | PDF Export |
| Lucide React | Icons |

---

# 📂 Project Structure

```text
AI-Brand-Voice-Generator
│
├── backend
│   ├── app
│   │   ├── main.py
│   │   │
│   │   └── services
│   │       ├── website_crawler.py
│   │       ├── pdf_parser.py
│   │       ├── docx_parser.py
│   │       ├── chunker.py
│   │       ├── embeddings.py
│   │       ├── vector_store.py
│   │       ├── retriever.py
│   │       └── rag_service.py
│   │
│   └── requirements.txt
│
├── public
│
├── screenshots
│   ├── home.png
│   ├── result.png
│   └── workflow.png
│
├── src
│   ├── assets
│   │
│   ├── components
│   │   ├── brand
│   │   │   ├── BrandForm.tsx
│   │   │   ├── MarketingAssetsRenderer.tsx
│   │   │   ├── ModelSelector.tsx
│   │   │   └── ResultPlaceholder.tsx
│   │   │
│   │   └── ui
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── CopyButton.tsx
│   │       ├── ExportMenu.tsx
│   │       ├── Input.tsx
│   │       ├── LoadingSkeleton.tsx
│   │       ├── RadioGroup.tsx
│   │       ├── Select.tsx
│   │       └── Toast.tsx
│   │
│   ├── config
│   │   └── models.ts
│   │
│   ├── services
│   │   └── openrouter.ts
│   │
│   ├── types
│   │
│   ├── utils
│   │   ├── promptBuilder.ts
│   │   ├── jsonParser.ts
│   │   ├── copy.ts
│   │   └── export.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── .env
├── package.json
├── vite.config.ts
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/PRAKASHMS7/ai-brand-voice-generator.git
```

Move into the project

```bash
cd ai-brand-voice-generator
```

---

## Install Frontend Dependencies

```bash
npm install
```

---

## Run Frontend

```bash
npm run dev
```

The frontend will start on

```
http://localhost:5173
```

---

# 🔧 Backend Setup

## Create Virtual Environment

```bash
uv venv backend/.venv
```

---

## Install Dependencies

```bash
uv pip install -r backend/requirements.txt
```

---

## Install Playwright Browser

```bash
playwright install chromium
```

---

## Run FastAPI Server

```bash
uvicorn backend.app.main:app --reload
```

Backend runs on

```
http://127.0.0.1:8000
```

---

## Verify Backend

Open

```
http://127.0.0.1:8000/api/health
```

Expected response

```json
{
  "status":"ok",
  "message":"Backend is active"
}
```

---

# 🔑 Environment Variables

Create a `.env` file in the project root.

```env
VITE_OPENROUTER_API_KEY=YOUR_OPENROUTER_API_KEY
```

> ⚠ Never commit API keys to GitHub.

---

# 💡 Example Use Case

## User Input

| Field | Example |
|---------|---------|
| Brand Name | Pavan Enterprises |
| Industry | Real Estate |
| Website | https://www.pavanltd.com |
| Tone | Professional |
| Writing Style | Friendly |
| Target Audience | Property Buyers |
| Upload | CompanyProfile.pdf |

---

## Behind the Scenes

The application performs the following steps automatically:

1. Crawls the company website.
2. Reads uploaded PDF/DOCX documents.
3. Extracts company information.
4. Cleans unnecessary content.
5. Splits text into semantic chunks.
6. Generates embeddings.
7. Stores vectors in ChromaDB.
8. Performs semantic similarity search.
9. Builds an optimized AI prompt.
10. Sends the prompt to Claude, GPT-4o, or Gemini.
11. Parses the JSON response.
12. Displays the Brand Voice Dashboard.

---

# 🧪 Testing

## Test Case 1

**Input**

Brand Name

```
Pavan Enterprises
```

Website

```
https://www.pavanltd.com
```

Upload

```
CompanyProfile.pdf
```

Expected Output

- Brand Overview
- Brand Identity
- Customer Insights
- Marketing Assets
- Strategic Analysis

---

## Test Case 2

Without uploading documents.

Expected Result

The system should generate a brand strategy using only the user inputs.

---

## Test Case 3

Upload multiple PDFs.

Expected Result

The RAG pipeline retrieves the most relevant context before generation.

---

# 📷 Screenshots

Add your screenshots inside

```
screenshots/
```

Example

```
screenshots/
│
├── home.png
├── result.png
└── workflow.png
```

Then the README automatically displays them.

---

# 🎯 Skills Demonstrated

This project demonstrates practical knowledge in:

### Artificial Intelligence

- Generative AI
- Large Language Models (LLMs)
- Prompt Engineering
- Retrieval-Augmented Generation (RAG)

### Machine Learning

- Sentence Transformers
- Embedding Generation
- Semantic Search

### Backend Development

- FastAPI
- Python
- REST APIs

### Frontend Development

- React
- TypeScript
- Tailwind CSS
- Responsive UI

### Databases

- ChromaDB
- Vector Databases

### Document Intelligence

- Website Crawling
- PDF Parsing
- DOCX Parsing

### Software Engineering

- Full-Stack Development
- API Integration
- Error Handling
- JSON Validation
- Git & GitHub

---

# 📈 Project Impact

This project demonstrates the practical application of modern Artificial Intelligence technologies to solve a real-world business problem.

Instead of generating generic AI responses, the application understands a company's unique identity through a Retrieval-Augmented Generation (RAG) pipeline and produces personalized brand strategies.

### Engineering Concepts Implemented

- ✅ Full-Stack AI Development
- ✅ Retrieval-Augmented Generation (RAG)
- ✅ Prompt Engineering
- ✅ Semantic Search
- ✅ Vector Databases
- ✅ Embedding Generation
- ✅ Website Crawling
- ✅ Document Intelligence
- ✅ REST API Development
- ✅ Large Language Model Integration
- ✅ Production-Oriented Architecture

---

# 🚀 Future Roadmap

The following enhancements are planned for future versions.

## AI Features

- Multi-language Brand Voice Generation
- AI-powered Logo Suggestions
- AI Image Generation
- Social Media Calendar Generation
- SEO Content Recommendations
- Competitor Brand Comparison
- Campaign Strategy Generator

---

## RAG Improvements

- Support for PowerPoint (PPTX)
- Excel Knowledge Extraction
- OCR Support for Scanned PDFs
- Audio & Video Knowledge Extraction
- Hybrid Search (Keyword + Semantic)
- Knowledge Source Ranking
- Multi-document Collections

---

## Platform Features

- User Authentication
- Project Dashboard
- Save & Resume Projects
- Version History
- Team Collaboration
- Cloud Deployment
- Analytics Dashboard
- Admin Panel

---

# 🧪 Challenges Solved

During the development of this project, several engineering challenges were addressed.

| Challenge | Solution |
|-----------|----------|
| Generic AI Responses | Implemented Retrieval-Augmented Generation (RAG) |
| Context Loss | Prompt Builder with Retrieved Knowledge |
| Multiple AI Providers | OpenRouter Integration |
| Website Content Extraction | Playwright-based Web Crawling |
| Document Processing | PDF & DOCX Parsers |
| Efficient Search | ChromaDB Semantic Retrieval |
| JSON Inconsistency | Robust JSON Validation |
| Professional Reports | PDF Export Generation |

---

# 📚 What I Learned

Developing this project helped strengthen practical knowledge in:

### Artificial Intelligence

- Large Language Models (LLMs)
- Prompt Engineering
- Retrieval-Augmented Generation
- Semantic Search
- Embedding Models

### Backend Development

- FastAPI
- Python
- REST APIs
- File Upload Handling
- API Integration

### Frontend Development

- React
- TypeScript
- Tailwind CSS
- State Management
- Responsive UI Design

### Databases

- ChromaDB
- Vector Search
- Embedding Storage

### Software Engineering

- Component Architecture
- Error Handling
- Modular Development
- Version Control using Git & GitHub
- Production-Level Project Structure

---

# 🤝 Contributing

Contributions are always welcome.

If you would like to improve this project:

1. Fork this repository.
2. Create a new feature branch.

```bash
git checkout -b feature/new-feature
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push your branch.

```bash
git push origin feature/new-feature
```

5. Open a Pull Request.

---

# 📜 License

This project is intended for educational, research, and portfolio purposes.

Feel free to use the ideas and architecture for learning and experimentation.

---

# 🙏 Acknowledgements

Special thanks to the open-source community and the technologies that made this project possible.

- React
- TypeScript
- Tailwind CSS
- FastAPI
- OpenRouter
- Claude
- GPT-4o
- Gemini
- Sentence Transformers
- ChromaDB
- Playwright
- PyPDF
- python-docx
- jsPDF

---

# 👨‍💻 Author

## Uppara Prakash

**AI & Machine Learning Engineer**

Passionate about building production-ready AI applications using Large Language Models, Retrieval-Augmented Generation (RAG), Machine Learning, and Full-Stack Development.

### 📬 Contact

**Email**

prakashcutn07@gmail.com

**GitHub**

https://github.com/PRAKASHMS7

**LinkedIn**

https://www.linkedin.com/in/uppara-prakash-9b5779351

---

# 🎯 Recruiter Highlights

This repository demonstrates practical experience with:

- Generative AI
- Large Language Models
- Retrieval-Augmented Generation (RAG)
- Prompt Engineering
- ChromaDB
- Sentence Transformers
- Semantic Search
- FastAPI
- Python
- React
- TypeScript
- Tailwind CSS
- REST APIs
- AI Product Development
- Full-Stack Development

---

# ⭐ Support

If you found this project helpful or interesting:

⭐ Star this repository

🍴 Fork it

💬 Share your feedback

Your support motivates future improvements and helps others discover this project.

---

<p align="center">

## 🚀 Thank You for Visiting!

**If you like this project, don't forget to ⭐ Star the repository!**

Made with ❤️ by **Uppara Prakash**

</p>
