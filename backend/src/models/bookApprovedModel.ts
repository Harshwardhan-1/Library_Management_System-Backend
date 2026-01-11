import mongoose from 'mongoose';
const approveSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    gmail:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
})

export const approvedModel=mongoose.model("approved",approveSchema);