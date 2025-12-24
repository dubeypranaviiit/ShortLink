import { currentUser } from "@clerk/nextjs/server"
import dbConnect from "@/lib/config/db"
import User from "@/lib/models/User.model"
export async function syncUser() {
  const clerkUser = await currentUser()
  if (!clerkUser) return null
  await dbConnect()
  let user = await User.findOne({ clerkId: clerkUser.id })
  if (user) return user
  user = await User.create({
    clerkId: clerkUser.id,
    name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
    email: clerkUser.emailAddresses[0]?.emailAddress,
  })
  return user
}
