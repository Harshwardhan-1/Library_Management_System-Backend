import {Request,Response} from 'express';
import { fineModel } from '../models/FineStudentModel';

export const allFineStudents=async(req:Request,res:Response)=>{
    const allFine=await fineModel.find();
    return res.status(200).json({
        message:"This are the name of all fine students",
        data:allFine,
    });
}

