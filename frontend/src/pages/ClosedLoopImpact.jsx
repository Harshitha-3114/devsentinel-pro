import { useState } from "react"
import axios from "axios"
import API_URL from "../config"

function ClosedLoopImpact() {
  const [featureRequest, setFeatureRequest] = useState(
    "Build a user login system with database authentication and session management"
  )
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeCode, setActiveCode] = useState("before")

  const runExperiment = async () => {
    setLoading(true)
    setError("")
    setResult(null)
    try {
      const res = await axios.post(
        `${API_URL}/api/research/closed-loop-impact`,
        { feature_request: featureRequest },
        { timeout: 120000 }
      )
      setResult(res.data)
    } catch (err) {
      setError("Experiment failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="text-black">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Closed Loop Impact Analysis</h1>
        <p className="text-gray-500 text-lg">
          Live experiment proving closed loop improves code security
        </p>
        <div className="mt-3 inline-flex items-center gap-2 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full text-sm text-gray-600">
          🔬 Research Experiment — Run live and see real results
        </div>
      </div>

      {/* Hypothesis */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-4xl mb-6">
        <h2 className="font-bold text-lg mb-3">Research Hypothesis</h2>
        <p className="text-gray-600 mb-4">
          AI-generated code contains security vulnerabilities. A closed loop system
          that automatically scans and fixes generated code produces more secure,
          production-ready output than direct generation alone.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-sm mb-2 text-gray-500">WITHOUT Closed Loop</h3>
            <p className="text-sm text-gray-600">
              Developer Agent generates code → directly output to user →
              vulnerabilities remain undetected
            </p>
          </div>
          <div className="bg-black text-white rounded-lg p-4">
            <h3 className="font-medium text-sm mb-2 text-gray-300">WITH Closed Loop ✓</h3>
            <p className="text-sm text-gray-300">
              Developer Agent generates → DevSentinel scans →
              Reviewer Agent fixes → secure output delivered
            </p>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-4xl mb-6">
        <label className="text-gray-500 text-sm mb-2 block font-medium">
          Feature Request
        </label>
        <textarea
          value={featureRequest}
          onChange={(e) => setFeatureRequest(e.target.value)}
          rows={3}
          className="w-full bg-gray-50 text-black border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black resize-none mb-4"
        />
        <button
          onClick={runExperiment}
          disabled={loading}
          className="bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? (
            <><span className="animate-spin inline-block">⚙️</span> Running Experiment...</>
          ) : "▶ Run Live Experiment"}
        </button>
        {loading && (
          <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-gray-600 text-sm font-medium mb-1">
              ⏳ Experiment running — 4 phases in progress
            </p>
            <p className="text-gray-400 text-xs">
              Phase 1: Generate → Phase 2: Scan → Phase 3: Fix → Phase 4: Rescan
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl p-4 max-w-4xl mb-6">
          {error}
        </div>
      )}

      {result && (
        <div className="max-w-4xl">
          {/* Impact Summary */}
          <div className="bg-black text-white rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">📊 Experiment Results</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">
                  {result.impact.vulnerabilities_fixed}
                </div>
                <div className="text-gray-300 text-sm">Vulnerabilities Fixed</div>