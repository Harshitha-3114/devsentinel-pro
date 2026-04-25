import { useState } from "react"
import axios from "axios"
import API_URL from "../config"

const LANGUAGES = ["python", "javascript", "typescript", "java", "go"]

function TestGenerator() {
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("python")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const handleSubmit = async () => {
    if (!code.trim()) return
    setLoading(true)
    setError("")
    setResult("")
    try {
      const res = await axios.post(`${API_URL}/api/generate-tests`, { code, language })
      setResult(res.data.result)
    } catch {
      setError("Failed to generate tests. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black p-8">
      <h1 className="text-3xl font-bold mb-2">Test Generator</h1>
      <p className="text-gray-1000 mb-8">Paste your code and get complete ready-to-run test cases instantly</p>

      <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-4xl">
        <div className="mb-4">
          <label className="text-gray-1000 text-sm mb-2 block">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-50 text-black border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
          >
            {LANGUAGES.map(lang => (
              <option key={lang} value={lang}>{lang.charAt(0).toUpperCase() + lang.slice(1)}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="text-gray-1000 text-sm mb-2 block">Your Code</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your function or module here..."
            rows={12}
            className="w-full bg-gray-50 text-gray-1000 font-mono text-sm border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Generating..." : "⚡ Generate Tests"}
        </button>
      </div>

      {error && (
        <div className="mt-6 bg-red-50 text-red-600 border border-red-200 rounded-xl p-4 max-w-4xl">{error}</div>
      )}

      {result && (
        <div className="mt-6 max-w-4xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-black">Generated Tests</h2>
            <button
              onClick={handleCopy}
              className="bg-white border border-gray-200 hover:border-black text-black px-4 py-2 rounded-lg text-sm transition"
            >
              {copied ? "✅ Copied!" : "📋 Copy All"}
            </button>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <pre className="whitespace-pre-wrap text-gray-1000 leading-relaxed font-sans">{result}</pre>
          </div>
        </div>
      )}
    </div>
  )
}

export default TestGenerator