import { SignIn } from "@clerk/nextjs"

export default function Page() {
  return <SignIn signInForceRedirectUrl="/auth/callback" />
}
