import { AdminBookModel} from "../models/AdminAddBookModel";
import {Request,Response} from 'express';
import { BookIdValidator } from "../validators/BookIdValidator";
export const getAllBooks=async(req:Request,res:Response)=>{
    const allBooks=await AdminBookModel.find();
    return res.status(200).json({
        message:"all books",
        data:allBooks,
    });
}

export const AdminAddBook=async(req:Request,res:Response)=>{
const {bookName,author,isbn,department,quantity}=req.body;
if(!bookName || !author || !isbn || !department || !quantity){
    return res.status(401).json({
        message:"fill proper detail",
    });
}
const result=BookIdValidator({isbn});
if(!result.valid){
    return res.status(401).json({
        message:"Id must have atleast 3 characters",
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




export const getCseBook=async(req:Request,res:Response)=>{
const user=(req as any).user;
const userId=user.userId;

const findDept=await AdminBookModel.find({userId,department:"CSE"});
if(!findDept){
    return res.status(401).json({
        message:"not found",
    });
}
if(findDept.length===0){
    return res.status(404).json({
        message:"no books found",
    });
}
return res.status(200).json({
    message:"foundbooks",
    data:findDept,
});
}