"use client"
import Link from "next/link"
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs"
export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="font-semibold">
             ShortLink
        </Link>
        <div className="flex items-center gap-4">
          <SignedIn>
            <Link href="/dashboard" className="text-sm">
              Dashboard
            </Link>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in" className="text-sm">
              Sign in
            </Link>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}
