import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Login from "./pages/Login"
import AuthSuccess from "./pages/AuthSuccess"
import Dashboard from "./pages/Dashboard"
import PRSummary from "./pages/PRSummary"
import CodeReview from "./pages/CodeReview"
import VulnerabilityScanner from "./pages/VulnerabilityScanner"
import TestGenerator from "./pages/TestGenerator"
import ArchitectureSuggester from "./pages/ArchitectureSuggester"
import AgentPipeline from "./pages/AgentPipeline"
import Layout from "./components/Layout"

const NO_SIDEBAR_ROUTES = ["/", "/auth/success"]

function AppContent() {
  const location = useLocation()
  const showSidebar = !NO_SIDEBAR_ROUTES.includes(location.pathname)

  if (!showSidebar) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth/success" element={<AuthSuccess />} />
      </Routes>
    )
  }

  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pr-summary" element={<PRSummary />} />
        <Route path="/code-review" element={<CodeReview />} />
        <Route path="/vulnerability-scanner" element={<VulnerabilityScanner />} />
        <Route path="/test-generator" element={<TestGenerator />} />
        <Route path="/architecture" element={<ArchitectureSuggester />} />
        <Route path="/agent-pipeline" element={<AgentPipeline />} />
      </Routes>
    </Layout>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App