import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function AuthSuccess() {
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get("token")
    if (token) {
      localStorage.setItem("github_token", token)
      navigate("/dashboard")
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <p className="text-white text-xl">Logging you in...</p>
    </div>
  )
}

export default AuthSuccess