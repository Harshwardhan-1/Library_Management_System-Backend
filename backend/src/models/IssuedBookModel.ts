import mongoose from 'mongoose';
const IssuedSchema=new mongoose.Schema({
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
})


export const issuedModel=mongoose.model('isssued',IssuedSchema);