import cloudinary from 'cloudinary'
import fs from 'fs/promises'
import crypto from 'crypto'
import AppError from "../utils/error.js";
import createServe1 from "../utils/sendMail.js";
import User from '../Models/userModel.js';
const cookieOptions={
    maxAge:7*24*60*60*1000,
}
const register  = async(req,res,next)=>{
    try{
        // console.log('dd',req.file);
        const {fullName,email,password,role}=req.body;

        // console.log('data',fullName,email,password,role);
        if( !email || !password || !fullName || !role){
            return next(new AppError('All fields are Required',400))
        }
        if(role!='Employee' && role!='Admin'){
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
            fullName,
            email,
            password,
            role,
            profile:{
                public_id:email,
                // secureurl is  environment variable with api key,api secret
                secure_url:'cloudinary://378171611453713:jar_yV68UrVNSKbFbxleqoBxKJQ@dix9kn7zm'
            }
        })
        // if not user doesnot stored succcessfully 
        if(!user){
            return next(new AppError('User registration is failed please try again',400))
        }
        
        if(req.file){
            
            try{
                const result=await cloudinary.v2.uploader.upload(req.file.path,{
                    // at which folder you have to upload the image
                    folder:'lms',
                    width:250,
                    height:250,
                    // gravity is used to auto focus
                    gravity:'faces',
                    crop:'fill'
                })
                // console.log('res',result);
                // try
                if(result){
                    user.profile.public_id=result.public_id

                    user.profile.secure_url=result.secure_url    
                    console.log("URL IMAGE",result.secure_url);

                    // remove file from local system/server
                    fs.rm(`uploads/${req.file.filename}`)

                }
            }catch(e){
                return next(
                    new AppError(e || 'File not uploaded,please try again',500)
                )
            }
        }

        // TODO: file upload
        await user.save()   // user will be saved
        
        createServe1(email)
        // sendEmail()
        const token=await user.generateJWTToken()
        user.password=undefined

        res.cookie('token',token,cookieOptions)
        // sendEmail(user.email)
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
        // console.log('req',body);
        // console.log(req.cookies);
        // console.log('body',req);
        const {email,password}=req.body;
        console.log('email',email,' ',password);
        if(!email || !password){
            return next (new AppError('All fields are required',400))
        }
        const user=await User.findOne({email}).select('+password')
        // !user || !user.comparePassword(password)
        if(!(user && (await user.comparePassword(password)))){
            return next(new AppError('Email and Password doesnot match',400))
        }
        // console.log('user from login ',user);
        // const token=await user.generateJWTToken()
        // console.log('token from login',token);
        // console.log('user is',user);
        // user.password=undefined
        // res.cookie('token',token,cookieOptions)
        const token=await user.generateJWTToken()
        user.password=undefined
        res.cookie('token',token,cookieOptions)
        // console.log('after change ',res.cookie._id);
        console.log('res cookie',res.cookie);
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



// firgot and reset password is not working
const forgotPassword=async(req,res,next)=>{
    try{
        const {email}=req.body;
        if(!email){
            return next(new AppError('Email is require',400))
        }
        const user=await User.findOne({email})
        if(!user){
            return next(new AppError('Enter registered email',400))
        } 
        // Generating the reset token via the method we have in user model
        const resetToken=await user.generatePasswordResetToken();
        // saving the token to db
        // saving the current token to DB so that for validation
        await user.save() 
        // console.log("token "+resetToken);
        const resetPasswordUrl=`${process.env.FRONTEND_URL}password/${resetToken}`;
        console.log("reset Token "+resetPasswordUrl);
        const message= 'Mail is send to registered email id' 
        const subject='Reset Password';
        try{ 
            // method that will send the  mail;  ;
            const e=await sendEmail(email,subject,message)
            // console.log("email "+e);
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
        console.log('reset Password');
        console.log('req from frontend',req);
        console.log("params "+req.params);
        console.log("body "+JSON.stringify(req.body));
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
            // that token is existing or not
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
            message:'Password changed success'
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
        console.log('id '+id);
        console.log("old pass "+oldpassword);
        console.log('new pass '+newpassword);
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
        await user.save()   //to save the changes in db
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



// }
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
            // it is for forgot passwrd
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

        const id=req.user.userId || req.user.id;
        console.log('idea',id,req.user);
        if(!id){
            return next(new AppError('id required',400))
        }
        const user=await User.findById(id)
        if(user){
            res.status(200).json({
                success:true,
                message:'Details',
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
        // $ne=not equal to
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