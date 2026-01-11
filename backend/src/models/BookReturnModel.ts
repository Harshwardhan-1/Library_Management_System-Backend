import mongoose from 'mongoose';
const retBookSchema=new mongoose.Schema({
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
    issueDate:{
        type:Date,
        required:true,
    },
    returnDate:{
        type:Date,
        required:true,
    },
})


export const returnModel=mongoose.model('returnBook',retBookSchema);