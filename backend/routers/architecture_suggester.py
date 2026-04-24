from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class ArchitectureRequest(BaseModel):
    description: str
    code: str = ""
    scale: str = "startup"

@router.post("/api/architecture-suggest")
def suggest_architecture(request: ArchitectureRequest):
    try:
        context = f"Description: {request.description}"
        if request.code:
            context += f"\n\nCode:\n```\n{request.code[:3000]}\n```"

        chat = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": """You are a principal software architect with 15 years of experience
                    at top tech companies. Analyze the given system and provide expert architecture advice.
                    Respond in this exact structure:

                    ## Architecture Assessment

                    ## Current State Analysis
                    - What the system is doing
                    - Current architecture pattern detected
                    - Strengths of current approach
                    - Weaknesses and bottlenecks

                    ## Recommended Architecture
                    - Suggested architecture pattern (MVC, Microservices, Event-driven, etc.)
                    - Why this pattern fits

                    ## System Design Diagram
                    Draw a simple ASCII diagram showing:
                    - Components
                    - Data flow
                    - External services

                    ## Tech Stack Recommendations
                    | Layer | Current | Recommended | Reason |
                    |-------|---------|-------------|--------|
                    List each layer

                    ## Design Patterns to Apply
                    - Pattern name + where to apply it + why

                    ## Scalability Roadmap
                    - Phase 1 (0-1000 users): what to do
                    - Phase 2 (1000-100k users): what to do
                    - Phase 3 (100k+ users): what to do

                    ## Security Architecture
                    - Authentication strategy
                    - Authorization strategy
                    - Data protection recommendations

                    ## Quick Wins
                    - Top 3 immediate improvements to make right now

                    ## Long Term Vision
                    - Where this system should be in 1 year
                    """
                },
                {
                    "role": "user",
                    "content": f"Analyze this system for {request.scale} scale:\n\n{context}"
                }
            ]
        )

        result = chat.choices[0].message.content
        return {"result": result}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))