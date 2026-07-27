import mongoose from 'mongoose'


 const connectToDb = async () =>{
const MONGO_URI = process.env.MONGO_URI
try {
  await mongoose.connect(MONGO_URI , {
    dbName: 'sami-rabbit',
  })
  console.log('Connected to MongoDB')
  return true

} catch (error) {
 console.error('Failed to connect to MongoDB', error)
 return false
}

}

export default connectToDb
