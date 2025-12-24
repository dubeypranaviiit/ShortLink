'use client'
import UrlTable from "@/components/UrlTable"

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold text-gray-800">
        Your Shortened URLs
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Manage and track your links
      </p>

      <div className="mt-6">
        <UrlTable />
      </div>
      
    </div>
  )
}
