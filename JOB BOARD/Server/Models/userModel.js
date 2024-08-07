import mongoose, { Schema,Model } from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from 'crypto'
import { title } from "process";
const userSchema =  new Schema({
    Name:{
        type:'String',
        require:[true,'Name is Required'],
        lowercase:true,
        trim:true,
    },
    role:{
        type:'String',
        enum:['Employee','Admin'],
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
        // password will not be shared by default
    },
    apply:[{
        id:{
            type:'String',
            required:[true,'Id are Requried']
        },
        company:{
            type:'String',
            required:[true,'Company are Requried']
        },
        title:{
            type:'String',
            required:[true,'Title are Requried']
        },
        type:{
            type:'String',
            required:[true,'Type are Requried']
        },
        venue:{
            type:'String',
            required:[true,'Venue are Requried']
        },
        deadline:{
            type:'String',
            required:[true,'Deadline are Requried']
        }
    }],
    profile:{
        public_id:{
            type:'String'
        },
        secure_url:{
            type:'String'
        }
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
    this.password=await bcrypt.hash(this.password,12)
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
    return await bcrypt.compare(plaintextPassword,this.password)

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



const User = mongoose.model('User',userSchema)
export default User