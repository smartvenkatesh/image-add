import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http"
dotenv.config()
import userRoutes from "./routes/userRoutes.js"

const app = express()
const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3001",
        methods:['GET','POST'],
        Credential:true
    }
})
app.use(cors())

app.locals.io = io;

app.use(express.json())

app.use("/jobs",userRoutes)

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB Connected"))

const PORT = process.env.PORT
console.log("check",typeof PORT);

server.listen(PORT,()=>console.log(`Server is running on : ${PORT}`)
)