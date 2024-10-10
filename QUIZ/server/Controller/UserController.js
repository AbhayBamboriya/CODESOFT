import crypto from 'crypto'
import AppError from "../utils/error.js";
import User from '../Models/User.Models.js';
const cookieOptions={
    maxAge:7*24*60*60*1000,
}
const register  = async(req,res,next)=>{
    try{
        console.log('dd',req.form);
        const {Name,email,password,role}=req.body;

        console.log('data',Name,email,password,role);
        if( !email || !password || !Name || !role){
            return next(new AppError('All fields are Required',400))
        }
        if(role!='Student' && role!='Teacher'){
            return next(new AppError(`Invalid Role,${role}`,400))
        }
        const userExists = await User.findOne({email})
        if(userExists){
            return next(new AppError('Email already exist',400))
        }
        

        const u=await User.findOne({email})
        if(u){
            res.status(400).json({
                success:false,
                message:"UserName already exist",
            })
            return
        }
        const user =await User.create({
            Name,
            email,
            password,
            role,
        })
   
        if(!user){
            return next(new AppError('User registration is failed please try again',400))
        }
        await user.save()   
        
        const token=await user.generateJWTToken()
        res.cookie('token',token,cookieOptions)
        user.password=undefined

        res.cookie('token',token,cookieOptions)
        res.status(201).json({
            success:true,
            message:"User registered successfully",
            user
        })
    }
    catch(e){
        return next(new AppError(e.message,500))
    }
}


const login=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        console.log('email',email,' ',password);
        if(!email || !password){
            return next (new AppError('All fields are required',400))
        }
        const user=await User.findOne({email}).select('+password')
        if(!(user && (await user.comparePassword(password)))){
            return next(new AppError('Email and Password does not match',400))
        }
       
        const token=await user.generateJWTToken()
        user.password=undefined
        res.cookie('token',token,cookieOptions)
        res.status(200).json({
            success:true,
            message:"User loged in successfully",
            user
        })
    }
    catch(e){
        return next(new AppError(e.message,500))
    }
    
}
const logout=(req,res)=>{
    res.cookie('token',null,{
        secure:true,
        maxAge:0,
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"User Logged out successfully"
    })
}



const forgotPassword=async(req,res,next)=>{
    try{
        const {email}=req.body;
        console.log('email',email);
        if(!email){
            return next(new AppError('Email is require',400))
        }
        const user=await User.findOne({email})
        if(!user){
            return next(new AppError('Enter registered email',400))
        } 
        const resetToken=await user.generatePasswordResetToken();
        await user.save() 
        const message= 'Mail is send to registered email id' 
        const subject='Reset Password';
        try{ 
            res.status(200).json({
                success:true,
                message:`Reset Password token has been send to ${email} successfully`,
                resetToken
            })
        }
        catch(e){
            user.forgotPasswordExpiry=undefined
            user.forgotPasswordToken=undefined
            await user.save()
            return next(new AppError(toString(e).message,500)) 
        }
    }
    catch(e){
        return next(new AppError(e.message,500))
    }
}
const resetPassword=async(req,res,next)=>{
   try{
        const {resetToken} = req.params;
        const{password}=req.body
        console.log("reset Token "+resetToken);
        if(!password){
            return next(
                new AppError('password not present',400)
            )
        }
        console.log("password "+password);
        const forgotPasswordToken=crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex')
        const user = await User.findOne({
            forgotPasswordToken,
            forgotPasswordExpiry:{$gt: Date.now()}
        })
        if(!user){
            return next(
                new AppError('Token is invalid please try again',400)
            )
        }

        user.password=password;
        user.forgotPasswordExpiry=undefined
        user.forgotPasswordToken=undefined
        user.save();
        res.status(200).json({
            success:true,
            message:'Password changed successfully'
        })
   }
   catch(e){
        return next(new AppError(e.message,500))
    }

}

const changePassword=async(req,res,next)=>{

    try{
        const {oldpassword,newpassword}= req.body
        const {id}=req.user
        if(!oldpassword || !newpassword){
            return next(
                new AppError('All filds are mandatory',400)
            )
        }

        const user = await User.findById(id).select('+password')
        if(!user){ 
            return next(
                new AppError('User does not exist',400)
            )

        }
        const isPasswordValid=await user.comparePassword(oldpassword)
        if(!isPasswordValid){
            return next(
                new AppError('Invalid old password',400)
            )

        }
        user.password=newpassword
        await user.save()   
        user.password=undefined
        res.status(200).json({
            success:true,
            message:'Password changed successfully'
        })
    }
    catch(e){
        return next(new AppError(e.message,500))
    }
}



const checkUser=async(req,res,next)=>{
    try{
        console.log('req',req.body);
        const {email,check}=req.body;
        console.log('email',email);
        if(!email){
            return next(new AppError('Email is required',400))
        }
        if(check){
            const user=await User.findOne({email})
            if(user){
                res.status(400).json({
                    success:false,
                    message:'Email ID already Register'
                })
                return
            } 
            res.status(200).json({
                success:true,
                message:'You can use these email'
            })
            
        }
        else{
            const user=await User.findOne({email})
            if(!user){
                res.status(400).json({
                    success:false,
                    message:'Enter Registered UserId'
                })
                return
            } 
            res.status(200).json({
                success:true,
                message:'Gmail is verfied'
            })

            
        }
    }
    catch(e){
        return next(new AppError(e.message,500))
    }
}

const detail=async(req,res,next)=>{
    try{
        const {id}=req.body;
        console.log('id',id);
        if(!id){
            return next(new AppError('id required',400))
        }
        const user=await User.findById(id)
        if(user){
            res.status(400).json({
                success:true,
                user
            }) 
        }    
    }
    catch(e){
        console.log(e);
    }

}
const allUser=async(req,res,next)=>{
    try{
        const id=req.params.userId
        const users=await User.find({_id:{$ne:id}})
        const userData=Promise.all(users.map(async(user)=>{
            return  {email:user.email,UserName:user.UserName,Name:user.Name,Profile:user.profile.secure_url}
        }))
        res.status(200).json(await userData)
    }
    catch(e){
        console.log(e);
    }
}
export{
    register,
    checkUser,
    logout,
    login,
    forgotPassword,
    resetPassword,
    changePassword,
    allUser,
    detail
}