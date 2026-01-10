export const BookIdValidator=(data:{
    isbn:String,
})=>{
    if(!data.isbn || data.isbn.length<3){
        return{
            valid:false,
            message:"length must be atleast of 3 characters",
        };
    }
    return{
        valid:true,
    };
}