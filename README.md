# One For All

**One For All** is a privacy-first, ephemeral, and local-only AI chat application. It is designed to be a lightweight, "one-stop-shop" for interacting with various LLM providers (OpenAI, Anthropic, Google, Groq, OpenRouter, and local models via Ollama) without the need for a persistent database or account system.

![One For All UI](file:///Users/work/.gemini/antigravity/brain/3e938828-d1e2-4ee9-9ed9-0e4e227a649f/one_for_all_ui_check_1773188993391.png)

## Key Features

- **Privacy-First**: No data is sent to a central database. All chat history is ephemeral and stored only in memory (lost on refresh).
- **Local-Only API Keys**: API keys are stored exclusively in your browser's `localStorage`.
- **Minimalist Design**: A clean, "doodle-themed" UI with glassmorphism touches.
- **Multi-Model Support**: Seamlessly switch between OpenAI, Claude, Groq, Gemini, and more.
- **Local LLM Support**: Integrate with Ollama for 100% local inference.

---

## Prerequisites

To run One For All, ensure you have the following installed:

1.  **Node.js (v18.x or later)**: Required for the Next.js runtime.
2.  **npm (v9.x or later)**: Required for package management.
3.  **Docker (Optional)**: Only needed if you plan to run Ollama for local models.
4.  **API Keys**: You will need API keys from providers like OpenAI, Anthropic, or OpenRouter to chat with hosted models.

---

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd chatbot
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Setup API Keys
Once the app is running:
1.  Click **"Start Chatting"**.
2.  Go to **Profile Settings** (bottom left).
3.  Enter your API keys for the providers you wish to use.
4.  These keys are saved locally in your browser and never leave your machine (except to authenticate API requests).

---

## Repository Understanding (Architecture)

This project is a modern Next.js application built with a focus on client-side state management to ensure ephemerality.

### File Structure
-   `app/[locale]/`: Contains the main Next.js App Router pages and layouts.
-   `components/`: React components grouped by functionality (chat, ui, utility, etc.).
-   `context/`: The `ChatbotUIContext` which manages global state (API keys, chat messages, selected models).
-   `lib/`: Helper functions and shared logic (model providers, formatting, etc.).
-   `public/`: Static assets (icons, manifests).

### How it Works (Ephemeral Logic)
Unlike the original Chatbot UI which relied on Supabase, **One For All** uses:
1.  **React State**: All messages and chat sessions are stored in memory. Refreshing the browser clears the chat.
2.  **LocalStorage**: User profile settings and API keys are persisted locally so you don't have to enter them every time.
3.  **Client-Side API Calls**: The frontend sends API keys directly to the serverless routes, which then proxy the request to the LLM provider.

---

## Minimalist UI Customization
The UI is styled with **Tailwind CSS** and customized in `app/[locale]/globals.css`. It features a minimalist doodle pattern background and subtle glassmorphism on UI panels.

---

## License
MIT
