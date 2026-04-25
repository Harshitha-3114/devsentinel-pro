import { useNavigate } from "react-router-dom"
import {
  GitPullRequest,
  Code2,
  ShieldAlert,
  FlaskConical,
  Network,
  Bot,
  Search,
  RefreshCw,
  Circle
} from "lucide-react"

const ANALYZE_FEATURES = [
  {
    title: "PR Summary",
    description: "Get AI-generated summaries of GitHub Pull Requests",
    icon: GitPullRequest,
    path: "/pr-summary",
  },
  {
    title: "Code Review",
    description: "AI senior engineer reviews your code instantly",
    icon: Code2,
    path: "/code-review",
  },
  {
    title: "Vulnerability Scanner",
    description: "Scan code for security vulnerabilities and OWASP issues",
    icon: ShieldAlert,
    path: "/vulnerability-scanner",
  },
  {
    title: "Test Generator",
    description: "Generate complete pytest/jest test suites automatically",
    icon: FlaskConical,
    path: "/test-generator",
  },
  {
    title: "Architecture Suggester",
    description: "Get expert system design and architecture recommendations",
    icon: Network,
    path: "/architecture",
  },
]

const BUILD_FEATURES = [
  {
    title: "Closed Loop AI Dev Team",
    description: "4 agents build, scan, review and fix your code automatically",
    icon: Bot,
    path: "/agent-pipeline",
  },
]

function FeatureCard({ feature }) {
  const navigate = useNavigate()
  const Icon = feature.icon

  return (
    <div
      onClick={() => navigate(feature.path)}
      className="bg-white border border-gray-200 rounded-xl p-6 cursor-pointer transition hover:border-black hover:shadow-sm group"
    >
      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-black transition">
        <Icon size={18} className="text-gray-600 group-hover:text-white transition" />
      </div>
      <h3 className="text-black font-bold text-lg mb-2">{feature.title}</h3>
      <p className="text-gray-1000 text-sm leading-relaxed">{feature.description}</p>
      <div className="mt-4 text-black text-sm font-medium flex items-center gap-1">
        Open <span>→</span>
      </div>
    </div>
  )
}

function Dashboard() {
  return (
    <div className="text-black">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-black">
          Welcome to DevSentinel Pro
        </h1>
        <p className="text-gray-1000 text-lg">
          AI-Powered Closed-Loop DevSecOps Platform
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-10">
        {[
          { label: "Analyze Features", value: "5", icon: <Search size={20} /> },
          { label: "AI Agents", value: "4", icon: <Bot size={20} /> },
          { label: "Closed Loop", value: "Active", icon: <RefreshCw size={20} /> },
          { label: "Status", value: "Online", icon: <Circle size={20} className="text-green-500 fill-green-500" /> },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="text-gray-1000 mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-black">{stat.value}</div>
            <div className="text-gray-1000 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Analyze */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-black">Analyze</h2>
          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full border border-gray-200">
            5 features
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {ANALYZE_FEATURES.map(feature => (
            <FeatureCard key={feature.path} feature={feature} />
          ))}
        </div>
      </div>

      {/* Build */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-black">Build</h2>
          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full border border-gray-200">
            Closed Loop
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {BUILD_FEATURES.map(feature => (
            <FeatureCard key={feature.path} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard