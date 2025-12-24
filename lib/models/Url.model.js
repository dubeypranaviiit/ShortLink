import mongoose from "mongoose"
const UrlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
      trim: true,
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // null means guest user
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    lastAccessed: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

const Url = mongoose.models.Url || mongoose.model("Url", UrlSchema)

export default Url
