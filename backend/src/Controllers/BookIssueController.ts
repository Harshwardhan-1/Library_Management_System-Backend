import { bookIssueModel} from "../models/BookIssueModel";
import {Request,Response} from 'express';

export const getAllIssue=async(req:Request,res:Response)=>{
const allRequest=await bookIssueModel.find();
if(allRequest.length=== 0){
    return res.status(401).json({
        message:"no issue yet",
    });
}
return res.status(200).json({
    message:"here are all the issue request",
    data:allRequest,
});
}


export const bookIssue=async(req:Request,res:Response)=>{
const {isbn,author,department,quantity}=req.body;
if(!isbn ||!author || !department || !quantity){
    return res.status(401).json({
        message:"provide proper details",
    });
}
const user=(req as any).user;
const gmail=user.gmail;
const userId=user.userId;
const findIt=await bookIssueModel.findOne({userId,author,department});
if(findIt){
    return res.status(401).json({
        message:"you already send request for this book",
    });
}
let request=0;
  const Request=await bookIssueModel.findOne({gmail});
  if(Request){
   if(Request.requestIssue===3){
    return res.status(401).json({
        message:"you have already send 3 book issue request",
    });
  }
   request=Request.requestIssue;
  }
const createIssue=await bookIssueModel.create({
    userId:userId,
    name:user.name,
    gmail:user.gmail,
    isbn,
    author,
    department,
    quantity,  
    requestIssue:request+1,
});
return res.status(200).json({
    message:"user request send for bookIssue",
    data:createIssue,
});
}