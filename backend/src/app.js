import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import adminRoute from './routes/adminRoute.js';
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
//testing frontend backend connection
app.get('/api/data', (req, res) => {
    console.log('reached backend')
    return res.json({ message: 'Sending response' });
  });


/* ----------------------------USER PORTION ---------------------------- */

// ----------Sign up API With Account Activation | Login API With Tokenization---------
// ----------Role Based Access--------------------
app.use("/user",userRoute)

/* ----------------------------ADMIN PORTION ---------------------------- */

app.use("/admin",adminRoute)


export { app }