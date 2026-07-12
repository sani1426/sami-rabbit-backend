import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import connectToDb from './config/db.js';
import userRouter from './routes/User.routes.js';



dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3000


app.use("/api/users", userRouter);







app.listen(PORT ,  () => {
   connectToDb()
  console.log(`Server is running on port ${PORT}`);
});
