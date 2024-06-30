import mongoose, { Schema,Model } from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from 'crypto'
import argon2 from 'argon2'
const userSchema =  new Schema({
    Name:{
        type:'String',
        require:[true,'Name is Required'],
        lowercase:true,
        trim:true,
    },
    role:{
        type:'String',
        enum:['Student','Teacher'],
    }  ,

    email:{
        type:'String',
        requried:[true,'Email is required'],
        lowercase:true,
        trim:true,
        unique:true,
        
    },
    password:{
        type:'String',
        reqired:[true,'Password is Required'],
        minLength:[3,'Password must contain at least minimum 3 character'],
        select:false
    },

    forgotPasswordToken:String,
    forgotPasswordExpiry:Date  ,
    },{
    timestamps:true     
    }
)
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next()
    }
    console.log('password',this.password);
    this.password=await  argon2.hash(this.password)
})

userSchema.methods = {
generateJWTToken: async function(){
    return await jwt.sign(
        // {console.log(this.userName)},
        {userName:this.userName,id:this._id ,email:this.email},
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_EXPIRY,
        }
    )
},
comparePassword: async function(plaintextPassword){
    console.log('plain text',plaintextPassword,this.password);
    return await argon2.verify(this.password,plaintextPassword)

},
generatePasswordResetToken:async function(){
    // it will generate random token
    // directly used library
    const resetToken=crypto.randomBytes(20).toString('hex')
    this.forgotPasswordToken=crypto
    // converting reset token to encrypted form// ;
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')
    this.forgotPasswordExpiry=Date.now()+15*60*1000 //15 min from now
    return resetToken
}
}



const User = mongoose.model('QuizUser',userSchema)
export default User