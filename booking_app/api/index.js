import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js"
import roomsRoute from "./routes/rooms.js"
import hotelsRoute from "./routes/hotels.js"
import usersRoute from "./routes/users.js"


const app = express();
const server_port = 8080;
dotenv.config();

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connecting to mongoDB")
    } 
    catch(err){
        throw err;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected")
})


//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);


app.use((err, req,res,next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
    
})

app.listen(server_port, () => {
    connect()
    console.log("Server started at port "+ server_port)
})

