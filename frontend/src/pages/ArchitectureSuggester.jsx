// import { useState } from "react"
// import axios from "axios"

// const SCALES = ["startup", "mid-size", "enterprise"]

// function ArchitectureSuggester() {
//   const [description, setDescription] = useState("")
//   const [code, setCode] = useState("")
//   const [scale, setScale] = useState("startup")
//   const [result, setResult] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")

//   const handleSubmit = async () => {
//     if (!description.trim()) return
//     setLoading(true)
//     setError("")
//     setResult("")

//     try {
//       const res = await axios.post(
//         "http://localhost:8000/api/architecture-suggest",
//         { description, code, scale }
//       )
//       setResult(res.data.result)
//     } catch (err) {
//       setError("Failed to analyze architecture. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-8">
//       <h1 className="text-3xl font-bold mb-2">Architecture Suggester</h1>
//       <p className="text-gray-1000 mb-8">
//         Describe your system and get expert architecture recommendations
//       </p>

//       <div className="bg-gray-900 rounded-xl p-6 max-w-4xl">
//         {/* Scale Selector */}
//         <div className="mb-4">
//           <label className="text-gray-1000 text-sm mb-2 block">
//             Target Scale
//           </label>
//           <div className="flex gap-3">
//             {SCALES.map(s => (
//               <button
//                 key={s}
//                 onClick={() => setScale(s)}
//                 className={`px-4 py-2 rounded-lg capitalize font-medium transition ${
//                   scale === s
//                     ? "bg-purple-600 text-white"
//                     : "bg-gray-800 text-gray-1000 hover:bg-gray-700"
//                 }`}
//               >
//                 {s}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* System Description */}
//         <div className="mb-4">
//           <label className="text-gray-1000 text-sm mb-2 block">
//             System Description <span className="text-red-400">*</span>
//           </label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Describe your system... e.g. A FastAPI backend with React frontend, PostgreSQL database, user authentication, and REST APIs for an e-commerce platform..."
//             rows={4}
//             className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 resize-none"
//           />
//         </div>

//         {/* Optional Code */}
//         <div className="mb-4">
//           <label className="text-gray-1000 text-sm mb-2 block">
//             Code Sample{" "}
//             <span className="text-gray-1000">(optional)</span>
//           </label>
//           <textarea
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             placeholder="Paste relevant code for deeper analysis..."
//             rows={6}
//             className="w-full bg-gray-800 text-green-400 font-mono text-sm rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 resize-none"
//           />
//         </div>

//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition disabled:opacity-50 flex items-center gap-2"
//         >
//           {loading ? "Analyzing..." : "🏗️ Analyze Architecture"}
//         </button>
//       </div>

//       {error && (
//         <div className="mt-6 bg-red-900 text-red-300 rounded-xl p-4 max-w-4xl">
//           {error}
//         </div>
//       )}

//       {result && (
//         <div className="mt-6 bg-gray-900 rounded-xl p-6 max-w-4xl">
//           <h2 className="text-xl font-bold mb-4 text-purple-400">
//             Architecture Report
//           </h2>
//           <pre className="whitespace-pre-wrap text-gray-1000 leading-relaxed font-sans">
//             {result}
//           </pre>
//         </div>
//       )}
//     </div>
//   )
// }

// export default ArchitectureSuggester














import { useState } from "react"
import axios from "axios"

const SCALES = ["startup", "mid-size", "enterprise"]

function ArchitectureSuggester() {
  const [description, setDescription] = useState("")
  const [code, setCode] = useState("")
  const [scale, setScale] = useState("startup")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    if (!description.trim()) return
    setLoading(true)
    setError("")
    setResult("")
    try {
      const res = await axios.post("http://localhost:8000/api/architecture-suggest", { description, code, scale })
      setResult(res.data.result)
    } catch {
      setError("Failed to analyze architecture. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black p-8">
      <h1 className="text-3xl font-bold mb-2">Architecture Suggester</h1>
      <p className="text-gray-1000 mb-8">Describe your system and get expert architecture recommendations</p>

      <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-4xl">
        <div className="mb-4">
          <label className="text-gray-1000 text-sm mb-2 block">Target Scale</label>
          <div className="flex gap-3">
            {SCALES.map(s => (
              <button
                key={s}
                onClick={() => setScale(s)}
                className={`px-4 py-2 rounded-lg capitalize font-medium transition border ${
                  scale === s
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-1000 border-gray-200 hover:border-black hover:text-black"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="text-gray-1000 text-sm mb-2 block">
            System Description <span className="text-red-400">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your system..."
            rows={4}
            className="w-full bg-gray-50 text-black border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black resize-none"
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-1000 text-sm mb-2 block">
            Code Sample <span className="text-gray-1000">(optional)</span>
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste relevant code for deeper analysis..."
            rows={6}
            className="w-full bg-gray-50 text-gray-800 font-mono text-sm border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Analyzing..." : " Analyze Architecture"}
        </button>
      </div>

      {error && (
        <div className="mt-6 bg-red-50 text-red-600 border border-red-200 rounded-xl p-4 max-w-4xl">{error}</div>
      )}

      {result && (
        <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6 max-w-4xl">
          <h2 className="text-xl font-bold mb-4 text-black">Architecture Report</h2>
          <pre className="whitespace-pre-wrap text-gray-1000 leading-relaxed font-sans">{result}</pre>
        </div>
      )}
    </div>
  )
}

export default ArchitectureSuggester