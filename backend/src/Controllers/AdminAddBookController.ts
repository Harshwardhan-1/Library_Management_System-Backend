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
quantity:Number(quantity),
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



export const getEceBook=async(req:Request,res:Response)=>{
    const user=(req as any).user;
    const userId=user.userId;
    const findEce=await AdminBookModel.find({userId,department:"ECE"});
    if(findEce.length===0){
        return res.status(401).json({
            message:"not found",
        });
    }
    return res.status(200).json({
        message:"book found",
        data:findEce,
    });
}



export const handleDelete=async(req:Request,res:Response)=>{
    const {id}=req.body;
    if(!id){
        return res.status(401).json({
            message:"provide id",
        });
    }
    const findAndDelete=await AdminBookModel.findByIdAndDelete(id);
    if(!findAndDelete){
        return res.status(404).json({
            message:"error",
        });
    }
    return res.status(200).json({
        message:"book deleted successfully",
    });
}




export const handleStudent=async(req:Request,res:Response)=>{
    const {department}=req.body;
    if(!department){
        return res.status(401).json({
            message:"provide proper detail",
        });
    }
    const findIt=await AdminBookModel.find({department});
    if(findIt.length===0){
        return res.status(401).json({
            message:"no record found",
        })
    }
    return res.status(200).json({
        message:"showBooks",
        data:findIt,
    });
}