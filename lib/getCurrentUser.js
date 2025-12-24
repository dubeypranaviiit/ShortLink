import User from "@/lib/models/User.model"
import { auth } from "@clerk/nextjs/server"
export async function getCurrentUser() {
  const { userId } = auth()
  if (!userId) return null

  const user = await User.findOne({ clerkId: userId })
  return user
}
export function getExpiryDate(user) {
  if (!user) {
    return new Date(Date.now() + 24 * 60 * 60 * 1000)
  }
  if (user.plan === "PRO") {
    return null 
  }
  return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
}
