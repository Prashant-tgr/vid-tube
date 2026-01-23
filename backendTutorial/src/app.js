import express from 'express'
import cors from 'cors'
import cookieParser  from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))


app.options(/.*/, cors());


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from './routes/user.routes.js'
// import videoRouter from './routes/video.routes.js' // TODO: Create video routes

//route declaration
app.use("/api/v1/users", userRouter)
// app.use("/api/v1/videos", videoRouter) // TODO: Uncomment when video routes are created

console.log("CORS:", process.env.CORS_ORIGIN)


export {app}
