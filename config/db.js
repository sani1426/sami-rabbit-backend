import mongoose from 'mongoose'


 const connectToDb = async () =>{
const MONGO_URI = process.env.MONGO_URI
try {
  await mongoose.connect(MONGO_URI)
  console.log('Connected to MongoDB')
} catch (error) {
 console.error('Failed to connect to MongoDB', error)
 process.exit(1)  // Exit the process if connection fails
}

}

export default connectToDb
