import Link from "next/link"
import {  Link2 } from "lucide-react"
export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Link2 className="h-5 w-5 text-accent" />
              <span className="text-lg font-bold text-foreground">
                ShortLink
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Simple and reliable URL shortening with click tracking.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-foreground">
              Product
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-accent">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="transition-colors hover:text-accent">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="#features" className="transition-colors hover:text-accent">
                  Features
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-foreground">
              Resources
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="transition-colors hover:text-accent">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-accent">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-accent">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          
        </div>
      </div>
    </footer>
  )
}
