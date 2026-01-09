export const checkStudentRoll=(data:{
    rollNo:String,
})=>{
    if(!data.rollNo || data.rollNo.length<3){
        return{
            valid:false,
            message:"rollNo must be minimum of 3 characters",
        };
    }
    return{
        valid:true,
   };
}