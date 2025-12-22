'use client'
import UrlShortenerForm from "@/components/UrlShortenerForm"

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Simple URL Shortener
        </h1>
        <p className="text-sm text-gray-500 text-center mt-1">
          Shorten links quickly. Guests have limits.
        </p>

        <div className="mt-6">
          <UrlShortenerForm />
        </div>
      </div>
    </main>
  )
}
