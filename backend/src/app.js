import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import universityRoute from './routes/universityRoute.js';
import userRoute from './routes/userRoute.js';
const app = express()

// Middleware setup
app.use(cors({ origin: process.env.CORS_ORIGIN, methods: 'GET,POST,PUT,DELETE', credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/users",userRouter)
// app.use("/data",dataRouter)
// app.use("/get/uni",universityRoute)



// ---Sign up API'S---------
app.use("/user",userRoute)


// ---Sign In API'S---------
// app.use()
export { app }