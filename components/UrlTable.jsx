"use client"
import { useEffect, useState } from "react"
export default function UrlTable() {
  const [urls, setUrls] = useState([])
useEffect(() => {
  async function fetchUrls() {
    const res = await fetch("/api/my-urls", {
      credentials: "include",
    })

    if (!res.ok) return

    const data = await res.json()
    setUrls(data || [])
  }

  fetchUrls()
}, [])


  if (!urls.length) {
    return (
      <p className="text-sm text-gray-500">
        No URLs created yet.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2 text-left">Short</th>
            <th className="border px-3 py-2 text-left">Original</th>
            <th className="border px-3 py-2">Clicks</th>
            <th className="border px-3 py-2">Expires</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url._id}>
              <td className="border px-3 py-2 text-blue-600 underline">
                <a href={`/${url.shortCode}`} target="_blank">
                  {url.shortCode}
                </a>
              </td>
              <td className="border px-3 py-2 truncate max-w-xs">
                {url.originalUrl}
              </td>
              <td className="border px-3 py-2 text-center">
                {url.clicks}
              </td>
              <td className="border px-3 py-2 text-center">
                {new Date(url.expiresAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
