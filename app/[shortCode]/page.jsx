import { redirect } from "next/navigation"
import dbConnect from "@/lib/config/db"
import Url from "@/lib/models/Url.model"

export default async function RedirectPage({ params }) {
  const { shortCode } = await params   
  if (!shortCode) {
    redirect("/?error=invalid-link")
  }
  await dbConnect()
  const url = await Url.findOne({ shortCode })
  if (!url) {
    redirect("/?error=not-found")
  }
  if (url.expiresAt && url.expiresAt < new Date()) {
    redirect("/?error=expired")
  }
  url.clicks += 1
  url.lastAccessed = new Date()
  await url.save()
  redirect(url.originalUrl)
}
