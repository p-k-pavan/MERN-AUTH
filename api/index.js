import express from "express"
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js'

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGOOSE_URL).then(()=>{
    console.log("Connected to db")
})
.catch( (err)=>{
    console.log(err)
})


const PORT = 8081;
app.listen(PORT,()=>{
    console.log("Port is listing at ",PORT)
})


app.use("/api/user",userRoutes)