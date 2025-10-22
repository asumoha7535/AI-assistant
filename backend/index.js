import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './config/db.js'
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import userRouter from './routes/users.routes.js'

dotenv.config()
const app = express()
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))
const port = process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)


app.get('/', (req,res)=>{
    res.send('this is my server')
})

app.listen(port, ()=>{
    connectDb()
    console.log('server started');
    
})