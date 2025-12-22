import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
    },

    role: {
      type: String,
      enum: ["user", "premium"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.models.User || mongoose.model("User", UserSchema)

export default User
