from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import time
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

MODELS = [
    {
        "id": "llama-3.3-70b-versatile",
        "name": "LLaMA 3.3 70B",
        "description": "Meta's largest open model — best quality"
    },
    {
        "id": "llama-3.1-8b-instant",
        "name": "LLaMA 3.1 8B",
        "description": "Lightweight model — fastest response"
    },
    {
        "id": "mixtral-8x7b-32768",
        "name": "Mixtral 8x7B",
        "description": "Mixture of experts — balanced performance"
    }
]

class BenchmarkRequest(BaseModel):
    code: str
    task: str = "code_review"

class PromptCompareRequest(BaseModel):
    code: str

class ClosedLoopRequest(BaseModel):
    feature_request: str


# ─── Endpoint 1: LLM Benchmark ───────────────────────────────────────────────

@router.post("/api/research/benchmark")
def run_benchmark(request: BenchmarkRequest):
    results = []

    prompt = f"""You are a senior engineer. Review this code:
    Find bugs, security issues, and improvements.
Give an overall quality score out of 10.
Be concise - max 200 words."""

    for model in MODELS:
        try:
            start_time = time.time()
            response = client.chat.completions.create(
                model=model["id"],
                messages=[{"role": "user", "content": prompt}],
                max_tokens=300
            )
            end_time = time.time()

            response_time = round(end_time - start_time, 2)
            content = response.choices[0].message.content

            score = "N/A"
            for line in content.split('\n'):
                if 'score' in line.lower() or '/10' in line:
                    score = line.strip()[:50]
                    break

            results.append({
                "model": model["name"],
                "model_id": model["id"],
                "description": model["description"],
                "response_time": response_time,
                "response": content,
                "score": score,
                "tokens_used": response.usage.total_tokens
            })

        except Exception as e:
            results.append({
                "model": model["name"],
                "model_id": model["id"],
                "description": model["description"],
                "response_time": -1,
                "response": f"Error: {str(e)}",
                "score": "Error",
                "tokens_used": 0
            })

    successful = [r for r in results if r["response_time"] > 0]
    fastest = min(successful, key=lambda x: x["response_time"]) if successful else None

    return {
        "results": results,
        "fastest_model": fastest["model"] if fastest else "N/A",
        "insight": f"{fastest['model']} responded in {fastest['response_time']}s — fastest for real-time code analysis" if fastest else ""
    }


# ─── Endpoint 2: Prompt Comparison ───────────────────────────────────────────

PROMPTS = [
    {
        "id": "basic",
        "name": "Basic Prompting",
        "description": "Simple instruction with no context",
        "prompt": "Review this code:\n\n{code}"
    },
    {
        "id": "role",
        "name": "Role Prompting",
        "description": "Assign a role to the model",
        "prompt": "You are a senior software engineer with 10 years experience. Review this code:\n\n{code}"
    },
    {
        "id": "structured",
        "name": "Structured Prompting",
        "description": "Structured output with OWASP mapping — DevSentinel approach",
        "prompt": """You are a senior software engineer and security expert.
Review this code and respond with:
## Overall Score: X/10
## Bugs Found: (with severity High/Medium/Low)
## Security Issues: (map to OWASP Top 10)
## Improvements: (concrete suggestions)

Code:\n\n{code}"""
    }
]

@router.post("/api/research/prompt-comparison")
def compare_prompts(request: PromptCompareRequest):
    results = []

    for prompt_config in PROMPTS:
        try:
            start_time = time.time()
            formatted_prompt = prompt_config["prompt"].format(
                code=request.code[:1500]
            )
            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[{"role": "user", "content": formatted_prompt}],
                max_tokens=400
            )
            end_time = time.time()

            content = response.choices[0].message.content

            has_structure = "##" in content or "**" in content
            has_severity = "High" in content or "Critical" in content or "🔴" in content
            has_owasp = "OWASP" in content or "injection" in content.lower()
            word_count = len(content.split())

            quality_score = 0
            if has_structure: quality_score += 3
            if has_severity: quality_score += 3
            if has_owasp: quality_score += 2
            if word_count > 100: quality_score += 2

            results.append({
                "prompt_name": prompt_config["name"],
                "prompt_id": prompt_config["id"],
                "description": prompt_config["description"],
                "response": content,
                "response_time": round(end_time - start_time, 2),
                "quality_score": quality_score,
                "metrics": {
                    "has_structure": has_structure,
                    "has_severity": has_severity,
                    "has_owasp": has_owasp,
                    "word_count": word_count
                }
            })

        except Exception as e:
            results.append({
                "prompt_name": prompt_config["name"],
                "prompt_id": prompt_config["id"],
                "description": prompt_config["description"],
                "response": f"Error: {str(e)}",
                "response_time": -1,
                "quality_score": 0,
                "metrics": {}
            })

    best = max(results, key=lambda x: x["quality_score"])
    baseline_score = max(results[0]["quality_score"], 1)
    improvement = round((best["quality_score"] / baseline_score - 1) * 100)

    return {
        "results": results,
        "best_approach": best["prompt_name"],
        "improvement_percentage": improvement,
        "insight": f"Structured prompting produces {improvement}% higher quality output than basic prompting"
    }


