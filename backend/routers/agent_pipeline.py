from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from agents.dev_team import run_closed_loop

router = APIRouter()

class AgentRequest(BaseModel):
    feature_request: str

@router.post("/api/agent/run")
def run_agent_pipeline(request: AgentRequest):
    try:
        result = run_closed_loop(request.feature_request)
        return {
            "architecture": result["architecture"],
            "code": result["code"],
            "tests": result["tests"],
            "vulnerability_report": result["vulnerability_report"],
            "code_review_report": result["code_review_report"],
            "review": result["review"],
            "final_output": result["final_output"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))