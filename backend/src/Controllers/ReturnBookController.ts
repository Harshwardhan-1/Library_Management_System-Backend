import {Request,Response} from 'express';
import { returnModel } from '../models/BookReturnModel';
import { AdminBookModel } from '../models/AdminAddBookModel';
import { Resend } from 'resend';
const resend=new Resend(process.env.RESEND_API_KEY);



export const succReturn=async(req:Request,res:Response)=>{
const {userId,name,gmail,isbn,author,date}=req.body;
if(!userId || !name || !gmail || !isbn || !author || !date){
    return res.status(401).json({
        message:"provide proper detail",
    });
}
const increaseQuantity=await AdminBookModel.findOne({userId,isbn,author});
if(!increaseQuantity){
    return res.status(401).json({
        message:"not found",
    });
}
increaseQuantity.quantity=increaseQuantity.quantity+1;
await increaseQuantity.save();
const issueDate=new Date(date);
const today=new Date();

const diffTime=today.getTime()-issueDate.getTime();
const diffDays=diffTime /(1000 * 60 * 60 * 24);
if(diffDays>3){
    return res.status(401).json({
        message:"pay 50 rupees fine and then you can return",
    });
}

const makeReturn=await returnModel.create({
    userId,
    name,
    gmail,
    isbn,
    author,
    issueDate:date,
    returnDate:Date.now(),
});
await resend.emails.send({
     from: process.env.EMAIL_FROM!,
      to: gmail,
      subject: "you have successfully return book",
      text: `Hello ${name} you have successfully return the book thanks.

       Regards,
       HarshLibrary Team`,
});
return res.status(200).json({
    message:"successfully created",
    data:makeReturn,
});
}