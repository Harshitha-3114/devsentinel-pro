from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import requests
import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class PRRequest(BaseModel):
    pr_url: str
    token: str

def parse_pr_url(pr_url: str):
    # https://github.com/owner/repo/pull/123
    parts = pr_url.strip("/").split("/")
    owner = parts[-4]
    repo = parts[-3]
    pr_number = parts[-1]
    return owner, repo, pr_number

@router.post("/api/pr-summary")
def get_pr_summary(request: PRRequest):
    try:
        owner, repo, pr_number = parse_pr_url(request.pr_url)

        # Fetch PR diff from GitHub
        diff_response = requests.get(
            f"https://api.github.com/repos/{owner}/{repo}/pulls/{pr_number}",
            headers={
                "Authorization": f"Bearer {request.token}",
                "Accept": "application/vnd.github.v3.diff"
            }
        )

        if diff_response.status_code != 200:
            raise HTTPException(status_code=400, detail="Could not fetch PR")

        diff = diff_response.text[:6000]  # Limit size for Groq

        # Send to Groq
        chat = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": """You are an expert code reviewer. 
                    Summarize the given PR diff in plain English.
                    Structure your response as:
                    
                    ## What Changed
                    - bullet points of main changes
                    
                    ## Why It Matters
                    - impact of these changes
                    
                    ## Files Modified
                    - list of files changed
                    
                    ## Risk Level
                    - Low / Medium / High with reason
                    """
                },
                {
                    "role": "user",
                    "content": f"Summarize this PR diff:\n\n{diff}"
                }
            ]
        )

        summary = chat.choices[0].message.content
        return {"summary": summary}
    
    except Exception as e:
     print(f"ERROR: {e}")  # Add this line
    raise HTTPException(status_code=500, detail=str(e))

    # except Exception as e:
    #     raise HTTPException(status_code=500, detail=str(e))

