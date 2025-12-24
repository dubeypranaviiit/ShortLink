import { auth, clerkClient } from "@clerk/nextjs/server";
import dbConnect from "@/lib/config/db";
import User from "@/lib/models/User.model";
import { NextResponse } from "next/server";

export async function POST() {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const clerkUser = await clerkClient.users.getUser(userId);

  await dbConnect();

  const existing = await User.findOne({ clerkId: userId });
  if (existing) {
    return NextResponse.json({ message: "User exists" });
  }

  await User.create({
    clerkId: userId,
    email: clerkUser.emailAddresses[0].emailAddress,
    name: clerkUser.fullName,
    avatar: clerkUser.imageUrl,
  });

  return NextResponse.json({ message: "User created" });
}
