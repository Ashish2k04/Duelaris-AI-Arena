# Duelaris AI Arena

🚀 [Live Demo](https://duelaris-ai-arena.vercel.app)

Duelaris AI Arena is a full-stack AI comparison app where two AI models independently answer the same prompt and a third AI model judges both answers, scores them, explains its evaluation, and identifies the winner.

## Features

- ⚔️ Submit a question and compare two AI-generated answers
- 🤖 Generate responses from Groq and Cohere in parallel
- ⚖️ Use Gemini as the AI judge
- 📊 Score each answer from 0 to 10
- 🧠 Display the judge's reasoning for both answers
- 🏆 Highlight the higher-scoring response or show a tie
- 🛡️ Rate-limit AI requests to reduce repeated or excessive calls
- ⏱️ Show a cooldown countdown when the rate limit is reached
- ✍️ Render Markdown and syntax-highlight code in model responses
- ⏳ Loading skeletons, animated scores, and error feedback
- 💡 Example prompts to try quickly
- 📱 Responsive React interface

## How It Works

```text
                         User Prompt
                             │
                             ▼
                     React Frontend
                             │
                    POST /invoke
                             │
                             ▼
                      Express Backend
                             │
                       Rate Limiter
                    3 requests / minute
                             │
                             ▼
                       LangGraph Flow
                             │
                    ┌────────┴────────┐
                    ▼                 ▼
               Groq Model         Cohere Model
                Answer 1           Answer 2
                    │                 │
                    └────────┬────────┘
                             ▼
                        Gemini Judge
                             │
                    ┌────────┴────────┐
                    ▼                 ▼
               Scores (0–10)     Reasoning
                    └────────┬────────┘
                             ▼
                      JSON API Result
                             │
                             ▼
                   Comparison UI + Winner
```

The solution node invokes Groq and Cohere concurrently with `Promise.all()`. LangGraph then passes both responses to the Gemini-powered judge agent, which returns structured scores and reasoning validated with Zod.

## Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS 4
- Axios
- React Markdown
- rehype-highlight
- highlight.js

### Backend

- Node.js
- Express 5
- TypeScript
- LangChain
- LangGraph
- Groq integration (`@langchain/groq`)
- Cohere integration (`@langchain/cohere`)
- Google Gemini integration (`@langchain/google-genai`)
- express-rate-limit
- Zod
- dotenv
- CORS

## Project Structure

```text
Duelaris-AI-Arena/
├── backend/
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── yarn.lock
│   ├── server.ts
│   ├── tsconfig.json
│   └── src/
│       ├── app.ts
│       ├── config/
│       │   └── config.ts
│       ├── middleware/
│       │   └── rateLimit.middleware.ts
│       └── services/
│           ├── models.service.ts
│           └── graph.ai.service.ts
└── frontend/
    ├── package.json
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── app/
        │   └── App.jsx
        ├── components/
        │   ├── BattleResults.jsx
        │   ├── Header.jsx
        │   ├── Icons.jsx
        │   ├── JudgeCard.jsx
        │   ├── ModelCard.jsx
        │   └── QuestionInput.jsx
        ├── index.css
        └── main.jsx
```

## Getting Started

You need Node.js and npm installed, plus API keys for Groq, Cohere, and Google Gemini.

### 1. Clone the repository

```bash
git clone https://github.com/Ashish2k04/Duelaris-AI-Arena.git
cd Duelaris-AI-Arena
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key
COHERE_API_KEY=your_cohere_api_key
GROQ_API_KEY=your_groq_api_key
FRONTEND_URL=http://localhost:5173
```

Replace the placeholders with your actual API keys. Do not commit the `.env` file or expose API keys in frontend code.

**Environment variable note:** The backend CORS configuration reads `FRONTEND_URL`. If `.env.example` still uses `FRONTEND_URI`, rename that variable to `FRONTEND_URL` so it matches the code.

Start the backend:

```bash
npm run dev
```

The backend runs on `http://localhost:3000` when `PORT=3000`.

### 3. Set up the frontend

Open a second terminal from the repository root:

```bash
cd frontend
npm install
npm run dev
```

Vite serves the frontend at `http://localhost:5173` by default.

The frontend reads the backend base URL from `VITE_BACKEND_URL`. For local development, the code defaults to `http://localhost:3000` if the variable is not set. For a deployed frontend, configure `VITE_BACKEND_URL` in the hosting provider's environment variables and use your backend's base URL. Do not append `/invoke`; the frontend adds that route itself.

## API

### Health Check

```http
GET /
```

Example response:

```json
{
  "status": "ok"
}
```

### Run an AI Battle

```http
POST /invoke
Content-Type: application/json
```

Request body:

```json
{
  "input": "Explain how a neural network learns."
}
```

The `input` property contains the question that both solution models will answer.

Successful response shape:

```json
{
  "message": "Graph executed successfully.",
  "status": true,
  "data": {
    "problem": "Explain how a neural network learns.",
    "solution_1": "Answer generated by the first model...",
    "solution_2": "Answer generated by the second model...",
    "judge": {
      "solution_1_score": 8,
      "solution_2_score": 9,
      "solution_1_reasoning": "Reason for the first score...",
      "solution_2_reasoning": "Reason for the second score..."
    }
  }
}
```

The values above illustrate the response structure; actual model output and scores vary by prompt. The judge's Zod schema constrains both scores to a range from 0 to 10.

## Rate Limiting

The backend uses `express-rate-limit` to limit requests to the AI workflow endpoint.

- **Endpoint:** `POST /invoke`
- **Limit:** 3 requests per client IP
- **Time window:** 1 minute
- **Limit response:** `Too many requests, please try again later.`

The limiter is defined in `backend/src/middleware/rateLimit.middleware.ts` and applied to the `/invoke` route in `backend/src/app.ts`. Once the limit is reached, further requests are rejected until the time window resets.

The frontend handles HTTP `429 Too Many Requests` responses by showing a cooldown message, a countdown timer, and a disabled Battle button. The UI uses the server's `Retry-After` header when available and otherwise falls back to a 60-second countdown.

## Main Packages

Running `npm install` in each app installs the dependencies listed in that app's `package.json`.

### Frontend

| Package | Purpose in this project |
| --- | --- |
| `react` / `react-dom` | Build and render the interactive UI |
| `vite` | Run the frontend development server and build the app |
| `tailwindcss` / `@tailwindcss/vite` | Utility-first styling and Tailwind integration with Vite |
| `axios` | Send the prompt to the backend `/invoke` endpoint |
| `react-markdown` | Render model responses and judge reasoning as Markdown |
| `rehype-highlight` / `highlight.js` | Syntax-highlight code blocks inside Markdown responses |

### Backend

| Package | Purpose in this project |
| --- | --- |
| `express` | Provide the health-check and AI battle HTTP endpoints |
| `@langchain/langgraph` | Define and execute the multi-step AI workflow |
| `langchain` | Create the judge agent and provide message / structured-output utilities |
| `@langchain/groq` | Call the Groq model that generates one solution |
| `@langchain/cohere` | Call the Cohere model that generates the other solution |
| `@langchain/google-genai` | Connect the Gemini model used to judge the answers |
| `express-rate-limit` | Restrict `/invoke` to 3 requests per minute per client IP |
| `zod` | Define graph state and validate the judge's structured response |
| `dotenv` | Load backend environment variables |
| `cors` | Allow the frontend origin to call the backend |

## Workflow Details

### 1. Generate Two Solutions

The LangGraph solution node sends the same problem to Groq and Cohere concurrently. Their responses are saved in the graph state as `solution_1` and `solution_2`.

### 2. Judge Both Solutions

The judge node sends the original problem and both responses to a Gemini-powered agent. It requests four structured fields:

- `solution_1_score`
- `solution_2_score`
- `solution_1_reasoning`
- `solution_2_reasoning`

Zod validates that both scores are numbers between 0 and 10.

### 3. Display the Result

The frontend shows the two model responses side by side, their scores, and the judge's reasoning. It then displays an overall verdict: the higher-scoring model wins, or a tie is shown when the scores are equal.

## Frontend Experience

- Prompt textarea with a 2,000-character limit
- Example question chips
- Battle button with loading state
- Skeleton cards while models are responding
- Markdown rendering and syntax-highlighted code
- Animated score display and winner labels
- Judge verdict and comparison visualizations
- Error message display when the request fails
- Automatic scroll to the results section after a battle
- Rate-limit status, cooldown timer, and temporary button disabling

## Notes

- API keys are used by the backend only.
- Both answer models run in parallel, but the judge runs after both answers are available.
- AI-generated scores and reasoning are model judgments, not guarantees of correctness.
- The frontend API base URL is configurable through `VITE_BACKEND_URL`.
- Set `FRONTEND_URL` on the backend to the frontend's allowed origin.
- The current rate limiter uses the default `express-rate-limit` store. For a horizontally scaled production deployment, configure a shared store if rate-limit counts need to be consistent across multiple instances.


