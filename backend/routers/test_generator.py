from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class TestGeneratorRequest(BaseModel):
    code: str
    language: str = "python"

@router.post("/api/generate-tests")
def generate_tests(request: TestGeneratorRequest):
    try:
        framework = "pytest" if request.language == "python" else "jest"

        chat = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": f"""You are a senior QA engineer and test automation expert.
                    Generate comprehensive test cases for the given code.
                    Use {framework} framework for {request.language}.
                    Respond in this exact structure:

                    ## Test Plan Summary
                    - Functions/Methods to test: list them
                    - Total test cases: X
                    - Coverage target: X%

                    ## Generated Tests
```{request.language}
                    # paste the complete ready-to-run test file here
```

                    ## Test Cases Explained
                    For each test explain:
                    - Test name
                    - What it tests
                    - Why it matters

                    ## Edge Cases Covered
                    - List all edge cases included

                    ## How to Run
                    - Exact command to run these tests

                    ## Coverage Analysis
                    - What is covered
                    - What is NOT covered and why
                    """
                },
                {
                    "role": "user",
                    "content": f"Generate complete tests for this {request.language} code:\n\n```{request.language}\n{request.code}\n```"
                }
            ]
        )

        result = chat.choices[0].message.content
        return {"result": result}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))