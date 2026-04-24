// import { useState } from "react"
// import axios from "axios"

// function PRSummary() {
//   const [prUrl, setPrUrl] = useState("")
//   const [summary, setSummary] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")

//   const token = localStorage.getItem("github_token")

//   const handleSubmit = async () => {
//     if (!prUrl) return
//     setLoading(true)
//     setError("")
//     setSummary("")

//     try {
//       const res = await axios.post("http://localhost:8000/api/pr-summary", {
//         pr_url: prUrl,
//         token: token
//       })
//       setSummary(res.data.summary)
//     } catch (err) {
//       setError("Failed to fetch PR summary. Check the URL and try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-8">
//       <h1 className="text-3xl font-bold mb-2">PR Summary</h1>
//       <p className="text-gray-1000 mb-8">
//         Paste a GitHub Pull Request URL to get an AI-generated summary
//       </p>

//       <div className="bg-gray-900 rounded-xl p-6 max-w-3xl">
//         <input
//           type="text"
//           placeholder="https://github.com/owner/repo/pull/123"
//           value={prUrl}
//           onChange={(e) => setPrUrl(e.target.value)}
//           className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition disabled:opacity-50"
//         >
//           {loading ? "Analyzing..." : "Generate Summary"}
//         </button>
//       </div>

//       {error && (
//         <div className="mt-6 bg-red-900 text-red-300 rounded-xl p-4 max-w-3xl">
//           {error}
//         </div>
//       )}

//       {summary && (
//         <div className="mt-6 bg-gray-900 rounded-xl p-6 max-w-3xl">
//           <h2 className="text-xl font-bold mb-4 text-blue-400">Summary</h2>
//           <pre className="whitespace-pre-wrap text-gray-300 leading-relaxed">
//             {summary}
//           </pre>
//         </div>
//       )}
//     </div>
//   )
// }

// export default PRSummary
















import { useState } from "react"
import axios from "axios"

function PRSummary() {
  const [prUrl, setPrUrl] = useState("")
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const token = localStorage.getItem("github_token")

  const handleSubmit = async () => {
    if (!prUrl) return
    setLoading(true)
    setError("")
    setSummary("")
    try {
      const res = await axios.post("http://localhost:8000/api/pr-summary", {
        pr_url: prUrl, token
      })
      setSummary(res.data.summary)
    } catch {
      setError("Failed to fetch PR summary. Check the URL and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black p-8">
      <h1 className="text-3xl font-bold mb-2 text-black">PR Summary</h1>
      <p className="text-gray-1000 mb-8">Paste a GitHub Pull Request URL to get an AI-generated summary</p>

      <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-3xl">
        <input
          type="text"
          placeholder="https://github.com/owner/repo/pull/123"
          value={prUrl}
          onChange={(e) => setPrUrl(e.target.value)}
          className="w-full bg-gray-50 text-black border border-gray-200 rounded-lg px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-black"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Generate Summary"}
        </button>
      </div>

      {error && (
        <div className="mt-6 bg-red-50 text-red-600 border border-red-200 rounded-xl p-4 max-w-3xl">
          {error}
        </div>
      )}

      {summary && (
        <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6 max-w-3xl">
          <h2 className="text-xl font-bold mb-4 text-black">Summary</h2>
          <pre className="whitespace-pre-wrap text-gray-1000 leading-relaxed">{summary}</pre>
        </div>
      )}
    </div>
  )
}

export default PRSummary