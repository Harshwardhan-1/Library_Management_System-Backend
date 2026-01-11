import {Request,Response} from 'express';
import { approveModel } from '../models/ApproveModel';
import { AdminBookModel } from '../models/AdminAddBookModel';
import { Resend } from 'resend';

const resend=new Resend(process.env.RESEND_API_KEY);
export const approveIt=async(req:Request,res:Response)=>{
const {userId,name,gmail,isbn,author}=req.body;
if(!userId || !name || !gmail || !isbn || !author){
    return res.status(401).json({
        message:"provide proper details",
    });
}
const checkSame=await approveModel.findOne({userId,isbn});
if(checkSame){
    return res.status(400).json({
        message:"your request for this book already send",
    });
}

const checkQuantity=await AdminBookModel.findOne({isbn,author});
if(!checkQuantity){
    return res.status(401).json({
        message:"not found",
    });
}
if(checkQuantity.quantity<=0){
return res.status(401).json({
    message:"Out Of Stock",
});
}
checkQuantity.quantity-=1;
await checkQuantity.save();
   const createUser=await approveModel.create({
        userId,
        name,
        gmail,
        isbn,
        author,
    });
await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: gmail,
      subject: "your approve is successfully confirmed",
      text: `Hello ${name} your request is successfully confirmed for issuing a book,

       Regards,
       HarshLibrary Team`,
    });
    return res.status(200).json({
        message:"user added successfully",
        data:createUser,
    });
}