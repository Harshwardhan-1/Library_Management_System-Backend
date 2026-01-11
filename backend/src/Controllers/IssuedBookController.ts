import { issuedModel } from "../models/IssuedBookModel";
import {Request,Response} from 'express';

export const allIssued=async(req:Request,res:Response)=>{
    const findIt=await issuedModel.find();
    return res.status(200).json({
        message:"this are all issued books",
        data:findIt,
    });
}


export const createIssued=async(req:Request,res:Response)=>{
const {userId,name,gmail,isbn,author}=req.body;
if(!userId || !name || !gmail || !isbn || !author){
    return res.status(401).json({
        message:"provide proper details",
    });
}
const createIssued=await issuedModel.create({
    userId,
    name,
    gmail,
    isbn,
    author,
});
return res.status(200).json({
    message:"added successfully",
    data:createIssued,
})
}