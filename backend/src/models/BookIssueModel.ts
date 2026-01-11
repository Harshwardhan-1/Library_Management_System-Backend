import mongoose from 'mongoose';
const bookSchema=new mongoose.Schema({
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
    department:{
        type:String,
        required:true,
    },
    quantity:{
        type:String,
        required:true,
    },
    requestIssue:{
        type:Number,
        required:true,
    }
})


export const bookIssueModel=mongoose.model('bookIssue',bookSchema);