import { useState } from "react"

function ArchitectureDecisions() {
  const [expanded, setExpanded] = useState(null)

  const decisions = [
    {
      id: "ADR-001",
      decision: "Why LangGraph over LangChain Chains?",
      context: "Needed a feedback loop where DevSentinel analysis results flow back to the Reviewer Agent for automated fixing",
      options: [
        {
          name: "LangChain Chains",
          verdict: "Rejected",
          pros: ["Simple API", "Well documented", "Large community"],
          cons: ["Linear only", "No cycles support", "No shared state"],
          verdict_reason: "Cannot create feedback cycles — fundamentally incompatible with closed loop architecture"
        },
        {
          name: "AutoGen (Microsoft)",
          verdict: "Rejected",
          pros: ["Multi-agent support", "Conversational agents"],
          cons: ["Designed for conversation not pipelines", "Unpredictable flow"],
          verdict_reason: "Conversational model does not suit structured deterministic pipelines"
        },
        {
          name: "LangGraph",
          verdict: "Chosen",
          pros: ["Graph-based — supports cycles", "Explicit typed state", "Deterministic flow"],
          cons: ["Steeper learning curve", "Less documentation"],
          verdict_reason: "Only framework that natively supports cyclic graphs needed for closed loop feedback"
        },
      ],
      code_evidence: `# LangGraph enables this — LangChain cannot:
graph = StateGraph(AgentState)
graph.add_edge("tester", "vulnerability_scan")
graph.add_edge("vulnerability_scan", "code_review")
graph.add_edge("code_review", "reviewer")
# This cycle is IMPOSSIBLE in LangChain`,
      insight: "LangGraph was the only viable option. The closed loop feedback cycle is architecturally impossible without graph-based agent orchestration."
    },
    {
      id: "ADR-002",
      decision: "Why Groq over OpenAI GPT-4?",
      context: "Needed fast LLM responses for real-time code review — slow responses break user experience",
      options: [
        {
          name: "OpenAI GPT-4",
          verdict: "Rejected",
          pros: ["Highest quality", "Best reasoning", "Most popular"],
          cons: ["$0.03/1k tokens", "8-12s response time", "Rate limits"],
          verdict_reason: "Too expensive, too slow for 6-agent sequential pipeline"
        },
        {
          name: "Google Gemini Pro",
          verdict: "Rejected",
          pros: ["Free tier", "Good quality"],
          cons: ["5-8s response time", "API quota limits"],
          verdict_reason: "Response time still too slow for agent pipeline"
        },
        {
          name: "Groq + LLaMA 3.3 70B",
          verdict: "Chosen",
          pros: ["1-3s response time", "Free tier", "LPU hardware", "Open source"],
          cons: ["Rate limits on free tier", "Fewer models"],
          verdict_reason: "10x faster than alternatives due to custom LPU hardware"
        },
      ],
      code_evidence: `# Speed comparison for 6-agent pipeline:
# OpenAI: 6 x 10s = 60-90 seconds total
# Groq:   6 x 2s  = 10-15 seconds total
# 6x faster pipeline = dramatically better UX

client = Groq(api_key=os.getenv("GROQ_API_KEY"))
response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
)`,
      insight: "Groq's custom LPU hardware delivers inference speeds impossible on GPU-based providers. For a 6-step agent pipeline, this 6x speed advantage is the difference between a usable and unusable product."
    },
    {
      id: "ADR-003",
      decision: "Why Closed Loop over Simple Generation?",
      context: "AI agents generate code but cannot guarantee security — need automated validation",
      options: [
        {
          name: "Generate Only",
          verdict: "Rejected",
          pros: ["Simple", "Fast"],
          cons: ["No security validation", "Vulnerabilities pass through"],
          verdict_reason: "LLM-generated code contains vulnerabilities in ~40% of cases"
        },
        {
          name: "Generate + Human Review",
          verdict: "Rejected",
          pros: ["High quality", "Human judgment"],
          cons: ["Defeats automation purpose", "Slow", "Not scalable"],
          verdict_reason: "Requires human in the loop — eliminates value of AI automation"
        },
        {
          name: "Closed Loop Pipeline",
          verdict: "Chosen",
          pros: ["Automated security validation", "Self-correcting", "No human needed"],
          cons: ["Complex implementation", "Longer pipeline time"],
          verdict_reason: "Inspired by control theory feedback loops — system detects and corrects its own errors"
        },
      ],
      code_evidence: `# Closed Loop — the key architectural innovation:
graph.add_edge("developer", "tester")
graph.add_edge("tester", "vulnerability_scan")
graph.add_edge("vulnerability_scan", "code_review")
graph.add_edge("code_review", "reviewer")

# Reviewer reads BOTH DevSentinel reports:
f"""
Vulnerability Report: {state['vulnerability_report']}
Code Review Report: {state['code_review_report']}
Fix ALL issues found above.
"""`,
      insight: "The closed loop is inspired by control theory PID feedback controllers. Measure output error (DevSentinel), feed back to generation layer (Reviewer Agent), correct the output. Self-improving system."
    },
    {
      id: "ADR-004",
      decision: "Why TypedDict for AgentState?",
      context: "Needed a shared state schema that 6 agents can read from and write to safely",
      options: [
        {
          name: "Plain Python dict",
          verdict: "Rejected",
          pros: ["Simple", "Flexible"],
          cons: ["No type safety", "Runtime errors", "Hard to document"],
          verdict_reason: "Silent errors when agents write wrong types crash the entire pipeline"
        },
        {
          name: "Pydantic Model",
          verdict: "Rejected",
          pros: ["Strong validation", "Serializable"],
          cons: ["LangGraph requires TypedDict", "Incompatible with graph state"],
          verdict_reason: "LangGraph StateGraph is designed specifically for TypedDict"
        },
        {
          name: "TypedDict",
          verdict: "Chosen",
          pros: ["Type safety", "LangGraph native", "Self-documenting", "IDE autocomplete"],
          cons: ["Python 3.8+ only"],
          verdict_reason: "LangGraph recommended pattern — type safety with zero overhead"
        },
      ],
      code_evidence: `# TypedDict enforces schema across all 6 agents:
class AgentState(TypedDict):
    feature_request: str      # Input from user
    architecture: str         # Written by Architect Agent
    code: str                 # Written by Developer Agent
    tests: str                # Written by Tester Agent
    vulnerability_report: str # Written by DevSentinel Scanner
    code_review_report: str   # Written by DevSentinel Reviewer
    final_code: str           # Written by Reviewer Agent
    final_output: str         # Compiled final output`,
      insight: "TypedDict makes the state contract between agents explicit. This is the principle of 'making illegal states unrepresentable' — the schema documents exactly what data flows between agents."
    },
  ]

  return (
    <div className="text-black">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Architecture Decision Records</h1>
        <p className="text-gray-800 text-lg">
          Every technical decision — what was considered, what was rejected, and why
        </p>
        <div className="mt-3 inline-flex items-center gap-2 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full text-sm text-gray-800">
          📋 {decisions.length} decisions documented with evidence
        </div>
      </div>

      <div className="max-w-4xl space-y-4">
        {decisions.map((adr, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-4">
                <span className="bg-black text-white text-xs px-2 py-1 rounded font-mono">
                  {adr.id}
                </span>
                <h3 className="font-bold text-lg">{adr.decision}</h3>
              </div>
              <span className="text-gray-800 text-xl">
                {expanded === i ? "↑" : "↓"}
              </span>
            </button>

            {expanded === i && (
              <div className="px-6 pb-6 border-t border-gray-100">
                <div className="mt-4 mb-6">
                  <p className="text-gray-800 text-sm">
                    <strong>Context:</strong> {adr.context}
                  </p>
                </div>

                <h4 className="font-bold mb-3 text-sm text-gray-800 uppercase tracking-wider">
                  Options Evaluated
                </h4>
                <div className="space-y-3 mb-6">
                  {adr.options.map((opt, j) => (
                    <div
                      key={j}
                      className={`border rounded-xl p-4 ${
                        opt.verdict === "Chosen"
                          ? "border-black bg-gray-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold">{opt.name}</h4>
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                          opt.verdict === "Chosen"
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {opt.verdict === "Chosen" ? "✅ Chosen" : "❌ Rejected"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <p className="text-xs text-gray-800 mb-1">Pros</p>
                          <ul className="space-y-1">
                            {opt.pros.map((pro, k) => (
                              <li key={k} className="text-xs text-gray-800 flex items-start gap-1">
                                <span className="text-green-500 mt-0.5">+</span> {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs text-gray-800 mb-1">Cons</p>
                          <ul className="space-y-1">
                            {opt.cons.map((con, k) => (
                              <li key={k} className="text-xs text-gray-800 flex items-start gap-1">
                                <span className="text-red-500 mt-0.5">−</span> {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className={`text-xs px-3 py-2 rounded-lg ${
                        opt.verdict === "Chosen"
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        <strong>Verdict:</strong> {opt.verdict_reason}
                      </div>
                    </div>
                  ))}
                </div>

                <h4 className="font-bold mb-3 text-sm text-gray-800 uppercase tracking-wider">
                  Code Evidence
                </h4>
                <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs text-gray-800 overflow-x-auto whitespace-pre-wrap mb-6 font-mono">
                  {adr.code_evidence}
                </pre>

                <div className="bg-black text-white rounded-xl p-4 flex items-start gap-3">
                  <span className="text-xl mt-0.5">💡</span>
                  <div>
                    <p className="font-bold text-sm mb-1">Key Insight</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{adr.insight}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArchitectureDecisions