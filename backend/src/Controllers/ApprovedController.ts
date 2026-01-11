import { approvedModel } from "../models/bookApprovedModel";
import { Resend } from "resend";
import { AdminBookModel } from "../models/AdminAddBookModel";
import {Request,Response} from 'express';
const resend = new Resend(process.env.RESEND_API_KEY)  



export const approveRequest=async(req:Request,res:Response)=>{
const {userId,name,gmail,author,department}=req.body;
if(!userId || !name || !gmail || !author || !department){
    return res.status(401).json({
        message:"details are required",
    });
}
const findIt=await approvedModel.findOne({userId,name,gmail});
if(findIt){
    return res.status(401).json({
        message:"email already send to this person",
    });
}

const book=await AdminBookModel.findOne({author});
if(!book){
    return res.status(401).json({
        message:"book not found",
    });
}

if(book.quantity<=0){
    return res.status(401).json({
        message:"Out Of Stock",
    });
}

book.quantity=book.quantity-1;
await book.save();

const approved=await approvedModel.create({
userId,
name,
gmail,
author,
department,
});
await resend.emails.send({
    from:process.env.EMAIL_FROM!,
    to:gmail,
    subject:`request accepted`,
    text:`hello ${name} your request for book issue is approved you can come to libraray and take book
    
    With Regards,
    Harsh Team.
    `
});
return res.status(200).json({
    message:"request send successfully",
    data:approved,
});
}