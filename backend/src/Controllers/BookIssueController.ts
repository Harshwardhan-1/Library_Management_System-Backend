import { bookIssueModel} from "../models/BookIssueModel";
import {Request,Response} from 'express';



export const bookIssue=async(req:Request,res:Response)=>{
const {author,department,quantity}=req.body;
if(!author || !department || !quantity){
    return res.status(401).json({
        message:"provide proper details",
    });
}
const user=(req as any);
const gmail=user.gmail;
const userId=user.userId;
const findIt=await bookIssueModel.findOne({userId,author,department});
if(findIt){
    return res.status(401).json({
        message:"you already send request for this book",
    });
}
  const Request=await bookIssueModel.findOne({gmail});
  if(!Request){
    return res.status(401).json({
        message:"user not found",
    })
  }
  if(Request.requestIssue===3){
    return res.status(401).json({
        message:"you have already send 3 book issue request",
    });
  }
  const request=Request.requestIssue;
const createIssue=await bookIssueModel.create({
    userId:userId,
    name:user.name,
    gmail:user.gmail,
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