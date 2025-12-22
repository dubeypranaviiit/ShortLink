"use client"

import { useState, useEffect } from "react"

export default function UrlShortenerForm() {
  const [origin, setOrigin] = useState("")
  const [url, setUrl] = useState("")
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin)
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setResult(null)

    if (!url.trim()) {
      setError("Please enter a URL")
      return
    }

    try {
      setLoading(true)

      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl: url }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Failed to shorten URL")
      } else {
        setResult(data.data)
        setUrl("")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="url"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full border rounded-md px-3 py-2 text-sm"
        required
      />

      <button
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded-md text-sm disabled:opacity-60"
      >
        {loading ? "Shortening..." : "Shorten URL"}
      </button>

      {error && (
        <p className="text-sm text-red-600 text-center">{error}</p>
      )}

      {result && origin && (
        <div className="bg-gray-100 p-3 rounded-md text-sm">
          <p className="text-gray-600">Short URL:</p>
          <a
            href={`/${result.shortCode}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline break-all"
          >
            {`${origin}/${result.shortCode}`}
          </a>
        </div>
      )}
    </form>
  )
}
