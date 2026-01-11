import { approvedModel } from "../models/bookApprovedModel";
import { Resend } from "resend";
import {Request,Response} from 'express';
const resend = new Resend(process.env.RESEND_API_KEY)  



export const approveRequest=async(req:Request,res:Response)=>{
const {userId,name,gmail,author,department}=req.body;
if(!userId || !name || !gmail || !author || !department){
    return res.status(401).json({
        message:"details are required",
    });
}

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