import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import path from 'path'

const  __dirname = path.resolve();

dotenv.config();

const app = express();
app.use(express.static(path.join(__dirname,'/client/dist')));

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})

mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = 8081;
app.listen(PORT, () => {
  console.log("Port is listing at ", PORT);
});

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
