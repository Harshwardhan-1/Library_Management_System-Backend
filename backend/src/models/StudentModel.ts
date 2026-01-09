import mongoose from "mongoose";
const studentSchema=new mongoose.Schema({
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
    rollNo:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    section:{
        type:String,
        required:true,
    },
    phoneNo:{
        type:String,
        required:true,
    },
})


export const StudentModel=mongoose.model("student",studentSchema);