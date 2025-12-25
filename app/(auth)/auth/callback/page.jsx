import { redirect } from "next/navigation"
export default async function AuthCallbackPage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  await fetch(`${baseUrl}/api/user/sync`, {
    method: "POST",
  })
  redirect("/")
}
