import {Request,Response} from 'express';
import { returnModel } from '../models/BookReturnModel';
import { AdminBookModel } from '../models/AdminAddBookModel';
import { issuedModel } from '../models/IssuedBookModel';
import { Resend } from 'resend';
import { fineModel } from '../models/FineStudentModel';
const resend=new Resend(process.env.RESEND_API_KEY);



export const succReturn=async(req:Request,res:Response)=>{
const {userId,name,gmail,isbn,author,date}=req.body;
if(!userId || !name || !gmail || !isbn || !author || !date){
    return res.status(401).json({
        message:"provide proper detail",
    });
}
const increaseQuantity=await AdminBookModel.findOne({isbn,author});
if(!increaseQuantity){
    return res.status(401).json({
        message:"not found",
    });
}
increaseQuantity.quantity=increaseQuantity.quantity+1;
await increaseQuantity.save();
const issueDate=new Date(date);

//just to check whether it is working properly or not
issueDate.setDate(issueDate.getDate() - 5);
//

const today=new Date();

const diffTime=today.getTime()-issueDate.getTime();
const diffDays=diffTime /(1000 * 60 * 60 * 24);
if(diffDays>3){
    const createIt=await fineModel.create({
        userId,
        name,
        gmail,
        isbn,
        author,
        returnDate:Date.now(),
    });
    return res.status(401).json({
        message:"fine Model created successfully",
        data:createIt,
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




export const deleteIt=async(req:Request,res:Response)=>{
const {userId,isbn,author}=req.body;
if(!userId || !isbn || !author){
    return res.status(401).json({
        message:"provide proper detail",
    });
}
const findIt=await issuedModel.findOneAndDelete({userId,isbn,author});
if(!findIt){
return res.status(401).json({
    message:"not found",
});
}
return res.status(200).json({
    message:"user Deleted",
});
}




export const paidFine=async(req:Request,res:Response)=>{
const {userId,name,gmail,isbn,author}=req.body;
if(!userId || !name || !gmail || !isbn || !author){
    return res.status(401).json({
        message:"provide proper details",
    });
}
const checkIt=await AdminBookModel.findOneAndDelete({isbn,author});
if(!checkIt){
    return res.status(401).json({
        message:"user not found",
    });
}
checkIt.quantity=checkIt.quantity+1;
await checkIt.save();
await resend.emails.send({
    from: process.env.EMAIL_FROM!,
      to: gmail,
      subject: "you have successfully return book",
      text: `Hello ${name} you have successfully pay the fine and return the book Thanks.

       Regards,
       HarshLibrary Team`,
})
return res.status(201).json({
    message:"user successfully pay fine",
});
}