// import { useState } from "react"
// import axios from "axios"

// const LANGUAGES = ["python", "javascript", "typescript", "java", "cpp", "go", "rust"]

// function CodeReview() {
//   const [code, setCode] = useState("")
//   const [language, setLanguage] = useState("python")
//   const [review, setReview] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")

//   const handleSubmit = async () => {
//     if (!code.trim()) return
//     setLoading(true)
//     setError("")
//     setReview("")

//     try {
//       const res = await axios.post("http://localhost:8000/api/code-review", {
//         code,
//         language
//       })
//       setReview(res.data.review)
//     } catch (err) {
//       setError("Failed to review code. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-8">
//       <h1 className="text-3xl font-bold mb-2">Code Review</h1>
//       <p className="text-gray-1000 mb-8">
//         Paste your code and get an AI-powered senior engineer review
//       </p>

//       <div className="bg-gray-900 rounded-xl p-6 max-w-4xl">
//         {/* Language Selector */}
//         <div className="mb-4">
//           <label className="text-gray-1000 text-sm mb-2 block">Language</label>
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="bg-gray-800 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             {LANGUAGES.map(lang => (
//               <option key={lang} value={lang}>
//                 {lang.charAt(0).toUpperCase() + lang.slice(1)}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Code Input */}
//         <div className="mb-4">
//           <label className="text-gray-1000 text-sm mb-2 block">Your Code</label>
//           <textarea
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             placeholder="Paste your code here..."
//             rows={12}
//             className="w-full bg-gray-800 text-green-400 font-mono text-sm rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//           />
//         </div>

//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition disabled:opacity-50"
//         >
//           {loading ? "Reviewing..." : "Review Code"}
//         </button>
//       </div>

//       {error && (
//         <div className="mt-6 bg-red-900 text-red-300 rounded-xl p-4 max-w-4xl">
//           {error}
//         </div>
//       )}

//       {review && (
//         <div className="mt-6 bg-gray-900 rounded-xl p-6 max-w-4xl">
//           <h2 className="text-xl font-bold mb-4 text-blue-400">
//             Review Results
//           </h2>
//           <pre className="whitespace-pre-wrap text-gray-1000 leading-relaxed font-sans">
//             {review}
//           </pre>
//         </div>
//       )}
//     </div>
//   )
// }

// export default CodeReview













import { useState } from "react"
import axios from "axios"

const LANGUAGES = ["python", "javascript", "typescript", "java", "cpp", "go", "rust"]

function CodeReview() {
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("python")
  const [review, setReview] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    if (!code.trim()) return
    setLoading(true)
    setError("")
    setReview("")
    try {
      const res = await axios.post("http://localhost:8000/api/code-review", { code, language })
      setReview(res.data.review)
    } catch {
      setError("Failed to review code. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black p-8">
      <h1 className="text-3xl font-bold mb-2">Code Review</h1>
      <p className="text-gray-1000 mb-8">Paste your code and get an AI-powered senior engineer review</p>

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
            placeholder="Paste your code here..."
            rows={12}
            className="w-full bg-gray-50 text-gray-1000 font-mono text-sm border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Reviewing..." : "Review Code"}
        </button>
      </div>

      {error && (
        <div className="mt-6 bg-red-50 text-red-600 border border-red-200 rounded-xl p-4 max-w-4xl">{error}</div>
      )}

      {review && (
        <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6 max-w-4xl">
          <h2 className="text-xl font-bold mb-4 text-black">Review Results</h2>
          <pre className="whitespace-pre-wrap text-gray-1000 leading-relaxed font-sans">{review}</pre>
        </div>
      )}
    </div>
  )
}

export default CodeReview