from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, pr_summary, code_review, vulnerability_scanner, test_generator, architecture_suggester, agent_pipeline
import os

app = FastAPI()

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://devsentinel-pro.vercel.app",
        FRONTEND_URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(pr_summary.router)
app.include_router(code_review.router)
app.include_router(vulnerability_scanner.router)
app.include_router(test_generator.router)
app.include_router(architecture_suggester.router)
app.include_router(agent_pipeline.router)

@app.get("/")
def root():
    return {"message": "DevSentinel Pro API is running"}