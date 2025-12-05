
import express from 'express';
import cors from 'cors'
import { CLIENT_URL, PORT, } from './config/env';
import dbConnect from './db/dbConnection';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes'


const app = express();
app.use(express.json());
app.use(cookieParser())

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://auth2-cyr2.vercel.app"
    ],
    credentials: true
  })
);






app.get('/', (_, res)=>res.send('API Running.....'))
app.use("/api/auth",authRoutes)
const start = async()=>{
    await dbConnect();
   app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
);
};

start();






