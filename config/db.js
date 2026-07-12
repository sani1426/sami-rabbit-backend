import mongoose from 'mongoose'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cached = mongoose || { conn: null, promise: null }

 const connectToDb = async (
  MONGO_URI = process.env.MONGO_URI
) => {
  if (cached.conn) return cached.conn

  if (!MONGO_URI) throw new Error('MONGODB_URI is missing')

  cached.promise = cached.promise || mongoose.connect(MONGO_URI)

  cached.conn = await cached.promise
console.log(cached.conn);
  return cached.conn

}

export default connectToDb
