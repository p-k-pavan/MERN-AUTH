import express from "express"
const app = express();


const PORT = 8081;
app.listen(PORT,()=>{
    console.log("Port is listing at ",PORT)
})