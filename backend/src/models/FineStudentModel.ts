import mongoose from "mongoose";

const fineSchema=new mongoose.Schema({
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
    isbn:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    returnDate:{
        type:Date,
        required:true,
    },
    fineAmount:{
        type:Number,
        default:50,
    },
    paid:{
        type:Boolean,
        default:false,
    },
})


export const fineModel=mongoose.model('fine',fineSchema);