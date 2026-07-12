import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'

import connectToDb from './config/db.js';


dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3000


app.get('/', (req, res) => {
  res.send('Hello World!');
}); 







app.listen(PORT ,  () => {
   connectToDb()
  console.log(`Server is running on port ${PORT}`);
});
