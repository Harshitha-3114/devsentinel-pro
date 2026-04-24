from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class CodeReviewRequest(BaseModel):
    code: str
    language: str = "python"

@router.post("/api/code-review")
def review_code(request: CodeReviewRequest):
    try:
        chat = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": """You are a senior software engineer doing a thorough code review.
                    Analyze the given code and respond in this exact structure:

                    ## Overall Score
                    X/10 — one line verdict

                    ## Bugs Found
                    - List any bugs or logical errors with severity: 🔴 High / 🟡 Medium / 🟢 Low

                    ## Security Issues
                    - List any security vulnerabilities found
                    - If none, write: No security issues found

                    ## Code Quality
                    - List style, readability, maintainability issues

                    ## Performance
                    - List any performance concerns
                    - If none, write: No performance issues found

                    ## Suggestions
                    - Concrete improvements with examples where possible

                    ## Summary
                    One paragraph overall assessment
                    """
                },
                {
                    "role": "user",
                    "content": f"Review this {request.language} code:\n\n```{request.language}\n{request.code}\n```"
                }
            ]
        )

        review = chat.choices[0].message.content
        return {"review": review}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))