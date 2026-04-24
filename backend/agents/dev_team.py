from langgraph.graph import StateGraph, END
from langchain_groq import ChatGroq
from typing import TypedDict
import os
from dotenv import load_dotenv

load_dotenv()

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY")
)

# Extended state with closed loop fields
class AgentState(TypedDict):
    feature_request: str
    architecture: str
    code: str
    tests: str
    review: str
    vulnerability_report: str
    code_review_report: str
    final_code: str
    final_output: str

# Agent 1 — Architect
def architect_agent(state: AgentState) -> AgentState:
    print("🏗️ Architect Agent running...")
    response = llm.invoke(
        f"""You are a software architect. Design a system for this feature request:

{state['feature_request']}

Provide:
1. System design overview
2. Components needed
3. Data flow
4. Tech stack choices
5. API endpoints needed

Be concise and technical."""
    )
    state["architecture"] = response.content
    return state

# Agent 2 — Developer
def developer_agent(state: AgentState) -> AgentState:
    print("💻 Developer Agent running...")
    response = llm.invoke(
        f"""You are a senior developer. Write clean production Python code based on this:

Feature Request: {state['feature_request']}

Architecture:
{state['architecture']}

Write complete working Python code with:
- Proper error handling
- Type hints
- Docstrings
- No hardcoded secrets
- Secure coding practices"""
    )
    state["code"] = response.content
    return state

# Agent 3 — Tester
def tester_agent(state: AgentState) -> AgentState:
    print("🧪 Tester Agent running...")
    response = llm.invoke(
        f"""You are a QA engineer. Write comprehensive pytest tests for this code:

{state['code']}

Include:
- Unit tests for all functions
- Edge cases
- Error handling tests
- Ready to run test file"""
    )
    state["tests"] = response.content
    return state

# DevSentinel Scan — Vulnerability Scanner (Closed Loop Step 1)
def devsentinel_vulnerability_scan(state: AgentState) -> AgentState:
    print("🔍 DevSentinel Vulnerability Scan running...")
    response = llm.invoke(
        f"""You are a cybersecurity expert. Scan this code for security vulnerabilities:

{state['code']}

Provide a concise security report:

## Vulnerability Scan Report
- Total vulnerabilities found: X
- Critical: X | High: X | Medium: X | Low: X

## Issues Found
For each issue:
- [SEVERITY] Issue name: description + fix

## Overall Security Rating: CRITICAL/HIGH/MEDIUM/LOW/SAFE"""
    )
    state["vulnerability_report"] = response.content
    return state

# DevSentinel Scan — Code Review (Closed Loop Step 2)
def devsentinel_code_review(state: AgentState) -> AgentState:
    print("📋 DevSentinel Code Review running...")
    response = llm.invoke(
        f"""You are a senior engineer doing code review. Review this code:

{state['code']}

Provide a concise review:

## Code Review Report
- Quality Score: X/10

## Issues Found
- Bug: description
- Code smell: description
- Performance: description

## Must Fix Before Production
- List critical fixes only"""
    )
    state["code_review_report"] = response.content
    return state

# Agent 4 — Reviewer (reads DevSentinel reports and fixes)
def reviewer_agent(state: AgentState) -> AgentState:
    print("✅ Reviewer Agent reading DevSentinel reports and fixing...")
    response = llm.invoke(
        f"""You are a senior tech lead. You have received these reports about generated code:

## Original Feature Request
{state['feature_request']}

## Generated Code
{state['code']}

## DevSentinel Vulnerability Scan Report
{state['vulnerability_report']}

## DevSentinel Code Review Report
{state['code_review_report']}

Your job:
1. Read both DevSentinel reports carefully
2. Fix ALL critical and high severity issues
3. Rewrite the code with all fixes applied
4. Provide the final production-ready version

Respond with:

## Review Summary
- Issues found by DevSentinel: X
- Issues fixed: X
- Final verdict: APPROVED / NEEDS MORE WORK

## Fixed Code
```python
# paste the complete fixed code here
```

## What Was Fixed
- List every fix you made

## Remaining Concerns
- Any issues that need human attention"""
    )
    state["review"] = response.content

    # Extract fixed code for final output
    state["final_code"] = response.content

    # Compile complete final output
    state["final_output"] = f"""
# DevSentinel Pro — Closed Loop Output

## Feature Request
{state['feature_request']}

---

## Phase 1 — Architecture Design (Architect Agent)
{state['architecture']}

---

## Phase 2 — Generated Code (Developer Agent)
{state['code']}

---

## Phase 3 — Generated Tests (Tester Agent)
{state['tests']}

---

## Phase 4 — DevSentinel Vulnerability Scan
{state['vulnerability_report']}

---

## Phase 5 — DevSentinel Code Review
{state['code_review_report']}

---

## Phase 6 — Final Fixed Code (Reviewer Agent)
{state['review']}
"""
    return state

# Build the closed loop graph
def build_closed_loop_graph():
    graph = StateGraph(AgentState)

    # Add all nodes
    graph.add_node("architect", architect_agent)
    graph.add_node("developer", developer_agent)
    graph.add_node("tester", tester_agent)
    graph.add_node("vulnerability_scan", devsentinel_vulnerability_scan)
    graph.add_node("code_review", devsentinel_code_review)
    graph.add_node("reviewer", reviewer_agent)

    # Define the closed loop flow
    graph.set_entry_point("architect")
    graph.add_edge("architect", "developer")
    graph.add_edge("developer", "tester")
    graph.add_edge("tester", "vulnerability_scan")      # Closed loop starts
    graph.add_edge("vulnerability_scan", "code_review") # Closed loop continues
    graph.add_edge("code_review", "reviewer")           # Reviewer reads both reports
    graph.add_edge("reviewer", END)

    return graph.compile()

# Run the full closed loop pipeline
def run_closed_loop(feature_request: str) -> dict:
    app = build_closed_loop_graph()

    initial_state = AgentState(
        feature_request=feature_request,
        architecture="",
        code="",
        tests="",
        review="",
        vulnerability_report="",
        code_review_report="",
        final_code="",
        final_output=""
    )

    result = app.invoke(initial_state)
    return result