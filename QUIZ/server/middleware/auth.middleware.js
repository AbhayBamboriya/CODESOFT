// import AppError from "../utils/error.util.js"
import jwt from 'jsonwebtoken'
import AppError from '../utils/error.js'
const isLoggedIn = async (req,res,next)=>{
    // due to cookie parser it can extract the token
    // console.log("cookie"+req.cookies);
    // console.log("cookie1"+req.cookie);
    const {token}=req.cookies
    // console.log("token "+token);
    if(!token){
        return next(new AppError('Unauthenticated , please login again',405))
    }
    const userDetails=await jwt.verify(token,process.env.JWT_SECRET)
    // console.log("userDetails"+userDetails);
    if (!userDetails) {
        return next(new AppError("Unauthorized, please login to continue", 401));
      }
    // jwt token is information is saved
    // console.log('details',userDetails);
    req.user=userDetails
    next()
}

// roles is passed as list in roles
const authorisedRoles=(...roles)=>async (req,res,next)=>{
// req.user me jwt token ke throw saaari information mil jayegi
console.log('checkiiiii',JSON.stringify(roles));
    
    const currentUser=req.user.role;
    
    if(!roles.includes(currentUser)){
        return next(
            new AppError('Do not have permission to access these route ',403)
        )
    }
    next()
}


export{
    isLoggedIn,
    
}