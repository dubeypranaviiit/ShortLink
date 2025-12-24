// "use client"

// import { useState, useEffect } from "react"

// export default function UrlShortenerForm() {
//   const [origin, setOrigin] = useState("")
//   const [url, setUrl] = useState("")
//   const [result, setResult] = useState(null)
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setOrigin(window.location.origin)
//     }
//   }, [])

//   async function handleSubmit(e) {
//     e.preventDefault()
//     setError("")
//     setResult(null)

//     if (!url.trim()) {
//       setError("Please enter a URL")
//       return
//     }

//     try {
//       setLoading(true)

//       const res = await fetch("/api/shorten", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ originalUrl: url }),
//       })

//       const data = await res.json()

//       if (!res.ok) {
//         setError(data.error || "Failed to shorten URL")
//       } else {
//         setResult(data.data)
//         setUrl("")
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <input
//         type="url"
//         placeholder="https://example.com"
//         value={url}
//         onChange={(e) => setUrl(e.target.value)}
//         className="w-full border rounded-md px-3 py-2 text-sm"
//         required
//       />

//       <button
//         disabled={loading}
//         className="w-full bg-black text-white py-2 rounded-md text-sm disabled:opacity-60"
//       >
//         {loading ? "Shortening..." : "Shorten URL"}
//       </button>

//       {error && (
//         <p className="text-sm text-red-600 text-center">{error}</p>
//       )}

//       {result && origin && (
//         <div className="bg-gray-100 p-3 rounded-md text-sm">
//           <p className="text-gray-600">Short URL:</p>
//           <a
//             href={`/${result.shortCode}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-600 underline break-all"
//           >
//             {`${origin}/${result.shortCode}`}
//           </a>
//         </div>
//       )}
//     </form>
//   )
// }
"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Link2, Copy, Check, Loader2, Download, ExternalLink, QrCode } from "lucide-react"
import QRCode from "qrcode"
import Image from "next/image"
export  default function UrlShortenerForm() {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [origin, setOrigin] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const { toast } = useToast()
  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin)
    }
  }, [])
  useEffect(() => {
    if (!shortUrl) return

    QRCode.toDataURL(shortUrl, {
      width: 256,
      margin: 2,
      color: {
        dark: "#2563eb",
        light: "#ffffff",
      },
    })
      .then(setQrCodeUrl)
      .catch((err) => console.error("QR error:", err))
  }, [shortUrl])
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a URL",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)

      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl: url }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to shorten URL")
      }

      const fullShortUrl = `${origin}/${data.data.shortCode}`
      setShortUrl(fullShortUrl)
      setUrl("")

      toast({
        title: "Success!",
        description: "Your short URL has been created",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    toast({ title: "Copied!" })
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadQRCode = () => {
    const link = document.createElement("a")
    link.download = "qr-code.png"
    link.href = qrCodeUrl
    link.click()
  }

  return (
    <div className="space-y-6">
      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="text-sm font-medium">Enter your long URL</label>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="pl-10"
                disabled={isLoading}
              />
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Shortening...
                </>
              ) : (
                "Shorten URL"
              )}
            </Button>
          </div>
        </form>
      </Card>

      {shortUrl && (
        <Card className="p-8 space-y-6">
          <div className="flex items-center gap-3">
            <Check className="text-green-500" />
            <h3 className="font-semibold">URL Shortened Successfully</h3>
          </div>

          <div className="flex gap-2 items-center">
            <a
              href={shortUrl}
              target="_blank"
              className="text-blue-600 underline flex-1 truncate"
            >
              {shortUrl}
            </a>

            <Button onClick={copyToClipboard}>
              {copied ? <Check /> : <Copy />}
            </Button>
          </div>

          {qrCodeUrl && (
            <div className="flex gap-6 items-center">
                 <Image
  src={qrCodeUrl}
  alt="QR Code"
  width={160}
  height={160}
  unoptimized
/>

              <Button variant="outline" onClick={downloadQRCode}>
                <Download className="mr-2 h-4 w-4" />
                Download QR
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
