// import { NextResponse } from "next/server"
// import dbConnect from "@/lib/config/db"
// import { getCurrentUser ,getExpiryDate} from "@/lib/auth"
// import Url from "@/lib/models/Url.model"
// import { getClientIp } from "@/lib/getClientIp"
// import { checkGuestLimit } from "@/lib/checkGuestLimit"
// import crypto from "crypto"
// import { auth } from "@clerk/nextjs/server"
// import IpLimit from "@/lib/models/IpLimit.model"
// export async function POST(req) {
//   try {
//     await dbConnect()
//     const { originalUrl } = await req.json()
//     if (!originalUrl) {
//       return NextResponse.json({ error: "URL is required" }, { status: 400 })
//     }
//     const { userId } = auth()
//     if (!userId) {
//       const ip = await getClientIp() 
//       const allowed = await checkGuestLimit(ip)
//       if (!allowed) {
//         return NextResponse.json(
//           { error: "Guest limit reached. Please sign up to continue." },
//           { status: 429 }
//         )
//       }
//     }
//     const user = await getCurrentUser()
//     const expiresAt = getExpiryDate(user)
//     const shortCode = crypto.randomBytes(4).toString("hex")


//     const url = await Url.create({
//       originalUrl,
//       shortCode,
//       createdBy: user ? user._id : null,
//       expiresAt,
//     })

//     return NextResponse.json({
//       data: { shortCode: url.shortCode },
//     })
//   } catch (error) {
    
//     console.error("SHORTEN ERROR:", error)
//     return NextResponse.json({ error: "Server error" }, { status: 500 })
//   }
// }
import { NextResponse } from "next/server"
import dbConnect from "@/lib/config/db"
import { auth } from "@clerk/nextjs/server"
import { syncUser } from "@/lib/syncUser"
import { getExpiryDate } from "@/lib/auth"
import Url from "@/lib/models/Url.model"
import { getClientIp } from "@/lib/getClientIp"
import { checkGuestLimit } from "@/lib/checkGuestLimit"
import crypto from "crypto"
export async function POST(req) {
  try {
    await dbConnect()
    const { originalUrl } = await req.json()
    if (!originalUrl) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      )
    }
    const { userId } = auth()
    let user = null

    if (!userId) {
      const ip = await getClientIp()
      const allowed = await checkGuestLimit(ip)
      if (!allowed) {
        return NextResponse.json(
          { error: "Guest limit reached. Please sign up." },
          { status: 429 }
        )
      }
    } else {
      user = await syncUser()
    }
    const expiresAt = getExpiryDate(user)
    const shortCode = crypto.randomBytes(4).toString("hex")
    const url = await Url.create({
      originalUrl,
      shortCode,
      createdBy: user ? user._id : null,
      expiresAt,
    })
    return NextResponse.json({
      data: { shortCode: url.shortCode },
    })
  } catch (error) {
    console.error("SHORTEN ERROR:", error)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}
