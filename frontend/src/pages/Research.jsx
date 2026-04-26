import { useState } from "react"
import axios from "axios"
import API_URL from "../config"

const MODELS = [
  { name: "LLaMA 3.3 70B", description: "Meta's largest open model — best quality", tag: "Chosen Model" },
  { name: "LLaMA 3.1 8B", description: "Lightweight fast model", tag: "Baseline" },
  { name: "Mixtral 8x7B", description: "Mixture of experts", tag: "Alternative" },
]

function Research() {
  const [code, setCode] = useState(`def get_user(username):
    import sqlite3
    conn = sqlite3.connect("users.db")
    query = f"SELECT * FROM users WHERE username = '{username}'"
    return conn.execute(query).fetchall()

SECRET_KEY = "mysecret123"
password = "admin123"`)

  const [benchmarkResult, setBenchmarkResult] = useState(null)
  const [promptResult, setPromptResult] = useState(null)
  const [loadingBenchmark, setLoadingBenchmark] = useState(false)
  const [loadingPrompt, setLoadingPrompt] = useState(false)
  const [activeSection, setActiveSection] = useState("benchmark")

  const runBenchmark = async () => {
    setLoadingBenchmark(true)
    setBenchmarkResult(null)
    try {
      const res = await axios.post(`${API_URL}/api/research/benchmark`, { code })
      setBenchmarkResult(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingBenchmark(false)
    }
  }

  const runPromptComparison = async () => {
    setLoadingPrompt(true)
    setPromptResult(null)
    try {
      const res = await axios.post(`${API_URL}/api/research/prompt-comparison`, { code })
      setPromptResult(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingPrompt(false)
    }
  }

  return (
    <div className="text-black">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">LLM Benchmark</h1>
        <p className="text-gray-500 text-lg">
          Live experiments comparing LLM models and prompting strategies
        </p>
        <div className="mt-3 inline-flex items-center gap-2 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full text-sm text-gray-600">
          🔬 Original research conducted as part of DevSentinel Pro
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-3 mb-8 border-b border-gray-200 pb-4">
        {[
          { id: "benchmark", label: "🏆 LLM Model Comparison" },
          { id: "prompt", label: "🧪 Prompt Engineering" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium transition border ${
              activeSection === tab.id
                ? "bg-black text-white border-black"
                : "bg-white text-gray-500 border-gray-200 hover:border-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Shared Code Input */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-4xl mb-8">
        <label className="text-gray-500 text-sm mb-2 block font-medium">
          Test Code — used across all experiments
        </label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={8}
          className="w-full bg-gray-50 text-gray-800 font-mono text-sm border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black resize-none"
        />
      </div>

      {/* LLM Benchmark Section */}
      {activeSection === "benchmark" && (
        <div className="max-w-4xl">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">LLM Model Comparison</h2>
            <p className="text-gray-500">
              Research Question: Which LLM gives the best code review quality vs response speed?
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <h3 className="font-bold mb-3 text-black">Models Being Tested</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {MODELS.map(m => (
                <div key={m.name} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-sm">{m.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      m.tag === "Chosen Model"
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {m.tag}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs">{m.description}</p>
                </div>
              ))}
            </div>
            <button
              onClick={runBenchmark}
              disabled={loadingBenchmark}
              className="bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition disabled:opacity-50"
            >
              {loadingBenchmark ? "Running Benchmark..." : "▶ Run Live Benchmark"}
            </button>
            {loadingBenchmark && (
              <p className="text-gray-400 text-sm mt-2">
                Sending same code to 3 models simultaneously...
              </p>
            )}
          </div>

          {benchmarkResult && (
            <div>
              <div className="bg-black text-white rounded-xl p-4 mb-6 flex items-center gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <p className="font-bold">Research Insight</p>
                  <p className="text-gray-300 text-sm">{benchmarkResult.insight}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {benchmarkResult.results.map((result, i) => (
                  <div
                    key={i}
                    className={`border rounded-xl p-4 ${
                      result.model === benchmarkResult.fastest_model
                        ? "border-black bg-gray-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-sm">{result.model}</h3>
                      {result.model === benchmarkResult.fastest_model && (
                        <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
                          Winner
                        </span>
                      )}
                    </div>
                    <div className="text-2xl font-bold text-black mb-1">
                      {result.response_time}s
                    </div>
                    <div className="text-gray-400 text-xs mb-3">Response time</div>
                    <div className="text-xs text-gray-500 mb-1">
                      Tokens: {result.tokens_used}
                    </div>
                    <div className="border-t border-gray-100 pt-3 mt-3">
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {result.response?.substring(0, 200)}...
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold mb-4">Detailed Comparison Table</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 text-gray-500">Model</th>
                      <th className="text-left py-2 text-gray-500">Response Time</th>
                      <th className="text-left py-2 text-gray-500">Tokens Used</th>
                      <th className="text-left py-2 text-gray-500">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {benchmarkResult.results.map((r, i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td className="py-3 font-medium">{r.model}</td>
                        <td className="py-3">{r.response_time}s</td>
                        <td className="py-3">{r.tokens_used}</td>
                        <td className="py-3">{r.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Prompt Engineering Section */}
      {activeSection === "prompt" && (
        <div className="max-w-4xl">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Prompt Engineering Analysis</h2>
            <p className="text-gray-500">
              Research Question: How does prompt structure affect output quality?
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <h3 className="font-bold mb-3">3 Prompting Strategies Compared</h3>
            <div className="space-y-3 mb-4">
              {[
                { name: "Basic", desc: "Simple instruction — 'Review this code'", score: "3/10" },
                { name: "Role", desc: "Assign expert role — 'You are a senior engineer'", score: "6/10" },
                { name: "Structured", desc: "Your approach — OWASP mapping + severity levels", score: "9/10" },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between border border-gray-200 rounded-lg p-3">
                  <div>
                    <span className="font-medium text-sm">{p.name} Prompting</span>
                    <p className="text-gray-400 text-xs">{p.desc}</p>
                  </div>
                  <span className={`text-sm font-bold ${i === 2 ? "text-black" : "text-gray-400"}`}>
                    Expected: {p.score}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={runPromptComparison}
              disabled={loadingPrompt}
              className="bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition disabled:opacity-50"
            >
              {loadingPrompt ? "Running Comparison..." : "▶ Run Live Comparison"}
            </button>
            {loadingPrompt && (
              <p className="text-gray-400 text-sm mt-2">
                Testing 3 prompting strategies on same code...
              </p>
            )}
          </div>

          {promptResult && (
            <div>
              <div className="bg-black text-white rounded-xl p-4 mb-6 flex items-center gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <p className="font-bold">Research Insight</p>