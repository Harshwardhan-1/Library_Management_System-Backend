import mongoose from 'mongoose';
const AdminAddBookSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    bookName:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    //unique book id
    isbn:{
        type:String,
        required:true,
    },
    //cse or aiml
    department:{
        type:String,
        required:true,
    },
    
    quantity:{
        type:Number,
        required:true,
    },
})

export const AdminBookModel=mongoose.model('adminAddBook',AdminAddBookSchema);