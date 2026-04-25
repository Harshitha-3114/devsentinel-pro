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