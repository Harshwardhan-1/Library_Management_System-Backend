export const authValidator=(data:{
    name:String,
    password:String,
})=>{
    if(!data.name || !data.password){
        return{
            valid:false,
            message:"provide proper detail",
        };
    }
    if(data.name.trim().length<3){
        return{
            valid:false,
            message:"name should be atleast of 3 characters",
        };
    }
    if(data.password.length<3){
        return{
            valid:false,
            message:"password should be atleast of 3 characters",
        };
    }
    return{
        valid:true,
    }
}