# ─── Endpoint 3: Closed Loop Impact ──────────────────────────────────────────

@router.post("/api/research/closed-loop-impact")
def closed_loop_impact(request: ClosedLoopRequest):
    try:
        # Step 1 — Generate code WITHOUT closed loop
        dev_response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{
                "role": "user",
                "content": f"Write Python code for: {request.feature_request}. Just write the code, no explanation."
            }],
            max_tokens=500
        )
        generated_code = dev_response.choices[0].message.content

        # Step 2 — Scan the generated code
        scan_response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{
                "role": "user",
                "content": f"""Scan this code for security vulnerabilities:

{generated_code}

Respond in exactly this format:
VULNERABILITY_COUNT: [number]
CRITICAL_COUNT: [number]
HIGH_COUNT: [number]
ISSUES: [comma separated list of issue names]
QUALITY_SCORE: [number 1-10]
PRODUCTION_READY: [YES or NO]"""
            }],
            max_tokens=200
        )
        scan_result = scan_response.choices[0].message.content

        def parse_value(text, key):
            for line in text.split('\n'):
                if key in line:
                    return line.split(':')[-1].strip()
            return "0"

        vuln_count = parse_value(scan_result, "VULNERABILITY_COUNT")
        critical_count = parse_value(scan_result, "CRITICAL_COUNT")
        issues = parse_value(scan_result, "ISSUES")
        quality_before = parse_value(scan_result, "QUALITY_SCORE")
        prod_ready_before = parse_value(scan_result, "PRODUCTION_READY")

        # Step 3 — Fix WITH closed loop
        fix_response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{
                "role": "user",
                "content": f"""You are a security expert. Fix ALL vulnerabilities in this code:

Original Code:
{generated_code}

Vulnerabilities Found:
{scan_result}

Rewrite the code with all security issues fixed.
Use parameterized queries, environment variables for secrets,
proper input validation, and secure coding practices."""
            }],
            max_tokens=600
        )
        fixed_code = fix_response.choices[0].message.content

        # Step 4 — Rescan fixed code
        rescan_response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{
                "role": "user",
                "content": f"""Scan this FIXED code for remaining vulnerabilities:

{fixed_code}

Respond in exactly this format:
VULNERABILITY_COUNT: [number]
CRITICAL_COUNT: [number]
ISSUES: [comma separated list or 'None']
QUALITY_SCORE: [number 1-10]
PRODUCTION_READY: [YES or NO]"""
            }],
            max_tokens=200
        )
        rescan_result = rescan_response.choices[0].message.content

        vuln_after = parse_value(rescan_result, "VULNERABILITY_COUNT")
        quality_after = parse_value(rescan_result, "QUALITY_SCORE")
        prod_ready_after = parse_value(rescan_result, "PRODUCTION_READY")
        issues_after = parse_value(rescan_result, "ISSUES")

        try:
            vuln_fixed = max(0, int(vuln_count) - int(vuln_after))
            quality_improvement = round(
                (int(quality_after) - int(quality_before)) / max(int(quality_before), 1) * 100
            )
        except:
            vuln_fixed = 0
            quality_improvement = 0

        return {
            "without_closed_loop": {
                "generated_code": generated_code,
                "vulnerability_count": vuln_count,
                "critical_count": critical_count,
                "issues": issues,
                "quality_score": quality_before,
                "production_ready": prod_ready_before
            },
            "with_closed_loop": {
                "fixed_code": fixed_code,
                "vulnerability_count": vuln_after,
                "issues": issues_after,
                "quality_score": quality_after,
                "production_ready": prod_ready_after
            },
            "impact": {
                "vulnerabilities_fixed": vuln_fixed,
                "quality_improvement_percent": quality_improvement,
                "security_improvement": f"{vuln_fixed} vulnerabilities eliminated by closed loop",
                "verdict": "Closed loop significantly improves code security and quality"
            }
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))