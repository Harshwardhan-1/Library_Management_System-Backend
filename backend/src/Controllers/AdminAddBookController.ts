import { AdminBookModel} from "../models/AdminAddBookModel";
import {Request,Response} from 'express';



export const AdminAddBook=async(req:Request,res:Response)=>{
const {bookName,author,isbn,department,quantity}=req.body;
if(!bookName || !author || !isbn || !department || !quantity){
    return res.status(401).json({
        message:"fill proper detail",
    });
}
const checkSame=await AdminBookModel.findOne({bookName,author,isbn});
if(checkSame){
    return res.status(401).json({
        message:"you can increase quantity if available",
    });
}
const checkName=await AdminBookModel.findOne({bookName,author});
if(checkName){
    return res.status(401).json({
        message:"already exist increase quantity if available"
    })
}
 const Admin=(req as any).user;
 const userId=Admin.userId;
const createBook=await AdminBookModel.create({
userId:userId,
bookName,
author,
isbn,
department,
quantity,
});
return res.status(200).json({
    message:"book added successfully",
    data:createBook,
});
}
