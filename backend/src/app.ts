import express  , {Request , Response} from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

import verifyToken from "./middleware/verifyToken";
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
import cookieParser from 'cookie-parser';
app.use(cookieParser());
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
})); 
import userRouter from "./Routes/userRoutes";
import studentRoutes from "./Routes/StudentRoutes";
import AdminBooksRoutes from "./Routes/AdminAddBookRoutes";
import bookIssueRoutes from "./Routes/BookIssueRoutes";
import approveRoutes from "./Routes/ApproveRoutes";
import issuedRoutes from "./Routes/IssuedBooksRoutes";
import returnBookRoutes from "./Routes/returnBookRoutes";
import fineStudents from "./Routes/FineStudentRoutes";
app.get("/",(req : Request,res:Response)=>{
  res.send("hii harsh here")
})


app.get('/ping',(req:Request,res:Response)=>{
  res.send('Alive');
})


mongoose.connect(process.env.MONGO_URL!)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.use("/api/all",userRouter);
app.use("/api/student",studentRoutes);
app.use('/api/admin',AdminBooksRoutes);
app.use('/api/issue',bookIssueRoutes);
app.use('/api/approve',approveRoutes);
app.use('/api/issued',issuedRoutes);
app.use('/api/return',returnBookRoutes);
app.use('/api/fine',fineStudents);
const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>{
  console.log(`Server is listening to http://localhost:${PORT}`)
})

export default app; 