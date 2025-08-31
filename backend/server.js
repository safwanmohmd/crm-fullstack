import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRouter from './routes/userRoutes.js'
import customerRouter from './routes/customerRoutes.js'
import cors from 'cors'
dotenv.config()
const app = express()

app.use(cors());


app.use(express.json())
mongoose.connect(process.env.mongoUri).then(
    console.log('connected to db')
).then(
    app.listen(process.env.PORT, () => {
        console.log(`server started on ${process.env.PORT}`);
    })
)

app.use('/',userRouter)
app.use('/customer', customerRouter)