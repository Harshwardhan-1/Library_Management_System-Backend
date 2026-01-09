import {Request,Response,NextFunction} from 'express';
const verifyStudent=(req:Request,res:Response,next:NextFunction)=>{
const user=(req as any).user;
if(!user || user.role!== 'Student'){
    return res.status(403).json({
        message:"cannot access this page",
    });
}
next();
}

export default verifyStudent;