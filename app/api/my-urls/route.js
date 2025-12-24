// import { NextResponse } from "next/server"
// import { auth } from "@clerk/nextjs/server"
// import dbConnect from "@/lib/config/db"
// import User from "@/lib/models/User.model"
// import Url from "@/lib/models/Url.model"
// export async function GET() {
//   const { userId: clerkUserId } = auth()

//   if (!clerkUserId) {
//     return NextResponse.json(
//       { error: "Unauthorized" },
//       { status: 401 }
//     )
//   }

//   await dbConnect()

//   const user = await User.findOne({ clerkId: clerkUserId }).lean()

//   if (!user) {
//     return NextResponse.json([], {
//       headers: { "Cache-Control": "no-store" },
//     })
//   }

//   const urls = await Url.find({ createdBy: user._id })
//     .select("shortCode originalUrl clicks expiresAt")
//     .sort({ createdAt: -1 })
//     .lean()

//   return NextResponse.json(urls, {
//     headers: { "Cache-Control": "no-store" },
//   })
// }
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import dbConnect from "@/lib/config/db"
import User from "@/lib/models/User.model"
import Url from "@/lib/models/Url.model"
import { syncUser } from "@/lib/syncUser"

export async function GET() {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  await dbConnect()

  // 🔑 Ensure user exists
  const user = await syncUser()

  const urls = await Url.find({ createdBy: user._id })
    .select("shortCode originalUrl clicks expiresAt")
    .sort({ createdAt: -1 })
    .lean()

  return NextResponse.json(urls, {
    headers: { "Cache-Control": "no-store" },
  })
}

