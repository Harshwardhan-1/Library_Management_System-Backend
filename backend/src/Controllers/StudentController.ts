import { StudentModel } from '../models/StudentModel';
import {Request,Response} from 'express';
import { checkStudentRoll } from '../validators/MakeStudentValidator';
export const getAllStudent=async(req:Request,res:Response)=>{
const allStudent=await StudentModel.find().populate('userId','name gmail');
return res.status(200).json({
    message:"this are all student",
    data:allStudent,
});
}





export const makeStudent=async(req:Request,res:Response)=>{
    const {rollNo,department,section,phoneNo}=req.body;
    if(!rollNo || !department || !section || !phoneNo){
        return res.status(401).json({
            message:"fill details properly",
        });
    }
    const result=checkStudentRoll({rollNo});
    if(result.message=== 'rollNo must be minimum of 3 characters'){
        return res.status(401).json({
            message:"rollNo must be of 3 characters",
        });
    } 
    const user=(req as any).user;
    const userId=user.userId;
    const name=user.name;
    const gmail=user.gmail;
    const makeNewStudent=await StudentModel.create({
        userId:userId,
        name:name,
        gmail:gmail,
        rollNo,
        department,
        section,
        phoneNo,
    });
    return res.status(200).json({
        message:"user created successfully",
        data:makeNewStudent,
    });
}





export const checkStudent=async(req:Request,res:Response)=>{
    const user=(req as any).user;
    const gmail=user.gmail;
    if(!gmail){
        return res.status(401).json({
            message:"please do a signUpFirst",
        });
    }
    const checkExist=await StudentModel.findOne({gmail});
    if(!checkExist){
        return res.status(401).json({
            message:"user not found",
        });
    }
    return res.status(200).json({
        message:"user Exist",
        data:checkExist,
    });
}