import { auth } from "@clerk/nextjs/server"
import User from "./models/User.model"
export async function getCurrentUser() {
  const { userId } = auth()
  if (!userId) return null
  return await User.findOne({ clerkId: userId })
}
export function getExpiryDate(user) {
  const now = Date.now()
  if (!user) return new Date(now + 7 * 24 * 60 * 60 * 1000) // guest
  if (user.role === "user") return new Date(now + 30 * 24 * 60 * 60 * 1000)
  return new Date(now + 365 * 24 * 60 * 60 * 1000) // premium
}
