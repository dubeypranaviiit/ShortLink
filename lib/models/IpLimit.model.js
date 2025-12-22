import mongoose from "mongoose"

const IpLimitSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
      index: true,
    },
    count: {
      type: Number,
      default: 1,
    },
    lastReset: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

const IpLimit =
  mongoose.models.IpLimit || mongoose.model("IpLimit", IpLimitSchema)

export default IpLimit
