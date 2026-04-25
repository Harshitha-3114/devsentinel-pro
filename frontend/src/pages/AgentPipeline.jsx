import { useState } from "react"
import axios from "axios"
import API_URL from "../config"
const PIPELINE_STEPS = [
  { id: "architect", label: "Architect", icon: "🏗️" },
  { id: "developer", label: "Developer", icon: "💻" },
  { id: "tester", label: "Tester", icon: "🧪" },
  { id: "vulnerability_scan", label: "Vuln Scan", icon: "🔍" },
  { id: "code_review", label: "Code Review", icon: "📋" },
  { id: "reviewer", label: "Reviewer", icon: "✅" },
]

function AgentPipeline() {
  const [featureRequest, setFeatureRequest] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("architecture")

  const handleSubmit = async () => {
    if (!featureRequest.trim()) return
    setLoading(true)
    setError("")
    setResult(null)
    try {
      const res = await axios.post(
        `${API_URL}/api/agent/run`,
        { feature_request: featureRequest },
        { timeout: 180000 }
      )
      setResult(res.data)
      setActiveTab("architecture")
    } catch {
      setError("Pipeline failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: "architecture", label: "🏗️ Architecture" },
    { id: "code", label: "💻 Code" },
    { id: "tests", label: "🧪 Tests" },
    { id: "vulnerability_report", label: "🔍 Vuln Scan" },
    { id: "code_review_report", label: "📋 Code Review" },
    { id: "review", label: "✅ Final Fix" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 text-black p-8">
      <h1 className="text-3xl font-bold mb-2">Closed Loop AI Dev Team</h1>
      <p className="text-gray-1000 mb-8">
        4 agents build your feature — DevSentinel scans it — Reviewer fixes it automatically
      </p>

      {/* Pipeline Steps */}
      <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2 flex-wrap">
        {PIPELINE_STEPS.map((step, index) => (
          <div key={step.id} className="flex items-center gap-1">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition ${
              result
                ? "border-black bg-black text-white"
                : "border-gray-200 bg-white text-gray-1000"
            }`}>
              <span>{step.icon}</span>
              <span className="font-medium whitespace-nowrap">{step.label}</span>
              {result && <span className="text-xs">✓</span>}
            </div>
            {index < PIPELINE_STEPS.length - 1 && (
              <span className="text-gray-1000 text-lg">→</span>
            )}
          </div>
        ))}
      </div>

      {/* Closed Loop Badge */}
      <div className="mb-6 inline-flex items-center gap-2 bg-gray-100 border border-gray-200 px-4 py-2 rounded-lg text-sm text-gray-1000">
        🔄 DevSentinel Closed Loop Active — Generated code is automatically scanned and reviewed
      </div>

      {/* Input */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-4xl mb-6">
        <label className="text-gray-1000 text-sm mb-2 block">Feature Request</label>
        <textarea
          value={featureRequest}
          onChange={(e) => setFeatureRequest(e.target.value)}
          placeholder="Describe the feature you want to build..."
          rows={4}
          className="w-full bg-gray-50 text-black border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black resize-none mb-4"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? (
            <><span className="animate-spin inline-block">⚙️</span> Running Pipeline...</>
          ) : " Run Closed Loop Pipeline"}
        </button>
        {loading && (
          <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-gray-1000 text-sm font-medium mb-1">⏳ Please wait 60-90 seconds</p>
            <p className="text-gray-1000 text-xs">Architect → Developer → Tester → Vuln Scan → Code Review → Fix</p>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl p-4 max-w-4xl mb-6">{error}</div>
      )}

      {result && (
        <div className="max-w-4xl">
          <div className="mb-4 bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl">🎉</span>
            <div>
              <p className="text-black font-bold">Closed Loop Complete!</p>
              <p className="text-gray-1000 text-sm">Code was built, scanned, reviewed and fixed automatically</p>
            </div>
          </div>

          <div className="flex gap-2 mb-4 flex-wrap">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition border ${
                  activeTab === tab.id
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-1000 border-gray-200 hover:border-black hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <pre className="whitespace-pre-wrap text-gray-1000 leading-relaxed font-sans text-sm">
              {result[activeTab]}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}

export default AgentPipeline