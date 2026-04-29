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
        <p className="text-gray-800 text-lg">
          Live experiment proving closed loop improves code security
        </p>
        <div className="mt-3 inline-flex items-center gap-2 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full text-sm text-gray-800">
          🔬 Research Experiment — Run live and see real results
        </div>
      </div>

      {/* Hypothesis */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-4xl mb-6">
        <h2 className="font-bold text-lg mb-3">Research Hypothesis</h2>
        <p className="text-gray-800 mb-4">
          AI-generated code contains security vulnerabilities. A closed loop system
          that automatically scans and fixes generated code produces more secure,
          production-ready output than direct generation alone.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-sm mb-2 text-gray-800">WITHOUT Closed Loop</h3>
            <p className="text-sm text-gray-800">
              Developer Agent generates code — directly output to user —
              vulnerabilities remain undetected
            </p>
          </div>
          <div className="bg-black text-white rounded-lg p-4">
            <h3 className="font-medium text-sm mb-2 text-white">WITH Closed Loop</h3>
            <p className="text-sm text-gray-300">
              Developer Agent generates — DevSentinel scans —
              Reviewer Agent fixes — secure output delivered
            </p>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-4xl mb-6">
        <label className="text-gray-600 text-sm mb-2 block font-medium">
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
          {loading ? "Running Experiment..." : "Run Live Experiment"}
        </button>
        {loading && (
          <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-gray-800 text-sm font-medium mb-1">
              Experiment running — 4 phases in progress
            </p>
            <p className="text-gray-800 text-xs">
              Phase 1: Generate code — Phase 2: Scan vulnerabilities —
              Phase 3: Fix with closed loop — Phase 4: Rescan to verify
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
            <h2 className="text-xl font-bold mb-4">Experiment Results</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">
                  {result.impact.vulnerabilities_fixed}
                </div>
                <div className="text-gray-300 text-sm">Vulnerabilities Fixed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">
                  {result.impact.quality_improvement_percent}%
                </div>
                <div className="text-gray-300 text-sm">Quality Improvement</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">
                  {result.with_closed_loop.production_ready === "YES" ? "YES" : "NO"}
                </div>
                <div className="text-gray-300 text-sm">Production Ready After Fix</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-gray-300 text-sm">
                Insight: {result.impact.verdict}
              </p>
            </div>
          </div>

          {/* Side by Side */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <h3 className="font-bold">Without Closed Loop</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-800 text-sm">Quality Score</span>
                  <span className="font-bold text-red-500">
                    {result.without_closed_loop.quality_score}/10
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-800 text-sm">Vulnerabilities</span>
                  <span className="font-bold text-red-500">
                    {result.without_closed_loop.vulnerability_count} found
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-800 text-sm">Production Ready</span>
                  <span className="font-bold text-red-500">
                    {result.without_closed_loop.production_ready}
                  </span>
                </div>
                <div className="py-2">
                  <span className="text-gray-800 text-sm block mb-1">Issues Found</span>
                  <span className="text-red-600 text-xs">
                    {result.without_closed_loop.issues}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-black text-white rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                <h3 className="font-bold">With Closed Loop</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-300 text-sm">Quality Score</span>
                  <span className="font-bold text-green-400">
                    {result.with_closed_loop.quality_score}/10
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-300 text-sm">Vulnerabilities</span>
                  <span className="font-bold text-green-400">
                    {result.with_closed_loop.vulnerability_count} remaining
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-800 text-sm">Production Ready</span>
                  <span className="font-bold text-green-400">
                    {result.with_closed_loop.production_ready}
                  </span>
                </div>
                <div className="py-2">
                  <span className="text-gray-300 text-sm block mb-1">Remaining Issues</span>
                  <span className="text-green-400 text-xs">
                    {result.with_closed_loop.issues}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Code Comparison */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Code Comparison</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveCode("before")}
                  className={`px-3 py-1 rounded-lg text-sm border transition ${
                    activeCode === "before"
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-800 border-gray-200"
                  }`}
                >
                  Before (Vulnerable)
                </button>
                <button
                  onClick={() => setActiveCode("after")}
                  className={`px-3 py-1 rounded-lg text-sm border transition ${
                    activeCode === "after"
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-800 border-gray-200"
                  }`}
                >
                  After (Fixed)
                </button>
              </div>
            </div>
            <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs text-gray-800 overflow-x-auto whitespace-pre-wrap">
              {activeCode === "before"
                ? result.without_closed_loop.generated_code
                : result.with_closed_loop.fixed_code}
            </pre>
          </div>

          {/* Conclusion */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold mb-3">Research Conclusion</h3>
            <p className="text-gray-800 text-sm leading-relaxed">
              This live experiment demonstrates that AI-generated code contains
              security vulnerabilities that are invisible without automated scanning.
              The closed loop architecture in DevSentinel Pro automatically detects
              and eliminates these vulnerabilities before code reaches the developer —
              improving code quality by {result.impact.quality_improvement_percent}% and
              fixing {result.impact.vulnerabilities_fixed} security issues without
              human intervention.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClosedLoopImpact