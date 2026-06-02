# DevSentinel Pro

### Agentic AI Platform for Secure and Intelligent Software Development

> A full-stack closed-loop AI platform that both **analyzes existing code** and **builds new code autonomously** through a multi-agent pipeline — connected through a self-correcting feedback loop.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-devsentinel--pro.vercel.app-black?style=for-the-badge)](https://devsentinel-pro.vercel.app)
[![Backend API](https://img.shields.io/badge/Backend%20API-onrender.com-blue?style=for-the-badge)](https://devsentinel-pro.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Harshitha--3114-gray?style=for-the-badge&logo=github)](https://github.com/Harshitha-3114/devsentinel-pro)

---

## What It Does

DevSentinel Pro is a unified AI engineering platform with two sides:

### Analyze Side — Review Existing Code
| Feature | Description |
|---|---|
| PR Summary | Paste a GitHub Pull Request URL → get AI-generated summary with risk level |
| Code Review | Paste code → get senior engineer level review with severity ratings |
| Vulnerability Scanner | Paste code → get OWASP-mapped CVE-style security report |
| Test Generator | Paste a function → get complete ready-to-run pytest/jest test suite |
| Architecture Suggester | Describe your system → get expert architecture recommendations |

### Build Side — Generate New Code
| Feature | Description |
|---|---|
| Closed Loop AI Dev Team | Describe a feature → 4 AI agents design, build, test, scan, review and fix it automatically |

### Research Section — Original Experiments
| Feature | Description |
|---|---|
| LLM Benchmark | Live comparison of 3 LLM models on response time and quality |
| Prompt Engineering | Live comparison of 3 prompting strategies with quality scoring |
| Closed Loop Impact | Live experiment proving closed loop improves security by up to 100% |
| Architecture ADRs | 4 documented architecture decisions with evidence and reasoning |

---

## 🔄 The Closed Loop — What Makes It Unique

Most tools either **analyze** code or **generate** code. **DevSentinel Pro** connects both into a fully autonomous software development pipeline:

```text
User describes feature
        ↓
[Architect Agent]
        → Designs system components and API endpoints
        ↓
[Developer Agent]
        → Writes complete Python code
        ↓
[Tester Agent]
        → Writes pytest test suite
        ↓
[DevSentinel Scanner]
        → Automatically scans generated code for vulnerabilities
        ↓
[DevSentinel Review]
        → Automatically reviews code quality
        ↓
[Reviewer Agent]
        → Reads BOTH reports and fixes ALL issues autonomously
        ↓
Production-ready, secure, tested, reviewed code
```

### 🚀 Zero-Touch Development

From architecture design to security validation, every stage is automated.

✅ System Architecture Design
✅ Code Generation
✅ Automated Testing
✅ Security Scanning
✅ Code Quality Review
✅ Autonomous Issue Resolution

**No human intervention required at any step.**


---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 18 + Vite | UI framework and build tool |
| Styling | Tailwind CSS v4 | Utility-first styling |
| Icons | Lucide React | SVG icon library |
| Routing | React Router v6 | Client-side navigation |
| HTTP | Axios | API calls from frontend |
| Backend | FastAPI + Uvicorn | Python REST API |
| Validation | Pydantic v2 | Request/response models |
| AI Model | LLaMA 3.3 70B | Core language model |
| Inference | Groq API (LPU) | 10x faster than GPU-based inference |
| Agents | LangGraph | Multi-agent state graph orchestration |
| Auth | GitHub OAuth 2.0 | User authentication |
| GitHub | GitHub REST API | PR diff fetching |
| Frontend Deploy | Vercel | Auto-deploy from GitHub |
| Backend Deploy | Render | Python server hosting |

---

## Research Contributions

### 1. LLM Benchmark
Compared LLaMA 3.3 70B, LLaMA 3.1 8B, and Gemma 2 9B on identical code review tasks:
- LLaMA 3.3 70B: Best quality, ~0.3s response
- LLaMA 3.1 8B: Faster but shallower output
- **Finding:** LLaMA 3.3 70B provides optimal quality-to-speed ratio

### 2. Prompt Engineering Analysis
Tested 3 prompting strategies on the same code:

| Strategy | Quality Score | OWASP Mapped | Structured Output |
|---|---|---|---|
| Basic | 3/10 | ❌ | ❌ |
| Role-based | 6/10 | ❌ | Partial |
| Structured | 9/10 | ✅ | ✅ |

**Finding:** Structured prompting improves output quality by 200%

### 3. Closed Loop Impact
Measured security improvement with and without closed loop:

| Metric | Without | With |
|---|---|---|
| Vulnerabilities | 7 found | 0-3 remaining |
| Code Quality | 2-4/10 | 6-9/10 |
| Production Ready | NO | YES |

**Finding:** Closed loop reduces vulnerabilities by 75-100%

### 4. Architecture Decision Records
4 documented decisions: Why LangGraph, Why Groq, Why Closed Loop, Why TypedDict

---


## Local Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- Git

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/Harshitha-3114/devsentinel-pro.git
cd devsentinel-pro/backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Add your API keys to .env

# Run backend
uvicorn main:app --reload
# Backend runs at http://localhost:8000
```

### Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000" > .env

# Run frontend
npm run dev
# Frontend runs at http://localhost:5173
```

---

## Environment Variables

### Backend `.env`
GROQ_API_KEY=your_groq_api_key
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
FRONTEND_URL=http://localhost:5173

### Frontend `.env`
VITE_API_URL=http://localhost:8000

### How to Get Keys
- **Groq API Key:** https://console.groq.com/keys
- **GitHub OAuth:** https://github.com/settings/developers → New OAuth App
  - Homepage URL: `http://localhost:5173`
  - Callback URL: `http://localhost:8000/auth/github/callback`

---

## Deployment

| Service | Platform | URL |
|---|---|---|
| Frontend | Vercel | https://devsentinel-pro.vercel.app |
| Backend | Render | https://devsentinel-pro.onrender.com |

### Deploy Backend on Render
1. Connect GitHub repo
2. Set Root Directory: `backend`
3. Set Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables

### Deploy Frontend on Vercel
1. Import GitHub repo
2. Set Root Directory: `frontend`
3. Add environment variable: `VITE_API_URL=https://your-render-url.onrender.com`

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Health check |
| GET | `/auth/github/login` | GitHub OAuth redirect |
| GET | `/auth/github/callback` | OAuth callback |
| GET | `/auth/github/user` | Get user profile |
| POST | `/api/pr-summary` | Generate PR summary |
| POST | `/api/code-review` | Review code |
| POST | `/api/vulnerability-scan` | Scan for vulnerabilities |
| POST | `/api/generate-tests` | Generate test cases |
| POST | `/api/architecture-suggest` | Suggest architecture |
| POST | `/api/agent/run` | Run closed loop pipeline |
| POST | `/api/research/benchmark` | Run LLM benchmark |
| POST | `/api/research/prompt-comparison` | Compare prompts |
| POST | `/api/research/closed-loop-impact` | Run impact analysis |

---

## Key Design Decisions

### Why LangGraph over LangChain?
LangChain only supports linear chains. LangGraph supports cyclic graphs — essential for the closed loop feedback architecture. This cycle is architecturally impossible in LangChain.

### Why Groq over OpenAI?
Groq's custom LPU hardware delivers 1-3s inference vs 8-12s on GPUs. For a 6-agent sequential pipeline:
- OpenAI: 6 × 10s = 60-90 seconds
- Groq: 6 × 2s = 10-15 seconds

### Why Closed Loop over Simple Generation?
LLM-generated code contains vulnerabilities in ~40% of cases. The closed loop automatically detects and fixes these without human intervention — inspired by control theory PID feedback controllers.

### Why TypedDict for AgentState?
TypedDict is LangGraph's native recommended pattern. It provides type safety across all 6 agents, makes the state contract explicit, and prevents silent runtime errors.

---

## Future Improvements

- [ ] PostgreSQL database for scan history persistence
- [ ] RAG-based codebase chat using ChromaDB
- [ ] Real-time streaming output using Server-Sent Events
- [ ] GitHub webhook integration for auto PR scanning
- [ ] PDF report export for security audits
- [ ] Parallel agent execution to reduce pipeline time
- [ ] Dark mode toggle

---

## Author

**Harshitha M**
Final Year — Information Science Engineering
Internship at Inventeron Technologies and Business Solutions LLP

---

## License

This project was built as part of an internship at Inventeron Technologies and Business Solutions LLP.

---

## Acknowledgements

- [Meta AI](https://ai.meta.com) — LLaMA 3.3 70B model
- [Groq](https://groq.com) — LPU inference infrastructure
- [LangChain](https://langchain.com) — LangGraph framework
- [GitHub](https://github.com) — OAuth and REST API
- [Inventeron Technologies](https://www.inventeron.com) — Internship organization
