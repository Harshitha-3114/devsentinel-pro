// import { Link, useLocation } from "react-router-dom"

// const ANALYZE_LINKS = [
//   { path: "/pr-summary", label: "PR Summary", icon: "📄" },
//   { path: "/code-review", label: "Code Review", icon: "🔎" },
//   { path: "/vulnerability-scanner", label: "Vuln Scanner", icon: "🛡️" },
//   { path: "/test-generator", label: "Test Generator", icon: "🧪" },
//   { path: "/architecture", label: "Architecture", icon: "🏗️" },
// ]

// const BUILD_LINKS = [
//   { path: "/agent-pipeline", label: "AI Dev Team", icon: "🤖" },
// ]

// function Sidebar() {
//   const location = useLocation()

//   const isActive = (path) => location.pathname === path

//   return (
//     <div className="w-64 min-h-screen bg-gray-900 border-r border-gray-800 flex flex-col fixed left-0 top-0">
//       {/* Logo */}
//       <div className="p-6 border-b border-gray-800">
//         <h1 className="text-xl font-bold text-white">DevSentinel Pro</h1>
//         <p className="text-gray-900 text-xs mt-1">AI DevSecOps Platform</p>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 p-4 overflow-y-auto">
//         {/* Dashboard */}
//         <Link
//           to="/dashboard"
//           className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-4 transition ${
//             isActive("/dashboard")
//               ? "bg-blue-600 text-white"
//               : "text-gray-900 hover:bg-gray-800 hover:text-white"
//           }`}
//         >
//           <span>🏠</span>
//           <span className="font-medium">Dashboard</span>
//         </Link>

//         {/* Analyze Section */}
//         <div className="mb-2">
//           <p className="text-gray-900 text-xs font-semibold uppercase tracking-wider px-3 mb-2">
//             Analyze
//           </p>
//           <div className="space-y-1">
//             {ANALYZE_LINKS.map(link => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
//                   isActive(link.path)
//                     ? "bg-blue-600 text-white"
//                     : "text-gray-900 hover:bg-gray-800 hover:text-white"
//                 }`}
//               >
//                 <span>{link.icon}</span>
//                 <span className="text-sm">{link.label}</span>
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* Build Section */}
//         <div className="mt-4">
//           <p className="text-gray-900 text-xs font-semibold uppercase tracking-wider px-3 mb-2">
//             Build
//           </p>
//           <div className="space-y-1">
//             {BUILD_LINKS.map(link => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
//                   isActive(link.path)
//                     ? "bg-blue-600 text-white"
//                     : "text-gray-900 hover:bg-gray-800 hover:text-white"
//                 }`}
//               >
//                 <span>{link.icon}</span>
//                 <span className="text-sm">{link.label}</span>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </nav>

//       {/* User Profile at Bottom */}
//       <div className="p-4 border-t border-gray-800">
//         <div className="flex items-center gap-3 px-3 py-2">
//           <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
//             G
//           </div>
//           <div>
//             <p className="text-white text-sm font-medium">GitHub User</p>
//             <p className="text-gray-900 text-xs">Connected ✓</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Sidebar















import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  GitPullRequest,
  Code2,
  ShieldAlert,
  FlaskConical,
  Network,
  Bot
} from "lucide-react"

const ANALYZE_LINKS = [
  { path: "/pr-summary", label: "PR Summary", icon: <GitPullRequest size={16} /> },
  { path: "/code-review", label: "Code Review", icon: <Code2 size={16} /> },
  { path: "/vulnerability-scanner", label: "Vuln Scanner", icon: <ShieldAlert size={16} /> },
  { path: "/test-generator", label: "Test Generator", icon: <FlaskConical size={16} /> },
  { path: "/architecture", label: "Architecture", icon: <Network size={16} /> },
]

const BUILD_LINKS = [
  { path: "/agent-pipeline", label: "AI Dev Team", icon: <Bot size={16} /> },
]

function Sidebar() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-black">DevSentinel Pro</h1>
        <p className="text-gray-900 text-xs mt-1">AI DevSecOps Platform</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        {/* Dashboard */}
        <Link
          to="/dashboard"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-4 transition ${
            isActive("/dashboard")
              ? "bg-black text-white"
              : "text-gray-900 hover:bg-gray-100 hover:text-black"
          }`}
        >
          <LayoutDashboard size={16} />
          <span className="font-medium text-sm">Dashboard</span>
        </Link>

        {/* Analyze Section */}
        <div className="mb-2">
          <p className="text-gray-900 text-xs font-semibold uppercase tracking-wider px-3 mb-2">
            Analyze
          </p>
          <div className="space-y-1">
            {ANALYZE_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive(link.path)
                    ? "bg-black text-white"
                    : "text-gray-900 hover:bg-gray-100 hover:text-black"
                }`}
              >
                {link.icon}
                <span className="text-sm">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Build Section */}
        <div className="mt-4">
          <p className="text-gray-900 text-xs font-semibold uppercase tracking-wider px-3 mb-2">
            Build
          </p>
          <div className="space-y-1">
            {BUILD_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive(link.path)
                    ? "bg-black text-white"
                    : "text-gray-900 hover:bg-gray-100 hover:text-black"
                }`}
              >
                {link.icon}
                <span className="text-sm">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* User */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-sm font-bold text-white">
            G
          </div>
          <div>
            <p className="text-black text-sm font-medium">GitHub User</p>
            <p className="text-gray-900 text-xs">Connected ✓</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar