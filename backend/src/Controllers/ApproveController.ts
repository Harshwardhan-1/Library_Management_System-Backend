import {Request,Response} from 'express';
import { approveModel } from '../models/ApproveModel';
import { AdminBookModel } from '../models/AdminAddBookModel';
import { bookIssueModel } from '../models/BookIssueModel';
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
      text: `Hello ${name} your request is successfully confirmed for issuing a book
      you have to return it within 3 days
      ,

       Regards,
       HarshLibrary Team`,
    });
    return res.status(200).json({
        message:"user added successfully",
        data:createUser,
    });
}



export const deleteRequest=async(req:Request,res:Response)=>{
const {name,gmail,userId,author,isbn}=req.body;
if(!name || !gmail || !userId || !author || !isbn){
    return res.status(401).json({
        message:"provide proper details",
    });
}
const findDelete=await bookIssueModel.findOneAndDelete({userId,author,isbn});
if(!findDelete){
    return res.status(401).json({
        message:"not found",
    });
}
await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: gmail,
      subject:"approve for book issue",
      text:`Sorry ${name} your request for book is rejected for some reason try later on
      
      with Regards,
      Harsh Library Team,
      `
      });
      return res.status(200).json({
        message:"user request reject successfully",
      });
}