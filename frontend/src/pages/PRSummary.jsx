import { useState } from "react"
import axios from "axios"
import API_URL from "../config"

function PRSummary() {
  const [prUrl, setPrUrl] = useState("")
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const token = localStorage.getItem("github_token")

  const handleSubmit = async () => {
    if (!prUrl) return
    if (!token) {
      setError("Please login with GitHub first.")
      return
    }
    setLoading(true)
    setError("")
    setSummary("")
    try {
      const res = await axios.post(`${API_URL}/api/pr-summary`, {
        pr_url: prUrl,
        token: token
      })
      setSummary(res.data.summary)
    } catch (err) {
      setError("Failed to fetch PR summary. Check the URL and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black p-8">
      <h1 className="text-3xl font-bold mb-2">PR Summary</h1>
      <p className="text-gray-700 mb-8">Get an AI-powered summary of your pull requests</p>

      <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-4xl">
        <div className="mb-4">
          <label className="text-gray-700 text-sm mb-2 block">Pull Request URL</label>
          <input
            type="text"
            placeholder="https://github.com/owner/repo/pull/123"
            value={prUrl}
            onChange={(e) => setPrUrl(e.target.value)}
            className="w-full bg-gray-50 text-black border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading || !prUrl}
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Generating..." : "Summarize PR"}
        </button>

        {summary && (
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Summary:</h3>
            <p className="whitespace-pre-wrap">{summary}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PRSummary