import IpLimit from "./models/IpLimit.model"
const DAILY_LIMIT = 500
const ONE_DAY = 24 * 60 * 60 * 1000
export async function checkGuestLimit(ip) {
  const record = await IpLimit.findOne({ ip })
  if (!record) {
    await IpLimit.create({ ip })
    return true
  }
  const now = Date.now()
  const lastReset = record.lastReset.getTime()
  if (now - lastReset > ONE_DAY) {
    record.count = 1
    record.lastReset = new Date()
    await record.save()
    return true
  }
  if (record.count >= DAILY_LIMIT) {
    return false
  }
  record.count += 1
  await record.save()
  return true
}
