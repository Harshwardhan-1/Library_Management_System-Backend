import {Request,Response,NextFunction} from 'express';
const verifyAdmin=(req:Request,res:Response,next:NextFunction)=>{
    const user=(req as any).user;
    if(!user || user.role!== 'Admin'){
        return res.status(403).json({
            message:"Cannot access it",
        });
    }
    next();
}

export default verifyAdmin;