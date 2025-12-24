import { useUser } from "@clerk/nextjs"

export function useAuthState() {
  const { user, isLoaded } = useUser()

  return {
    isLoaded,
    isLoggedIn: !!user,
    clerkId: user?.id,
  }
}
