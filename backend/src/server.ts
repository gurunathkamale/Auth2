
import express from 'express';
import cors from 'cors'
import { CLIENT_URL, PORT, VERSEL_URL } from './config/env';
import dbConnect from './db/dbConnection';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes'
// import dotenv from  'dotenv'

const app = express();
app.use(express.json());
app.use(cookieParser())
// app.use(cors({
//     origin: "https://auth2-48zs.vercel.app/",
//     credentials: true
// }));
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//    "https://auth2-cyr2.vercel.app"
//     ],
//     credentials: true
//   })
// );

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://auth2-cyr2.vercel.app"
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);  // allow request
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Preflight support
app.options("*", cors());



// dotenv.config()
app.get('/', (_, res)=>res.send('API Running.....'))
app.use("/api/auth",authRoutes)
const start = async()=>{
    await dbConnect();
   app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
);
};

start();