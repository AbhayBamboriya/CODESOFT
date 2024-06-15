import mongoose, { Schema,Model } from "mongoose";
const JobSchema =  new Schema({
    title:{
        type:'String',
        required:[true,'Title is Required'],
        lowercase:true,
        trim:true,
    },
    venue:{
        type:'String',
        requried:[true,'Venue is required'],
        lowercase:true,
        trim:true,
        unique:false
    },
    company:{
        type:'String',
        requried:[true,'Company is required'],
        lowercase:true,
        trim:true,

    },
    perks:[{
        type:'String',
        required:[true,'Perks are Requried']
    }],
    type:{
        type:'String',
        enum:['Internship','Job'],
        required:[true,'Type is requried']
    },
    skills:[{
        type:'String',
        required:[true,'Skills are Required']
    }],
    stipend:{
        type:'Number',
        reqired:[true,'Stipend is Required'],
    },

    deadline:{
        type:'Date',
        requried:[
            true,'Deadline is required'
        ]
    },
    experience:{
        type: 'String'||'Number',
        requried:[
            true,'Experience is required'
        ]
    },
    description:{
        type:'String',
        requried:[true,'description is required']
    },
    // category:{
    //     type:'String',
    //     required:[true,'category is requried']
    // },
    salary:{
        type:'Number' || 'String',
        requried:[true,'Salary is required']
    },
    },{
    timestamps:true     
    }
)


const Job = mongoose.model('JobSchema',JobSchema)
export default Job